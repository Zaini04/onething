import { useFormik } from "formik";
import { entryFuel } from "../../../validations/EntryFuelValidation";
import FormInput from "../../global/FormInput";

export default function EntryFuel() {
  const formik = useFormik({
    initialValues: {
      vehicle: "",
      fuelCompany: "",
      fuelLitter: "",
      totalPrice: "",
    },
    validationSchema: entryFuel,
    onSubmit: (values, { resetForm }) => {
      const cleanSubmitValues = {
        ...values,
        totalPrice: values.totalPrice.replace(/,/g, ""),
      };
      console.log("Fuel Entry Data (Cleaned):", cleanSubmitValues);

      resetForm();
    },
  });

  return (
    <div className=" bg-white rounded-2xl flex items-start justify-center p-4">
      <div className="w-full lg:max-w-[440px]">
        {/* Form Heading */}
        <h2 className="text-lg font-medium text-black mb-6 tracking-tight">
          Fuel Entry
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className=" rounded-2xl flex flex-col justify-between"
        >
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-7 pt-2">
            <FormInput
              label="Vehicle"
              id="vehicle"
              type="text"
              placeholder="Enter vehicle name"
              formik={formik}
            />

            <FormInput
              label="Fuel Company"
              id="fuelCompany"
              type="text"
              placeholder="Enter fuel company name"
              formik={formik}
            />

            <FormInput
              label="Fuel Litter"
              id="fuelLitter"
              type="text"
              placeholder="Enter fuel litter "
              formik={formik}
              value={formik.values.fuelLitter}
            />

            <FormInput
              label="Total Price"
              id="totalPrice"
              type="text"
              placeholder="Enter total price"
              formik={formik}
              value={formik.values.totalPrice}
            />
          </div>

          <div className="flex items-center gap-4 mt-8 justify-start lg:justify-end">
            <button
              type="button"
              onClick={formik.handleReset} // Formik handles validation clear and state reset
              className="flex-1 w-fit sm:flex-none px-2 sm:px-10 py-3.5 text-[14px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
            >
              Clear
            </button>

            <button
              type="submit"
              className="flex-1 w-fit sm:flex-none px-2 sm:px-10 py-3.5 text-[14px] font-semibold text-white bg-[#1A1A1A] rounded-xl hover:bg-black active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
