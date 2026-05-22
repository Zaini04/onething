import { useState } from 'react';
import { useFormik } from 'formik';
import { FiChevronDown, FiTrash2 } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa';
import { addSiteValidation } from '../../../validations/AddSiteValidation';
import SearchSelect from '../../global/SearchSelect';

// ==========================================
// REUSABLE HELPER COMPONENTS
// ==========================================

const InputField = ({ label, id, placeholder, type = 'text', formik, value, onChange, onBlur, isCustomError, readOnly }) => {
  const isError = isCustomError || (formik ? formik.touched[id] && formik.errors[id] : false);
  
  return (
    <div className="relative w-full group">
      <label htmlFor={id} className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 z-10 transition-colors group-focus-within:text-black">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        {...(formik && !onChange ? formik.getFieldProps(id) : {})}
        className={`w-full px-4 py-2.5 border rounded-xl text-xs font-normal text-black placeholder:text-gray-400 focus:outline-none transition-all ${
          readOnly ? 'bg-gray-50/50 cursor-not-allowed select-none' : ''
        } ${
          isError
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-200 focus:border-black'
        }`}
      />
      {isError && formik?.errors[id] && (
        <p className="text-[11px] text-red-500 mt-0.5 ml-1 block">{formik.errors[id]}</p>
      )}
    </div>
  );
};

const SelectField = ({ label, id, options, defaultOption, formik, value, onChange, onBlur, isCustomError }) => {
  const isError = isCustomError || (formik ? formik.touched[id] && formik.errors[id] : false);
  const currentVal = value !== undefined ? value : (formik ? formik.values[id] : "");
  const hasValue = !!currentVal && currentVal !== "";

  return (
    <div className="relative w-full group">
      <label htmlFor={id} className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 z-10">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...(formik && !onChange ? formik.getFieldProps(id) : {})}
          className={`w-full px-4 py-2.5 border rounded-xl text-xs font-normal appearance-none bg-white focus:outline-none transition-all ${
            isError
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-200 focus:border-black'
          } ${hasValue ? 'text-black' : 'text-gray-400'}`}
        >
          {defaultOption && <option value="" className="text-gray-400">{defaultOption}</option>}
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-black">
              {opt}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-base" />
      </div>
      {isError && formik?.errors[id] && (
        <p className="text-[11px] text-red-500 mt-0.5 ml-1 block">{formik.errors[id]}</p>
      )}
    </div>
  );
};

// ==========================================
// YUP VALIDATION SCHEMA
// ==========================================


// ==========================================
// MAIN ADD NEW SITE COMPONENT
// ==========================================

