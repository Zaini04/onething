import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useFormik } from "formik";
import FormInput from "./FormInput";
import { MdPayment } from "react-icons/md";
import { PaymentReceivedValidation } from "../../validations/PaymentReceivedValidation";
import { useSearchParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios"; // Ya aapka custom API client instance
import Axios from "../../configs/api";
import { toast } from "react-toastify";
import SearchSelect from "./SearchSelect";
import { useFuelStockCompaniesDropdown } from "../../redux/actions/fuelAction";

export default function PaymentReceivedModel({ isOpen, onClose, onConfirm }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const dataType = searchParams.get("type");
  const activeId = searchParams.get("id");

  // --- TANSTACK CACHE FINDER ---
  let rowData = null;
  const cacheKey = dataType === "entry-vehicle" ? "entry-vehicles" : dataType;

  if (isOpen && activeId) {
    const queriesData = queryClient.getQueriesData({ queryKey: [cacheKey] });
    
    for (const [, cacheResponse] of queriesData) {
      if (!cacheResponse) continue;
      
      const records = cacheResponse.docs || 
                      (Array.isArray(cacheResponse) ? cacheResponse : 
                      (cacheResponse.data || cacheResponse.vehicles || cacheResponse.entries || cacheResponse));

      if (Array.isArray(records)) {
        const found = records.find((item) => String(item._id) === activeId);
        if (found) {
          rowData = found;
          break;
        }
      }
    }
  }

  // --- TANSTACK MUTATION IMPLEMENTATION ---
  const paymentMutation = useMutation({
    mutationFn: async ({ id, submitData }) => {
      // Backend routes par parameter match karne ke liye id pass ki hai
      const response = await Axios.post(`/entry-vehicle/payment/${id}`, submitData);
      toast.success(response.data.data.message)
      return response.data;
    },
    onSuccess: (resData) => {
      // 1. Table cache ko refresh karna
      queryClient.invalidateQueries({ queryKey: [cacheKey] });
      queryClient.invalidateQueries({ queryKey: 'fuel-stocks' });
      queryClient.invalidateQueries({ queryKey: 'client-summary' });
      queryClient.invalidateQueries({ queryKey: 'client-ledger' });

      
      // 2. Fresh populated doc pass karein parent component ko printing popup trigger karne ke liye
      if (onConfirm && resData?.data?.doc) {
        onConfirm(resData.data.doc);
      }
      
      // 3. System Cleanup & Close
      handleCloseModal();
    },
    onError: (error) => {
      console.error("Payment API Error:", error?.response?.data?.message || error.message);
    }
  });

  const formik = useFormik({
    initialValues: {
      paymentMethod: "",
      amount: "",
      checkNo: "",
      fuelCompany: "",
      fuelLiters: "",
      note: "",
    },
    validationSchema: PaymentReceivedValidation,
    onSubmit: (values) => {
      const { paymentMethod, note, amount, checkNo, fuelCompany, fuelLiters } = values;

      // Strict dynamic payload mapping based on your schema logic
      const submitData = {
        paymentMethod,
        note,
        // Backend requirement mapping: 'Other' method me bhi amount calculation ke liye pass hoga
        amount: Number(amount || 0),
        ...(paymentMethod === "Check" && { checkNo }),
        ...(paymentMethod === "Fuel" && { 
          fuelCompany, 
          fuelLiters: Number(fuelLiters || 0) 
        }),
      };

      // Mutation trigger with both endpoint parameters and body payload
      paymentMutation.mutate({
        id: activeId,
        submitData
      });
    },
  });

   const { data:fuelCompaniesData  } = useFuelStockCompaniesDropdown();
  
  const fuelCompanies =
    fuelCompaniesData?.map((c) => ({
      id: c._id,
      name: c.fuelCompany,
    })) || [];

  // Modal aur URL state clear karne ke liye cleanup handler
  const handleCloseModal = () => {
    formik.resetForm();
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("id");
    newParams.delete("type");
    setSearchParams(newParams);
    onClose();
  };



  useEffect(() => {
    // Dropdown switch hone par default clientDue value fill ho jayegi amounts fields me
    if (isOpen && rowData) {
      formik.setFieldValue("amount", rowData.clientDue || "");
    }
    if (!isOpen) {
      formik.resetForm();
    }
  }, [isOpen, rowData]);

  if (!isOpen) return null;


 

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleCloseModal}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[360px] flex flex-col gap-y-4 z-10 text-left">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-500">
          <MdPayment size={28} className="stroke-[1.8]" />
        </div>

        <h2 className="text-xl font-medium text-gray-900 tracking-tight text-center">
          Payment Received
        </h2>

        {rowData && (
          <div className="text-xs space-y-0.5 text-center text-gray-400 -mt-2">
            <p className="font-normal">
              Total Rate Bill: <span className="font-semibold text-gray-600">Rs. {rowData.totalRate}</span>
            </p>
            <p className="font-normal">
              Received : <span className="font-semibold text-gray-600">Rs. {rowData.payment?.amountReceived || 0}</span>
            </p>
            <p className="font-normal">
              Due : <span className="font-semibold text-gray-600">Rs. {rowData.clientDue}</span>
            </p>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-4">
          <FormInput
            label="Payment Method"
            id="paymentMethod"
            type="select"
            defaultOption="Select Payment Method"
            options={["Cash", "Check", "Fuel", "Other"]}
            formik={formik}
          />

          {/* CASH METHOD */}
          {formik.values.paymentMethod === "Cash" && (
            <FormInput
              label="Cash Amount"
              id="amount"
              type="text"
              placeholder="Enter amount"
              formik={formik}
            />
          )}

          {/* CHECK METHOD */}
          {formik.values.paymentMethod === "Check" && (
            <div className="flex flex-col gap-y-4">
              <FormInput
                label="Check Amount"
                id="amount"
                type="text"
                placeholder="Enter amount"
                formik={formik}
              />
              <FormInput
                label="Check No"
                id="checkNo"
                type="text"
                placeholder="Enter Check No"
                formik={formik}
              />
            </div>
          )}

          {/* FUEL METHOD */}
          {formik.values.paymentMethod === "Fuel" && (
            <div className="flex flex-col gap-y-4">
             <SearchSelect
              label="Fuel Company"
              options = {fuelCompanies}
              placeholder="Enter fuel company"
                value={formik.values.fuelCompany}
            onChange={(val) => formik.setFieldValue("fuelCompany", val, true)}
            onBlur={() => formik.setFieldTouched("fuelCompany", true, true)}
            isError={formik.touched.fuelCompany && !!formik.errors.fuelCompany}
            errorMessage={formik.errors.fuelCompany}  
            searchable ={false}
            />
              <FormInput
                label="Fuel Liters"
                id="fuelLiters"
                type="text"
                placeholder="Enter Fuel Liters"
                formik={formik}
              />
              <FormInput
                label="Fuel Total Value (Rs.)"
                id="amount"
                type="text"
                placeholder="Enter total fuel worth amount"
                formik={formik}
              />
            </div>
          )}

          {/* NOTE FIELD (Will be rendered for all methods including Other) */}
          <FormInput
            label={formik.values.paymentMethod === "Other" ? "Description / Note" : "Note"}
            id="note"
            type="textarea"
            placeholder="Add a note (optional)"
            rows={3}
            formik={formik}
          />

          <div className="flex items-center gap-3 w-full mt-3">
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={paymentMutation.isPending}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 text-center disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={paymentMutation.isPending}
              className="flex-1 py-3 px-4 bg-black text-white font-medium text-sm rounded-xl shadow-md hover:bg-gray-900 text-center flex items-center justify-center gap-1 disabled:opacity-70"
            >
              {paymentMutation.isPending ? "Saving..." : "Print & Save"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}