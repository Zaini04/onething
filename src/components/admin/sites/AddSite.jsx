import { useState } from "react";
import { useFormik } from "formik";
import { FiTrash2 } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { addSiteValidation } from "../../../validations/AddSiteValidation";
import SearchSelect from "../../global/SearchSelect";
import FormInput from "../../global/FormInput";

const AddSite = () => {
  const [siteImage, setSiteImage] = useState(null);
  const availableMaterials = ["Soil", "Sand", "Crush", "Gravel", "Concrete"];

  const formik = useFormik({
    initialValues: {
      client: "",
      siteName: "",
      address: "",
      materials: [],
    },
    validationSchema: addSiteValidation,
    onSubmit: (values) => {
      console.log("Site Submitted Data:", { ...values, siteImage });
    },
  });

  const handleMaterialSelect = (e) => {
    const selected = e.target.value;
    if (
      selected &&
      !formik.values.materials.some((item) => item.name === selected)
    ) {
      const updatedMaterials = [
        ...formik.values.materials,
        { name: selected, rateType: "", rate: "" },
      ];
      formik.setFieldValue("materials", updatedMaterials);
    }

    e.target.value = "";
  };

  const handleRemoveMaterial = (indexToRemove) => {
    const updatedMaterials = formik.values.materials.filter(
      (_, index) => index !== indexToRemove,
    );
    formik.setFieldValue("materials", updatedMaterials);
  };

  const handleMaterialDataChange = (index, field, value) => {
    if (field === "rate") {
      if (/[^0-9]/.test(value)) {
        formik.setFieldError(
          `materials[${index}].rate`,
          "Please write numbers only",
        );
        formik.setFieldTouched(`materials[${index}].rate`, true, false);
        return;
      }
    }

    const updatedMaterials = [...formik.values.materials];
    updatedMaterials[index][field] = value;
    formik.setFieldValue("materials", updatedMaterials);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 800 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setSiteImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("File size should be less than 800KB");
    }
  };

  const handleClear = () => {
    formik.resetForm();
    setSiteImage(null);
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 bg-[#F9FAFB] rounded-2xl">
      {/* Form Heading Section */}
      <div className="flex justify-between items-center text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">Add Site</h2>
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
        {/* Avatar Area */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-purple-50 overflow-hidden flex items-center justify-center border border-gray-100">
            {siteImage ? (
              <img
                src={siteImage}
                alt="Site Preview"
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
                onClick={() => setSiteImage(null)}
                className="px-4 py-2 cursor-pointer border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
          <SearchSelect
            label="Client"
            placeholder="Choose a client"
            options={["Salman", "Imran Khan", "Saad"]}
            value={formik.values.client}
            onChange={(val) => formik.setFieldValue("client", val, true)}
            onBlur={() => formik.setFieldTouched("client", true, true)}
            isError={formik.touched.client && !!formik.errors.client}
            errorMessage={formik.errors.client}
          />

          <SearchSelect
            label="Site Name"
            placeholder="Choose a site name"
            options={["Multan", "Lahore", "Karachi", "Islamabad"]}
            value={formik.values.siteName}
            onChange={(val) => formik.setFieldValue("siteName", val, true)}
            onBlur={() => formik.setFieldTouched("siteName", true, true)}
            isError={formik.touched.siteName && !!formik.errors.siteName}
            errorMessage={formik.errors.siteName}
          />

          <FormInput
            label="Address"
            id="address"
            placeholder="Plot 41 B, Block B Model Town"
            formik={formik}
          />

          <div>
            <FormInput
              label="Select Material"
              id="materialSelection"
              type="select"
              defaultOption="Choose materials to add..."
              options={availableMaterials}
              formik={formik}
              onChange={handleMaterialSelect}
              materialsList={formik.values.materials}
              onRemoveMaterial={handleRemoveMaterial}
            />
            {formik.touched.materials &&
              typeof formik.errors.materials === "string" && (
                <p className="text-[11px] text-red-500 mt-1 ml-1">
                  {formik.errors.materials}
                </p>
              )}
          </div>

          {/* Dynamic Selection Rows */}
          {formik.values.materials.length > 0 && (
            <div className="col-span-1  md:col-span-2 flex flex-col gap-5 mt-2">
              {formik.values.materials.map((material, index) => {
                const itemErrors = formik.errors.materials?.[index] || {};
                const itemTouched = formik.touched.materials?.[index] || {};

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:flex-1">
                    {/* 1. Material Type  */}
                    <FormInput
                      label="Material Type"
                      id={`materialName-${index}`}
                      value={material.name}
                      readOnly={true}
                    />

                    {/* 2. Rate Type Dropdown */}
                    <div>
                      <FormInput
                        label="Rate Type"
                        id={`rateType-${index}`}
                        type="select"
                        defaultOption="Select Type"
                        options={["per sqft", "per vehicle"]}
                        value={material.rateType}
                        isCustomError={
                          itemTouched.rateType && !!itemErrors.rateType
                        }
                        onChange={(e) =>
                          handleMaterialDataChange(
                            index,
                            "rateType",
                            e.target.value,
                          )
                        }
                        onBlur={() =>
                          formik.setFieldTouched(
                            `materials[${index}].rateType`,
                            true,
                          )
                        }
                      />
                      {itemTouched.rateType && itemErrors.rateType && (
                        <p className="text-[11px] text-red-500 mt-0.5 ml-1">
                          {itemErrors.rateType}
                        </p>
                      )}
                    </div>

                    {/* 3. Rate Input (Numbers Only, No Arrows) */}
                    <div>
                      <FormInput
                        label="Rate"
                        id={`rate-${index}`}
                        placeholder="e.g. 1500"
                        type="text"
                        value={material.rate}
                        isCustomError={itemTouched.rate && !!itemErrors.rate}
                        onChange={(e) =>
                          handleMaterialDataChange(
                            index,
                            "rate",
                            e.target.value,
                          )
                        }
                        onBlur={() =>
                          formik.setFieldTouched(
                            `materials[${index}].rate`,
                            true,
                          )
                        }
                      />
                      {itemTouched.rate && itemErrors.rate && (
                        <p className="text-[11px] text-red-500 mt-0.5 ml-1">
                          {itemErrors.rate}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveMaterial(index)}
                      className="p-3 bg-red-50 hover:bg-red-100  text-red-500 rounded-xl transition-all cursor-pointer self-start sm:self-auto sm:h-[38px] flex items-center justify-center border border-red-100 shadow-2xs"
                      title="Delete Row"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                );
              })}
            </div>
          )}
        </div>

        {/* Form Action Buttons */}
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
            className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSite;
