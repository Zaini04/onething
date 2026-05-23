import { useState } from "react";
import { useFormik } from "formik";
import { clientValidation } from "./../../../validations/ClientValidation";
import { FaArrowLeft } from "react-icons/fa";
import SearchSelect from "../../global/SearchSelect";
import FormInput from "../../global/FormInput";

const AddVendor = () => {
  const [profileImage, setProfileImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      fatherOrHusbandName: "",
      cnic: "",
      phoneNumber: "",
      whatsAppNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      status: "",
    },
    validationSchema: clientValidation,
    onSubmit: (values) => {
      console.log("Form Submitted Data:", { ...values, profileImage });
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 800 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("File size should be less than 800KB");
    }
  };

  const handleClear = () => {
    formik.resetForm();
    setProfileImage(null);
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 bg-[#F9FAFB] rounded-2xl">
      {/* Form Heading Section */}
      <div className="flex justify-between items-center text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">Add Vendor</h2>
        <button
          type="button"
          onClick={() => window.history.back()}
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
        {/* Avatar / Image Upload Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-purple-50 overflow-hidden flex items-center justify-center border border-gray-100">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-12 h-12 text-purple-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>
          <div>
            <div className="flex gap-3 mb-1">
              <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-gray-800 transition shadow-sm">
                Upload new
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              <button
                type="button"
                onClick={() => setProfileImage(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
              >
                Delete
              </button>
            </div>
            <p className="text-[11px] text-gray-400">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
          <FormInput
            label="Name"
            id="name"
            placeholder="Enter vendor name"
            formik={formik}
          />
          <FormInput
            label="Father's / Husband Name"
            id="fatherOrHusbandName"
            placeholder="Enter vendor's father or husband name"
            formik={formik}
          />

          <FormInput
            label="CNIC / NICOP Number"
            id="cnic"
            placeholder="Enter vendor CNIC "
            formik={formik}
          />
          <FormInput
            label="Phone Number"
            id="phoneNumber"
            placeholder="Enter vendor phone number"
            formik={formik}
          />

          <FormInput
            label="WhatsApp Number"
            id="whatsAppNumber"
            placeholder="Enter vendor whatsApp number"
            formik={formik}
          />
          <FormInput
            label="Email"
            id="email"
            placeholder="Enter vendor email"
            type="email"
            formik={formik}
          />

          {/* Address Header Line */}
          <div className="col-span-1 md:col-span-2 pt-2">
            <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Address
            </h3>
          </div>

          <FormInput
            label="Address/Flat Number"
            id="address"
            placeholder="Enter vendor address or flat number"
            formik={formik}
          />
          <SearchSelect
            label="City"
            placeholder="Choose a city"
            options={["Multan", "Lahore", "Karachi", "Islamabad"]}
            value={formik.values.city}
            onChange={(val) => formik.setFieldValue("city", val)}
            onBlur={() => formik.setFieldTouched("city", true)}
            isError={formik.touched.city && !!formik.errors.city}
            errorMessage={formik.errors.city}
          />
          <FormInput
            label="State"
            id="state"
            type="select"
            defaultOption="Select State"
            options={["Punjab", "Sindh", "KPK", "Balochistan"]}
            formik={formik}
          />
          <FormInput
            label="Status"
            id="status"
            type="select"
            defaultOption="Select Status"
            options={["Active", "InActive"]}
            formik={formik}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8 pt-2">
          <button
            type="button"
            onClick={handleClear}
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
};

export default AddVendor;
