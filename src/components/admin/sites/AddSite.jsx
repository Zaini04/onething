import { useState } from "react";
import { useFormik } from "formik";
import { FiTrash2 } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { addSiteValidation } from "../../../validations/AddSiteValidation";
import SearchSelect from "../../global/SearchSelect";
import FormInput from "../../global/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../../../configs/api";
import { toast } from "react-toastify";
import { toastError } from "../../../hooks/toastError";
import { useClientDropdown } from "../../../redux/actions/clientAction";

const AddSite = () => {
  const availableMaterials = ["Soil", "Sand", "Crush", "Gravel", "Concrete"];
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  
  const editData = location.state?.siteData; 
  const isEditMode = !!editData; 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Syncing image states with updated schema property
  const [siteImage, setSiteImage] = useState(editData?.image || null);

  const clientMutation = useMutation({
    mutationFn: async (payload) => {
      setIsSubmitting(true);
      if (isEditMode) {
        return Axios.put(`/site/${editData._id}`, payload);
      }
      return Axios.post('/site/add_site', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
      setIsSubmitting(false);
      formik.resetForm();
      setSiteImage(null);
      toast.success(isEditMode ? "Site updated successfully!" : "Site created successfully!");
      navigate("/app/sites");
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
      setIsSubmitting(false);
      toastError(err);
    }
  });

  const formik = useFormik({
    initialValues: {
      client: editData?.client._id || "",
      siteName: editData?.siteName || "",
      address: editData?.address || "",
      // Map incoming materialsRates from DB schema array keys to form field array keys
      materialsRates: editData?.materialsRates?.map(item => ({
        materialType: item.materialType,
        rateType: item.rateType === "per sft" ? "per sft" : item.rateType, // ensuring alignment with "per sft"
        rate: item.rate.toString(),
      })) || [],
    },
    validationSchema: addSiteValidation,
    onSubmit: (values) => {
      // Append base64 image or URL back to the exact 'image' key expected by Mongoose
      const finalPayload = {
        ...values,
        image: siteImage,
      };
      
      clientMutation.mutate(finalPayload);
    },
  });

const { data: clientDropdownData, } = useClientDropdown();

const clientOptions =
  clientDropdownData?.map((c) => ({
    id: c._id,
    name: c.name,
  })) || [];

  const handleMaterialSelect = (e) => {
    const selected = e.target.value;
    if (
      selected &&
      !formik.values.materialsRates.some((item) => item.materialType === selected)
    ) {
      const updatedMaterials = [
        ...formik.values.materialsRates,
        { materialType: selected, rateType: "", rate: "" },
      ];
      formik.setFieldValue("materialsRates", updatedMaterials);
    }
    e.target.value = "";
  };

  const handleRemoveMaterial = (indexToRemove) => {
    const updatedMaterials = formik.values.materialsRates.filter(
      (_, index) => index !== indexToRemove,
    );
    formik.setFieldValue("materialsRates", updatedMaterials);
  };

  const handleMaterialDataChange = (index, field, value) => {
    if (field === "rate") {
      if (/[^0-9]/.test(value)) {
        formik.setFieldError(
          `materialsRates[${index}].rate`,
          "Please write numbers only",
        );
        formik.setFieldTouched(`materialsRates[${index}].rate`, true, false);
        return;
      }
    }

    const updatedMaterials = [...formik.values.materialsRates];
    updatedMaterials[index][field] = value;
    formik.setFieldValue("materialsRates", updatedMaterials);
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
    if (isEditMode) {
      navigate("/app/sites");
    }
  };

  return (
    <div className="w-full md:w-[85%] lg:w-[88%] xl:w-[90%]  p-4 md:pl-8 mx-auto bg-[#F9FAFB]  rounded-2xl">
      <div className="flex justify-between items-center text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">{isEditMode ? "Edit Site" : "Add Site"}</h2>
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
        {/* Profile/Site Image Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
          <SearchSelect
            label="Client"
            placeholder="Choose a client"
            options={clientOptions}
            value={formik.values.client}
            onChange={(val) => formik.setFieldValue("client", val, true)}
            onBlur={() => formik.setFieldTouched("client", true, true)}
            isError={formik.touched.client && !!formik.errors.client}
            errorMessage={formik.errors.client}
          />

          <FormInput
            label="Site Name"
            id='siteName'
            placeholder="Enter a site name"
            formik={formik}
            
          />

          <FormInput
            label="Address"
            id="address"
            placeholder="Enter address"
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
              materialsList={formik.values.materialsRates}
              onRemoveMaterial={handleRemoveMaterial}
            />
            {formik.touched.materialsRates &&
              typeof formik.errors.materialsRates === "string" && (
                <p className="text-[11px] text-red-500 mt-1 ml-1">
                  {formik.errors.materialsRates}
                </p>
              )}
          </div>

          {formik.values.materialsRates.length > 0 && (
            <div className="col-span-1 md:col-span-2 flex flex-col gap-5 mt-2">
              {formik.values.materialsRates.map((material, index) => {
                const itemErrors = formik.errors.materialsRates?.[index] || {};
                const itemTouched = formik.touched.materialsRates?.[index] || {};

                return (
                  <div key={index} className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:flex-1">
                    <FormInput
                      label="Material Type"
                      id={`materialsRates[${index}].materialType`}
                      value={material.materialType}
                      readOnly={true}
                    />

                    <div>
                      <FormInput
                        label="Rate Type"
                        id={`materialsRates[${index}].rateType`}
                        type="select"
                        defaultOption="Select Type"
                        options={["per sft", "per vehicle"]} // Swapped out "per sqft" to precisely match your Mongoose enum values
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
                            `materialsRates[${index}].rateType`,
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

                    <div>
                      <FormInput
                        label="Rate"
                        id={`materialsRates[${index}].rate`}
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
                            `materialsRates[${index}].rate`,
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
                      className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all cursor-pointer self-start sm:self-auto sm:h-[38px] flex items-center justify-center border border-red-100 shadow-2xl"
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
            disabled={isSubmitting}
            className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] disabled:bg-gray-400 text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
          >
            {isSubmitting ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSite;