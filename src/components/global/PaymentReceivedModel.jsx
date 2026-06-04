import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useFormik } from "formik";
import FormInput from "./FormInput";
import { MdPayment } from "react-icons/md";
import { PaymentReceivedValidation } from "../../validations/PaymentReceivedValidation";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function PaymentReceivedModel({ isOpen, onClose, onConfirm }) {
  const [searchParams] = useSearchParams();
  const dataType = searchParams.get("type");

  const rowData = useSelector((state) => {
    if (dataType === "entry-vehicle") return state.entryVehicles.selectedItem;
    if (dataType === "vehicle-ledger") return state.vehicleLedger.selectedItem;
    return null;
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
      const { paymentMethod, note, amount, checkNo, fuelCompany, fuelLiters } =
        values;

      const submitData = {
        paymentMethod,
        note,
        vehicleId: rowData?.id,
        ...(paymentMethod === "Cash" && { amount }),
        ...(paymentMethod === "Check" && { checkNo }),
        ...(paymentMethod === "Fuel" && { fuelCompany, fuelLiters }),
      };

      onConfirm(submitData);
    },
  });

  useEffect(() => {
    if (isOpen && rowData) {
      formik.setFieldValue("amount", rowData.totalRate || "");
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
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[360px] flex flex-col gap-y-4 z-10 text-left">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-500">
          <MdPayment size={28} className="stroke-[1.8]" />
        </div>

        <h2 className="text-xl font-medium text-gray-900 tracking-tight text-center">
          Payment Received
        </h2>

        {rowData && (
          <p className="text-xs text-center text-gray-400 -mt-2">
            Total Rate Bill:{" "}
            <span className="font-bold text-gray-700">
              Rs. {rowData.totalRate}
            </span>
          </p>
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

          {formik.values.paymentMethod === "Cash" && (
            <FormInput
              label="Cash Amount"
              id="amount"
              type="text"
              placeholder="Enter amount"
              formik={formik}
            />
          )}

          {formik.values.paymentMethod === "Check" && (
            <FormInput
              label="Check No"
              id="checkNo"
              type="text"
              placeholder="Enter Check No"
              formik={formik}
            />
          )}

          {formik.values.paymentMethod === "Fuel" && (
            <div className="flex flex-col gap-y-4">
              <FormInput
                label="Fuel Company"
                id="fuelCompany"
                type="text"
                placeholder="Enter Fuel Company"
                formik={formik}
              />
              <FormInput
                label="Fuel Liters"
                id="fuelLiters"
                type="text"
                placeholder="Enter Fuel Liters"
                formik={formik}
              />
            </div>
          )}

          <FormInput
            label="Note"
            id="note"
            type="textarea"
            placeholder="Add a note (optional)"
            rows={3}
            formik={formik}
          />

          <div className="flex items-center gap-3 w-full mt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-black text-white font-medium text-sm rounded-xl shadow-md hover:bg-gray-900 text-center"
            >
              Print
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
