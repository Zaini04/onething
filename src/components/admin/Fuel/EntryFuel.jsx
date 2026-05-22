import { Formik, Form, Field } from "formik";
import { entryFuel } from "../../../validations/EntryFuelValidation";


export default function EntryFuel() {
  const initialValues = {
    vehicle: "",
    fuelCompany: "",
    fuelLitter: "",
    totalPrice: "",
  };

  const handleSubmit = (values, ) => {
    // API ya database mein bhejne ke liye commas remove kar rahe hain
    const cleanSubmitValues = {
      ...values,
      totalPrice: values.totalPrice.replace(/,/g, ""),
    };
    console.log("Fuel Entry Formik Data (Cleaned):", cleanSubmitValues);
  };

  return (
    <div className="min-h-screen bg-white rounded-2xl flex items-start justify-center p-4">
      <div className="w-full max-w-[440px]">
        <h2 className="text-lg font-medium text-black mb-6 tracking-tight">
          Fuel Entry
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={entryFuel}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleReset, setFieldValue }) => (
            <Form className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/40 flex flex-col min-h-[580px] justify-between">
              
              {/* Fields Container */}
              <div className="space-y-6 pt-2">
                
                {/* Vehicle Input */}
                <div className="relative">
                  <label htmlFor="vehicle" className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-400 tracking-wide z-10">
                    Vehicle
                  </label>
                  <Field
                    type="text"
                    id="vehicle"
                    name="vehicle"
                    placeholder="e.g. Mini Dump Truck"
                    className={`w-full bg-white text-gray-900 font-normal text-[12px] placeholder:text-gray-300 px-5 py-3.5 rounded-xl border transition-all duration-200 outline-none ${
                      errors.vehicle && touched.vehicle ? "border-red-500 focus:border-red-500 ring-1 ring-red-100" : "border-gray-300 focus:border-black"
                    }`}
                  />
                  {errors.vehicle && touched.vehicle && (
                    <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.vehicle}</p>
                  )}
                </div>

                {/* Fuel Company Input */}
                <div className="relative">
                  <label htmlFor="fuelCompany" className="absolute -top-2.5 left-3 bg-white px-1.5 text-[11px] font-medium text-gray-400 tracking-wide z-10">
                    Fuel Company
                  </label>
                  <Field
                    type="text"
                    id="fuelCompany"
                    name="fuelCompany"
                    placeholder="e.g. PSO"
                    className={`w-full bg-white text-gray-900 font-normal placeholder:text-gray-300 text-[12px] px-5 py-3.5 rounded-xl border transition-all duration-200 outline-none ${
                      errors.fuelCompany && touched.fuelCompany ? "border-red-500 focus:border-red-500 ring-1 ring-red-100" : "border-gray-300 focus:border-black"
                    }`}
                  />
                  {errors.fuelCompany && touched.fuelCompany && (
                    <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.fuelCompany}</p>
                  )}
                </div>

                {/* Fuel Litter Input */}
                <div className="relative">
                  <label htmlFor="fuelLitter" className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs  font-medium text-gray-400 tracking-wide z-10">
                    Fuel Litter
                  </label>
                  <Field
                    type="text"
                    id="fuelLitter"
                    name="fuelLitter"
                    placeholder="e.g. 20"
                    className={`w-full bg-white text-gray-900 font-normal placeholder:text-gray-300 text-[12px] px-5 py-3.5 rounded-xl border transition-all duration-200 outline-none ${
                      errors.fuelLitter && touched.fuelLitter ? "border-red-500 focus:border-red-500 ring-1 ring-red-100" : "border-gray-300 focus:border-black"
                    }`}
                  />
                  {errors.fuelLitter && touched.fuelLitter && (
                    <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.fuelLitter}</p>
                  )}
                </div>

                {/* Total Price Input with dynamic commas */}
                <div className="relative">
                  <label htmlFor="totalPrice" className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-400 tracking-wide z-10">
                    Total Price
                  </label>
                  <Field name="totalPrice">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="totalPrice"
                        placeholder="e.g. 18,000"
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-digits
                          const formattedValue = rawValue ? Number(rawValue).toLocaleString() : "";
                          setFieldValue("totalPrice", formattedValue);
                        }}
                        className={`w-full bg-white text-gray-900 font-normal placeholder:text-gray-300 text-[12px] px-5 py-3.5 rounded-xl border transition-all duration-200 outline-none ${
                          errors.totalPrice && touched.totalPrice ? "border-red-500 focus:border-red-500 ring-1 ring-red-100" : "border-gray-300 focus:border-black"
                        }`}
                      />
                    )}
                  </Field>
                  {errors.totalPrice && touched.totalPrice && (
                    <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.totalPrice}</p>
                  )}
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-3.5 text-[14px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 text-[14px] font-semibold text-white bg-[#1A1A1A] rounded-xl hover:bg-black active:scale-[0.98] transition-all shadow-sm cursor-pointer"
                >
                  Confirm
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}