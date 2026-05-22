import { useFormik } from "formik";
import { ChevronDown} from "lucide-react";
import { AddVehicleValidation } from "../../../validations/AddVehicleValidation";

export default function AddVehicle({ onSubmitSuccess }) {
  
  const formik = useFormik({
    initialValues: {
      number: "",
      ownerName: "",
      typeVehicle: "",
      status: "Active",
    },
    validationSchema: AddVehicleValidation,
    onSubmit: (values, { resetForm }) => {
      console.log("Submitted Vehicle Data Profile:", values);
      if (onSubmitSuccess) onSubmitSuccess(values);
      resetForm();

    },
  });

  return (
    <div className="w-full max-w-[540px] bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      {/* Form Heading Heading */}
      <div className=" flex justify-between  text-gray-900 mb-6 tracking-tight">
       <h2 className="text-lg font-medium">Add Vehicle</h2>
        
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        
        {/* 1. Vehicle Number Field */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-400 z-10">
            Number
          </label>
          <input
            type="text"
            name="number"
            placeholder="e.g. TLL-4679"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
            className={`w-full bg-white border ${
              formik.touched.number && formik.errors.number 
                ? "border-red-500 focus:border-red-500" 
                : "border-gray-300 focus:border-black"
            } text-gray-900 text-[12px] font-normal rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-300`}
          />
          {formik.touched.number && formik.errors.number && (
            <p className="text-xs text-red-500 mt-1 pl-1">{formik.errors.number}</p>
          )}
        </div>

        {/* 2. Owner Name Field */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-400 z-10">
            Owner Name
          </label>
          <input
            type="text"
            name="ownerName"
            placeholder="e.g. Imran"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ownerName}
            className={`w-full bg-white border ${
              formik.touched.ownerName && formik.errors.ownerName 
                ? "border-red-500 focus:border-red-500" 
                : "border-gray-300 focus:border-black"
            } text-gray-900 text-[12px] font-normal rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-300`}
          />
          {formik.touched.ownerName && formik.errors.ownerName && (
            <p className="text-xs text-red-500 mt-1 pl-1">{formik.errors.ownerName}</p>
          )}
        </div>

        {/* 3. Type of Vehicle Field */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-400 z-10">
            Type Vehicle
          </label>
          <input
            type="text"
            name="typeVehicle"
            placeholder="e.g. Standard Dump Truck"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.typeVehicle}
            className={`w-full bg-white border ${
              formik.touched.typeVehicle && formik.errors.typeVehicle 
                ? "border-red-500 focus:border-red-500" 
                : "border-gray-300 focus:border-black"
            } text-gray-900 text-[12px] font-normal rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-300`}
          />
          {formik.touched.typeVehicle && formik.errors.typeVehicle && (
            <p className="text-xs text-red-500 mt-1 pl-1">{formik.errors.typeVehicle}</p>
          )}
        </div>

        {/* 4. Status Dropdown Select Field */}
        <div className="relative">
          <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-400 z-10">
            Status
          </label>
          <div className="relative w-full">
            <select
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              className="w-full appearance-none bg-white border border-gray-300 focus:border-black text-gray-900 text-[12px] font-normal rounded-xl px-4 py-3.5 pr-10 outline-none transition-all cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
              <option value="Block">Block</option>
            </select>
            <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none stroke-[2]" />
          </div>
        </div>

        {/* --- BOTTOM ACTION BUTTONS --- */}
        <div className="flex items-center gap-4 pt-4 justify-end">
          
          {/* Clear / Cancel Button */}
          <button
            type="button"
            onClick={formik.handleReset}
            className="flex-1 sm:flex-none px-5 sm:px-10 py-3.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-900 font-medium text-sm rounded-xl transition cursor-pointer active:scale-[0.99]"
          >
            Clear
          </button>

          {/* Confirm / Submit Button */}
          <button
            type="submit"
            className="flex-1 sm:flex-none px-5 sm:px-10 py-3.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition cursor-pointer active:scale-[0.99] shadow-sm shadow-gray-100"
          >
            Confirm
          </button>

        </div>

      </form>
    </div>
  );
}