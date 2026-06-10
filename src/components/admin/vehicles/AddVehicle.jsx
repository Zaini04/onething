import { useFormik } from "formik";
import { AddVehicleValidation } from "../../../validations/AddVehicleValidation";
import FormInput from "../../global/FormInput";
import Axios from "../../../configs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { toastError } from "../../../hooks/toastError";


export default function AddVehicle({setEditedVehicle,editVehicle}) {

  const queryClient = useQueryClient()
  const navigate = useNavigate()
   const isEdit = !!editVehicle;
    
  const [isSubmitting, setIsSubmitting] = useState(false);


const vehicleMutation = useMutation({
  mutationFn: async (values) => {
    setIsSubmitting(true)
    if (isEdit) {
      return Axios.put(`/vehicle/${editVehicle._id}`, values);
    }

    return Axios.post("/vehicle/add_vehicle", values);
  },

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    formik.resetForm();
    setIsSubmitting(false)
    navigate("/app/vehicles");
    toast.success(isEdit? "Vehicle edited successfully": "Vehicle added successfully")
  },

  onError: (error) => {
    setIsSubmitting(false)
    toastError(error)
    console.log(error);
  },
});
  const formik = useFormik({
      enableReinitialize: true,

    initialValues: {
      vehicleNo: editVehicle?.vehicleNo || "",
      ownerName:editVehicle?.ownerName ||  "",
      typeVehicle: editVehicle?.typeVehicle || "",
      status: editVehicle?.status || "Active",
    },
    validationSchema: AddVehicleValidation,
    onSubmit:async (values) => {
        vehicleMutation.mutate(values)
        
     
    }
  });

  const handleClear = () => {
  formik.resetForm();

  if (isEdit) {
    setEditedVehicle(null);
    navigate("/app/vehicles");
  }
};

  return (
    <div className="w-full lg:max-w-[540px] bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className=" flex justify-between  text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">Add Vehicle</h2>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-7 pt-2"
      >
        <FormInput
          label="Vehicle No"
          id="vehicleNo"
          type="text"
          placeholder="Enter vehicle number"
          formik={formik}
        />

        <FormInput
          label="Owner Name"
          id="ownerName"
          type="text"
          placeholder="Enter owner name"
          formik={formik}
        />

        <FormInput
          label="Type Vehicle"
          id="typeVehicle"
          type="text"
          placeholder="Enter type of vehicle"
          formik={formik}
        />

        <FormInput
          label="Status"
          id="status"
          type="select"
          options={[
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
            { label: "Block", value: "Block" },
          ]}
          formik={formik}
        />

        <div className="flex items-center gap-4 pt-4 justify-start lg:justify-end">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 sm:flex-none px-2 sm:px-10 py-3.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-900 font-medium text-sm rounded-xl transition cursor-pointer active:scale-[0.99]"
          >
            Clear
          </button>

          <button
            type="submit"
            className="flex-1 sm:flex-none px-2 sm:px-10 py-3.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition cursor-pointer active:scale-[0.99] shadow-sm shadow-gray-100"
          >
{isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                <span>Processing...</span>
              </>
            ) : (
              <span>Confirm</span>
            )}          </button>
        </div>
      </form>
    </div>
  );
}