const AddSite = () => {
  const [siteImage, setSiteImage] = useState(null);
  const availableMaterials = ['Soil', 'Sand', 'Crush', 'Gravel', 'Concrete'];

  const formik = useFormik({
    initialValues: {
      client: '',
      siteName: '',
      address: '',
      materials: [],
    },
    validationSchema: addSiteValidation,
    onSubmit: (values) => {
      console.log('Site Submitted Data:', { ...values, siteImage });
    },
  });

  const handleMaterialSelect = (e) => {
    const selected = e.target.value;
    if (selected && !formik.values.materials.some(item => item.name === selected)) {
      const updatedMaterials = [
        ...formik.values.materials,
        { name: selected, rateType: '', rate: '' }
      ];
      formik.setFieldValue('materials', updatedMaterials);
    }
    e.target.value = "";
  };

  const handleRemoveMaterial = (indexToRemove) => {
    const updatedMaterials = formik.values.materials.filter((_, index) => index !== indexToRemove);
    formik.setFieldValue('materials', updatedMaterials);
  };

 const handleMaterialDataChange = (index, field, value) => {
  if (field === 'rate') {
    // Agar input mein koi bhi aisi cheez hai jo number nahi hai
    if (/[^0-9]/.test(value)) {
      // 1. Type hone se rok diya (kuch nahi badla)
      // 2. Formik ko bola ke is field par error dikhao
      formik.setFieldError(`materials[${index}].rate`, 'Please write numbers only');
      formik.setFieldTouched(`materials[${index}].rate`, true, false);
      return; // Yahin se wapas mud jao, state update mat karo
    }
  }

  // Agar sab theek hai toh normal value update kar do
  const updatedMaterials = [...formik.values.materials];
  updatedMaterials[index][field] = value;
  formik.setFieldValue('materials', updatedMaterials);
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
          <FaArrowLeft className="cursor-pointer bg-white p-2 rounded-xl w-12 h-9 border border-gray-100 shadow-sm" size={20} />
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
        
        {/* Avatar Area */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-purple-50 overflow-hidden flex items-center justify-center border border-gray-100">
            {siteImage ? (
              <img src={siteImage} alt="Site Preview" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-12 h-12 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>
          <div>
            <div className="flex gap-3 mb-1">
              <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-gray-800 transition shadow-sm">
                Upload new
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              <button
                type="button"
                onClick={() => setSiteImage(null)}
                className="px-4 py-2 cursor-pointer border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
              > 
                Delete
              </button>
            </div>
            <p className="text-[11px] text-gray-400">Allowed JPG, GIF or PNG. Max size of 800K</p>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
          
           <SearchSelect
            label="Client"
            placeholder="Choose a client"
            options={["Salman", "Imran Khan", "Saad"]}
            value={formik.values.client}
            onChange={(val) => formik.setFieldValue("client", val)}
            onBlur={() => formik.setFieldTouched("client", true)}
            isError={formik.touched.client && !!formik.errors.client}
            errorMessage={formik.errors.client}
          />        
          
          <InputField 
            label="Site Name" 
            id="siteName" 
            placeholder="Multan" 
            formik={formik} 
          />
          
          <InputField 
            label="Address" 
            id="address" 
            placeholder="Plot 41 B, Block B Model Town" 
            formik={formik} 
          />

          <div>
            <SelectField
              label="Select Material"
              id="materialSelection"
              defaultOption="Choose materials to add..."
              options={availableMaterials}
              formik={formik}
              onChange={handleMaterialSelect}
            />
            {formik.touched.materials && typeof formik.errors.materials === 'string' && (
              <p className="text-[11px] text-red-500 mt-1 ml-1">{formik.errors.materials}</p>
            )}
          </div>

          {/* Dynamic Selection Rows */}
          {formik.values.materials.length > 0 && (
            <div className="col-span-1 md:col-span-2 flex flex-col gap-5 mt-2">
              {formik.values.materials.map((material, index) => {
                const itemErrors = formik.errors.materials?.[index] || {};
                const itemTouched = formik.touched.materials?.[index] || {};

                return (
                  <div key={material.name} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full bg-white">
                    
                    {/* 3 Fields Layout Container */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:flex-1">
                      
                      {/* 1. Material Type (Styled exactly like InputField) */}
                      <InputField
                        label="Material Type"
                        id={`materialName-${index}`}
                        value={material.name}
                        readOnly={true}
                      />

                      {/* 2. Rate Type Dropdown */}
                      <div>
                        <SelectField
                          label="Rate Type"
                          id={`rateType-${index}`}
                          defaultOption="Select Type"
                          options={['per sqft', 'per vehicle']}
                          value={material.rateType}
                          isCustomError={itemTouched.rateType && !!itemErrors.rateType}
                          onChange={(e) => handleMaterialDataChange(index, 'rateType', e.target.value)}
                          onBlur={() => formik.setFieldTouched(`materials[${index}].rateType`, true)}
                        />
                        {itemTouched.rateType && itemErrors.rateType && (
                          <p className="text-[11px] text-red-500 mt-0.5 ml-1">{itemErrors.rateType}</p>
                        )}
                      </div>

                      {/* 3. Rate Input (Numbers Only, No Arrows) */}
                      <div>
                        <InputField
                          label="Rate"
                          id={`rate-${index}`}
                          placeholder="e.g. 1500"
                          type="text" // Input text rakha hai arrows hatane ke liye, backend regex handle karega numbers only
                          value={material.rate}
                          isCustomError={itemTouched.rate && !!itemErrors.rate}
                          onChange={(e) => handleMaterialDataChange(index, 'rate', e.target.value)}
                          onBlur={() => formik.setFieldTouched(`materials[${index}].rate`, true)}
                        />
                        {itemTouched.rate && itemErrors.rate && (
                          <p className="text-[11px] text-red-500 mt-0.5 ml-1">{itemErrors.rate}</p>
                        )}
                      </div>

                    </div>

                    {/* Row Delete Action Button at the end */}
                    <button
                      type="button"
                      onClick={() => handleRemoveMaterial(index)}
                      className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all cursor-pointer self-start sm:self-auto sm:h-[38px] flex items-center justify-center border border-red-100 shadow-2xs"
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