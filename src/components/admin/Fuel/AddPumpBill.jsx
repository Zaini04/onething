import { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom"; 
import { FaArrowLeft } from "react-icons/fa";
import SearchSelect from "../../global/SearchSelect";
import FormInput from "../../global/FormInput";
import Axios from "../../../configs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastError } from "../../../hooks/toastError";
import { useVehicleDropdown } from "../../../redux/actions/vehicleAction";
import DropDownLoader from "../../../hooks/DropDownLoader";
import { useFuelStockCompaniesDropdown } from "../../../redux/actions/fuelAction";
import { useEffect } from "react";

const AddPumpBill = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [loseOil,setLoseOil] = useState(false)
  const editData = location.state?.pumpBillData; 

  const isEditMode = !!editData; 
      const [isSubmitting, setIsSubmitting] = useState(false);


  const pumpBillMutation = useMutation({
    mutationFn: async (payload) => {
      setIsSubmitting(true)
      if (isEditMode) {
        return Axios.put(`/pump-bills/entry/${editData._id}`, payload);
      }
      return Axios.post('/pump-bills/entry', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pump-bills"] });
      setIsSubmitting(false)
      formik.resetForm();


      
      toast.success(isEditMode ? "Pump Bill updated successfully!" : "Pump Bill created successfully!");
      navigate("/app/pump-bills");
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
      setIsSubmitting(false)
      toastError(err);
    }
  });

  const formik = useFormik({
    initialValues: {
      date:  new Date().toISOString().split('T')[0] ,
      slipNo: editData?.slipNo || "",
      vehicle: editData?.vehicle?._id || editData?.vehicle || "",
      fuelCompany:editData?.fuelCompany?._id ||editData?.fuelCompany || "",
      todayDieselRate: editData?.todayDieselRate || "",
      totalLiters: editData?.totalLiters || "",
      totalLoseOilLiters: editData?.totalLoseOilLiters || "",
      totalLoseOilAmount: editData?.totalLoseOilAmount || '',
      totalAmounts: editData?.totalAmounts || '',
      
    },
    enableReinitialize: true, 
    validationSchema: '',
    onSubmit: async (values) => {
              const totalAmounts = Number(values.totalAmounts?.toString().replace(/,/g, "")) || 0;

              const payload = {
                ...values,
                totalAmounts: totalAmounts,
              };
      pumpBillMutation.mutate(payload);
    },
  });

   const { values, setFieldValue } = formik;
  const {
    todayDieselRate,
    totalLiters,
    totalLoseOilAmount,
  } = values;

    const handleVehicle = (vehicleID) => {
    setFieldValue("vehicle", vehicleID, true);
  };
  const { data: vehicleDropDownData, isLoading:isvehicleLoading } = useVehicleDropdown();

    const vehicleOptions = vehicleDropDownData?.map((v) => ({ id: v._id, name: v.vehicleNo })) || [];


    const { data:fuelCompaniesData , isLoading:isFuelCompaniesLoading } = useFuelStockCompaniesDropdown();

const fuelCompanies =
  fuelCompaniesData?.map((c) => ({
    id: c._id,
    name: c.fuelCompany,
  })) || [];



  const handleClear = () => {
    formik.resetForm();
    if (isEditMode) {
      navigate("/app/pump-bills");
    }
  };

  const handleLoseOilChange = (e) => {
    const isChecked = e.target.checked;
    setLoseOil(isChecked);}

  useEffect(() => {
    const parsedRate = Number(todayDieselRate?.toString().replace(/,/g, "")) || 0;
    const parsedLiters = Number(totalLiters?.toString().replace(/,/g, "")) || 0;
    const parsedLoseOilAmount = Number(totalLoseOilAmount?.toString().replace(/,/g, "")) || 0;

    const totalAmounts = (parsedRate * parsedLiters) + parsedLoseOilAmount;

    setFieldValue("totalAmounts", totalAmounts ? totalAmounts.toLocaleString() : "0", false);
  }, [todayDieselRate, totalLiters, totalLoseOilAmount, setFieldValue]);

  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  p-4 md:pl-8 bg-[#F9FAFB]  rounded-2xl">
      <div className="flex justify-between items-center text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">{isEditMode ? "Edit Pump Bill" : "Add Pump Bill"}</h2>
        <button
          type="button"
          disabled={pumpBillMutation.isLoading}
          onClick={() => navigate("/app/pump-bills")}
          className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
        >
          <FaArrowLeft
            className="cursor-pointer bg-white p-2 rounded-xl w-12 h-9 border border-gray-100 shadow-sm"
            size={20}
          />
        </button>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80"
      >
       

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
          <FormInput label="Date" id="date" name="date" type="date" formik={formik} />
          <FormInput label="Slip No" id="slipNo" placeholder="Enter slip number here" name="slipNo" type="text" formik={formik} />
          <div className="relative flex flex-col w-full">

          <SearchSelect
            label="Vehicle"
            placeholder={isvehicleLoading ? "Loading Vehicles ":"Select Vehicle No"}
            options={vehicleOptions}
            value={formik.values.vehicle}
            onChange={handleVehicle}
            onBlur={() => formik.setFieldTouched("vehicle", true)}
            isError={formik.touched.vehicle && !!formik.errors.vehicle}
            errorMessage={formik.errors.vehicle}
          />

          {isvehicleLoading && (
              <DropDownLoader/>
            )}

          </div>

           <SearchSelect
              label="Fuel Company"
              options = {fuelCompanies}
            placeholder={isFuelCompaniesLoading ? "Loading Fuel Companies ":"Select fuel company"}
                value={formik.values.fuelCompany}
            onChange={(val) => formik.setFieldValue("fuelCompany", val, true)}
            onBlur={() => formik.setFieldTouched("fuelCompany", true, true)}
            isError={formik.touched.fuelCompany && !!formik.errors.fuelCompany}
            errorMessage={formik.errors.fuelCompany}            />
            
            {isFuelCompaniesLoading && (
              <DropDownLoader/>
            )}


            <FormInput label="Today's Diesel Rate" id="todayDieselRate" placeholder="Enter today's diesel rate" name="todayDieselRate" type="text" formik={formik} />
            
            <FormInput label="Total Liters" id="totalLiters" placeholder="Enter total liters" name="totalLiters" type="text" formik={formik} />
            <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e)=>handleLoseOilChange(e)}
              id="loseOil"
                                    className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"

              />
              <p className="text-xs text-gray-600">Is Lose Oil Used?</p>
        
              </div>
{ loseOil &&    (
    <>
    

            <FormInput label="Lose Oil Liter" id="totalLoseOilLiters" placeholder="Enter lose oil liter" name="totalLoseOilLiters" type="text" formik={formik} />
            <FormInput label="Total Lose Oil Amount" id="totalLoseOilAmount" placeholder="Enter total lose oil amount" name="totalLoseOilAmount" type="text" formik={formik} />
</>
)}

            <FormInput label="Total Amounts" id="totalAmounts" placeholder="0" name="totalAmounts" type="text" readOnly={true} formik={formik} />



         

          
          

        </div>

        <div className="flex justify-end gap-4 mt-8 pt-2">
          <button
            type="button"
            disabled={pumpBillMutation.isLoading}
            onClick={handleClear}
            className="px-5 sm:px-8 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                <span>Processing...</span>
              </>
            ) : (
              <span>Confirm</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPumpBill;