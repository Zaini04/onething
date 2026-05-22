import { Formik, Form, Field } from "formik";
import { addFuelCompany } from "../../../validations/AddFuelCompanyValidation";


export default function AddFuelCompany() {
  const initialValues = {
    fuelCompany: "",
    fuelLitter: "",
  };

  const handleSubmit = (values, ) => {
    console.log("Fuel Company Formik Data Submitted:", values);
    // Yahan aap apni API call kar sakte hain
  };

  return (
    <div className="min-h-screen bg-white rounded-2xl flex items-start justify-center p-4">
      <div className="w-full max-w-[440px]">
        <h2 className="text-lg font-medium text-black mb-6 tracking-tight ">
          Add Fuel Company
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={addFuelCompany}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleReset }) => (
            <Form className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/40 flex flex-col min-h-[520px] justify-between">
              
              {/* Fields Group */}
              <div className="space-y-6 pt-2">
                
                {/* Fuel Company Input */}
                <div className="relative">
                  <label 
                    htmlFor="fuelCompany" 
                    className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-400 tracking-wide z-10"
                  >
                    Fuel Company
                  </label>
                  <Field
                    type="text"
                    id="fuelCompany"
                    name="fuelCompany"
                    placeholder="e.g. PSO, Shell"
                    className={`w-full bg-white text-gray-900 font-normal placeholder:text-gray-300 text-[12px] px-5 py-3.5 rounded-xl border transition-all duration-200 outline-none ${
                      errors.fuelCompany && touched.fuelCompany
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-100" 
                        : "border-gray-300 focus:border-black"
                    }`}
                  />
                  {errors.fuelCompany && touched.fuelCompany && (
                    <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.fuelCompany}</p>
                  )}
                </div>

                {/* Fuel Litter Input */}
                <div className="relative">
                  <label 
                    htmlFor="fuelLitter" 
                    className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-400 tracking-wide z-10"
                  >
                    Fuel Litter
                  </label>
                  <Field
                    type="text"
                    id="fuelLitter"
                    name="fuelLitter"
                    placeholder="e.g. 20"
                    className={`w-full bg-white text-gray-900 font-normal placeholder:text-gray-300 text-[12px] px-5 py-3.5 rounded-xl border transition-all duration-200 outline-none ${
                      errors.fuelLitter && touched.fuelLitter
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-100" 
                        : "border-gray-300 focus:border-black"
                    }`}
                  />
                  {errors.fuelLitter && touched.fuelLitter && (
                    <p className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.fuelLitter}</p>
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