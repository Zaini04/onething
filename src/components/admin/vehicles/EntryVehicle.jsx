import { useFormik } from "formik";
import { entryVehicleValidation } from "../../../validations/EntryVehicleValidation";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchSelect from "../../global/SearchSelect";

// ==========================================
// 1. REUSABLE INPUT COMPONENT (Local)
// ==========================================
function FormInput({ label, name, formik, placeholder, type = "text", children }) {
  const isError = formik.touched[name] && formik.errors[name];
  
  return (
    <div className="relative group w-full">
      <label className="absolute left-3 -top-2.5 z-10 bg-white px-1 text-[11px] font-medium text-gray-400 transition-colors group-focus-within:text-black">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name] || ""}
          className={`w-full px-4 py-3 bg-white border ${
            isError ? "border-red-500" : "border-gray-200"
          } focus:border-black rounded-xl text-xs placeholder:text-xs font-normal text-black placeholder:text-gray-400 outline-none transition-all ${children ? "pr-10" : ""}`}
        />
        {children}
      </div>
      {isError && (
        <span className="text-[11px] text-red-500 ml-1 mt-0.5 block">{formik.errors[name]}</span>
      )}
    </div>
  );
}

// ==========================================
// 2. REUSABLE SELECT COMPONENT (Local)
// ==========================================
function FormSelect({ label, name, formik, defaultOption, options }) {
  const isError = formik.touched[name] && formik.errors[name];
  const hasValue = !!formik.values[name];

  return (
    <div className="relative group w-full">
      <label className="absolute left-3 -top-2.5 z-10 bg-white px-1 text-[11px] font-medium text-gray-400">
        {label}
      </label>
      <select
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name] || ""}
        className={`w-full px-4 py-3 bg-white border ${
          isError ? "border-red-500" : "border-gray-200"
        } focus:border-black placeholder:text-xs rounded-xl text-xs font-normal outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat ${
          hasValue ? "text-black" : "text-gray-400"
        }`}
      >
        <option value="" className="text-gray-400 placeholder:text-xs">{defaultOption}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value || opt} className="text-black placeholder:text-xs">
            {opt.label || opt}
          </option>
        ))}
      </select>
      {isError && (
        <span className="text-[11px] text-red-500 ml-1 mt-0.5 block">{formik.errors[name]}</span>
      )}
    </div>
  );
}

// ==========================================
// 3. MAIN CONTAINER COMPONENT
// ==========================================
export default function EntryVehicle({ onSubmitSuccess }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      date: "",
      client: "",
      site: "",
      vehicle: "",
      material: "",
      rateType: "",
      vendor: "",
      fuel: "",
      driverExpense: "",
      loading: "",
      miscellaneousExpenses: "",
      totalPrice: "",
    },
    validationSchema: entryVehicleValidation,
    onSubmit: (values) => {
      console.log("Form Submitted Data:", values);
      if (onSubmitSuccess) onSubmitSuccess();
    },
  });

  return (
    <div className="w-full mx-auto bg-[#F9FAFB] p-4 md:p-6 rounded-2xl">
      {/* Form Heading Heading */}
      <div className="flex justify-between items-center text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">Entry Vehicle</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaArrowLeft className="cursor-pointer bg-white p-2 rounded-xl w-12 h-9 border border-gray-100 shadow-sm" size={20} />
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
        
        {/* 2-Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
          
          {/* 1. Date Field */}
          <FormInput label="Date" name="date" type="date" formik={formik}>
            {/* <Calendar size={18} className="absolute right-3.5 text-gray-400 pointer-events-none" /> */}
          </FormInput>

          {/* 2. Client Dropdown */}
          {/* <FormSelect 
            label="Client" 
            name="client" 
            formik={formik} 
            defaultOption="Select Client" 
            options={["Salman", "Imran Khan", "Saad"]} 
          /> */}
          <SearchSelect
  label="Client"
  placeholder="Select Client"
  options={["Salman", "Imran Khan", "Saad"]}
  value={formik.values.client}
  onChange={(val) => formik.setFieldValue("client", val)}
    onBlur={() => formik.setFieldTouched("client", true)}
    isError={formik.touched.client && !!formik.errors.client}  
    errorMessage={formik.errors.client}
/>

          {/* 3. Site Dropdown */}
               <SearchSelect
  label="site"
  placeholder="Select Site"
  options={["Multan", "Lahore", "Karachi", "Islamabad"]}
  value={formik.values.site}
  onChange={(val) => formik.setFieldValue("site", val)}
  onBlur={() => formik.setFieldTouched("site", true)}
  isError={formik.touched.site && !!formik.errors.site}
  errorMessage={formik.errors.site}
/>

          {/* 4. Vehicle Dropdown */}
              <SearchSelect
  label="Vehicle"
  placeholder="Select Vehicle"
  options={["Standard Dump Truck", "Mini Dump Trucks"]}
  value={formik.values.vehicle}
  onChange={(val) => formik.setFieldValue("vehicle", val)}
  onBlur={()=>formik.setFieldTouched("vehicle", true)}
  isError={formik.touched.vehicle && !!formik.errors.vehicle}
  errorMessage={formik.errors.vehicle}
/>

          {/* 5. Material Dropdown */}
              <SearchSelect
  label="Material"
  placeholder="Select Material"
  options={["Concrete", "Sand"]}
  value={formik.values.material}
  onChange={(val) => formik.setFieldValue("material", val)}
  onBlur={() => formik.setFieldTouched("material", true)}
  isError={formik.touched.material && !!formik.errors.material}
  errorMessage={formik.errors.material}
/>

          {/* 6. Rate Type Dropdown */}
          <FormSelect 
            label="Rate Type" 
            name="rateType" 
            formik={formik} 
            defaultOption="Select Rate Type" 
            options={["per sqft", "per vehicle"]} 
            
          />

          {/* 7. Vendor */}
          <FormInput label="Vendor (optional)" name="vendor" placeholder="----" formik={formik} />

          {/* 8. Fuel */}
          <FormInput label="Fuel (optional)" name="fuel" placeholder="----" formik={formik} />

          {/* 9. Driver Expense */}
          <FormInput label="Driver Expense" name="driverExpense" placeholder="1000" formik={formik} />

          {/* 10. Loading */}
          <FormInput label="Loading" name="loading" placeholder="10000" formik={formik} />

          {/* 11. Miscellaneous Expenses */}
          <FormInput label="Miscellaneous Expenses" name="miscellaneousExpenses" placeholder="5000" formik={formik} />

          {/* 12. Total Price */}
          <FormInput label="Total Price" name="totalPrice" placeholder="20000" formik={formik} />

        </div>

        {/* --- FORM ACTION BUTTONS --- */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-2">
          <button
            type="button"
            onClick={formik.handleReset}
            className="px-5 sm:px-8 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            Clear
          </button>

          <button
            type="submit"
            className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            Confirm
          </button>
        </div>

      </form>
    </div>
  );
}