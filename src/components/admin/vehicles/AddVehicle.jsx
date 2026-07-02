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

       <div className="flex items-center gap-4 mt-8 justify-start lg:justify-end">
            <button
              type="button"
              onClick={handleClear} // Formik default reset logic handles this smoothly
            className="px-5 sm:px-8 py-2.5 bg-white disabled:bg-gray-400 text-black font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
            >
              Clear
            </button>

           <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] disabled:bg-gray-400 text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            {isSubmitting ? "Submitting..." : "Confirm"}
          </button>
          </div>
      </form>
    </div>
  );
}
