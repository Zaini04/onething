import { useState, useRef } from "react";
import { useFormik } from "formik";
import { settingsValidation } from "../../validations/settingsValidation";

export default function Settings() {
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      phoneNumber: "",
      accountNumber: "",
      accountHolderName: "",
      companyLogo: null,
    },
    validationSchema: settingsValidation,
    onSubmit: (values) => {
      console.log("Formik Submitted Data:", values);
    },
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("companyLogo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteLogo = () => {
    formik.setFieldValue("companyLogo", null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full px-4 md:px-6 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full pb-4">
        <h1 className="text-xl font-medium text-black tracking-tight">
          Settings
        </h1>
      </div>

      <div className="w-full mt-4 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 bg-[#F4F4F6] rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#1C1C1E] text-white text-xs font-semibold rounded-xl hover:bg-black transition cursor-pointer"
                >
                  Upload new
                </button>
                <button
                  type="button"
                  onClick={handleDeleteLogo}
                  className="px-4 py-2 bg-white text-[#1C1C1E] text-xs font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide">
                Allowed JPG, GIF or PNG. Max size of 800K
              </p>
              {formik.touched.companyLogo && formik.errors.companyLogo && (
                <p className="text-[11px] text-red-500 font-normal">
                  {formik.errors.companyLogo}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1.5 text-[11px] text-gray-400 font-medium tracking-tight z-10">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                onChange={formik.handleChange}
                placeholder="onething"
                onBlur={formik.handleBlur}
                value={formik.values.companyName}
                className={`w-full px-4 py-3 text-xs text-gray-800 bg-white border ${
                  formik.touched.companyName && formik.errors.companyName
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-gray-900"
                } rounded-xl outline-none placeholder:text-gray-400 transition font-normal`}
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <p className="text-[11px] text-red-500 mt-1 pl-1 font-normal">
                  {formik.errors.companyName}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1.5 text-[11px] text-gray-400 font-medium tracking-tight z-10">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="1233456789"
                value={formik.values.phoneNumber}
                className={`w-full px-4 py-3 text-xs text-gray-800 bg-white border ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-gray-900"
                } rounded-xl outline-none placeholder:text-gray-400 transition font-normal`}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-[11px] text-red-500 mt-1 pl-1 font-normal">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1.5 text-[11px] text-gray-400 font-medium tracking-tight z-10">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="36301-1234567-9"
                value={formik.values.accountNumber}
                className={`w-full px-4 py-3 text-xs text-gray-800 bg-white border ${
                  formik.touched.accountNumber && formik.errors.accountNumber
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-gray-900"
                } rounded-xl outline-none placeholder:text-gray-400 transition font-normal`}
              />
              {formik.touched.accountNumber && formik.errors.accountNumber && (
                <p className="text-[11px] text-red-500 mt-1 pl-1 font-normal">
                  {formik.errors.accountNumber}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white px-1.5 text-[11px] text-gray-400 font-medium tracking-tight z-10">
                Account Holder Name
              </label>
              <input
                type="text"
                name="accountHolderName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Imran Khan"
                value={formik.values.accountHolderName}
                className={`w-full px-4 py-3 text-xs text-gray-800 bg-white border ${
                  formik.touched.accountHolderName &&
                  formik.errors.accountHolderName
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 focus:border-gray-900"
                } rounded-xl outline-none placeholder:text-gray-400 transition font-normal`}
              />
              {formik.touched.accountHolderName &&
                formik.errors.accountHolderName && (
                  <p className="text-[11px] text-red-500 mt-1 pl-1 font-normal">
                    {formik.errors.accountHolderName}
                  </p>
                )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                formik.resetForm();
                setLogoPreview(null);
              }}
              className="px-8 py-3 bg-white text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition cursor-pointer min-w-[110px]"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#1C1C1E] text-white text-xs font-semibold rounded-xl hover:bg-black border border-transparent transition cursor-pointer min-w-[110px]"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
