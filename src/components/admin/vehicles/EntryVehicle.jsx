import { useFormik } from "formik";
import { entryVehicleValidation } from "../../../validations/EntryVehicleValidation";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchSelect from "../../global/SearchSelect";
import FormInput from "../../global/FormInput";
import { TbRulerMeasure2 } from "react-icons/tb";

export default function EntryVehicle() {
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
    onSubmit: (values, { resetForm }) => {
      console.log("Form Submitted Data:", values);

      resetForm();
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
          {/* 1. Date Field */}
          <FormInput
            label="Date"
            id="date"
            name="date"
            type="date"
            formik={formik}
          ></FormInput>

          <SearchSelect
            label="Client"
            placeholder="Select Client"
            options={["Salman", "Imran Khan", "Saad"]}
            value={formik.values.client}
            onChange={(val) => formik.setFieldValue("client", val, true)}
            onBlur={() => formik.setFieldTouched("client", true, true)}
            isError={formik.touched.client && !!formik.errors.client}
            errorMessage={formik.errors.client}
          />

          {/* 3. Site Dropdown */}
          <SearchSelect
            label="site"
            placeholder="Select Site"
            options={["Multan", "Lahore", "Karachi", "Islamabad"]}
            value={formik.values.site}
            onChange={(val) =>
              formik.setFieldValue("site", val, TbRulerMeasure2)
            }
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
            onChange={(val) => formik.setFieldValue("vehicle", val, true)}
            onBlur={() => formik.setFieldTouched("vehicle", true)}
            isError={formik.touched.vehicle && !!formik.errors.vehicle}
            errorMessage={formik.errors.vehicle}
          />

          {/* 5. Material Dropdown */}
          <FormInput
            label="Material"
            id="material"
            type="select"
            defaultOption="Select Material"
            options={["Concrete", "Sand"]}
            formik={formik}
          />

          {/* 6. Rate Type Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
  <FormInput
            label="Rate Type"
            id="rateType"
            type="select"
            formik={formik}
            defaultOption="Select Rate Type"
            options={["per sqft", "per vehicle"]}
          />

            <FormInput
            label="Rate "
            id="rate"
            type="text"
            placeholder="please enter rate"
            formik={formik}
          />
          </div>
        

          {/* 7. Vendor */}
          <FormInput
            label="Vendor (optional)"
            id="vendor"
            type="text"
            placeholder="----"
            formik={formik}
          />

          {/* 8. Fuel */}
          <FormInput
            label="Fuel (optional)"
            id="fuel"
            type="text"
            placeholder="----"
            formik={formik}
          />

          {/* 9. Driver Expense */}
          <FormInput
            label="Driver Expense"
            id="driverExpense"
            placeholder="please enter amount"
            formik={formik}
          />

          {/* 10. Loading */}
          <FormInput
            label="Loading"
            id="loading"
            placeholder="please enter amount"
            formik={formik}
          />

          {/* 11. Miscellaneous Expenses */}
          <FormInput
            label="Miscellaneous Expenses"
            id="miscellaneousExpenses"
            placeholder="please enter amount"
            formik={formik}
          />

          {/* 12. Total Price */}
          <FormInput
            label="Total Price"
            id="totalPrice"
            placeholder="please enter amount"
            formik={formik}
          />
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
