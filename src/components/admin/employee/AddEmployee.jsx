import { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom"; 
import { clientValidation } from "./../../../validations/ClientValidation";
import { FaArrowLeft } from "react-icons/fa";
import SearchSelect from "../../global/SearchSelect";
import FormInput from "../../global/FormInput";
import Axios from "../../../configs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastError } from "../../../hooks/toastError";
import { employeeValidation } from "../../../validations/EmployeeValidation";

const AddEmployee = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location",location.state);
  
  const editData = location.state?.employeeData; 

  const isEditMode = !!editData; 
      const [isSubmitting, setIsSubmitting] = useState(false);

  const [profileImage, setProfileImage] = useState(editData?.image || null);

  // Dynamic mutation configuration matching your vehicle implementation workflow
  const clientMutation = useMutation({
    mutationFn: async (payload) => {
      setIsSubmitting(true)
      if (isEditMode) {
        return Axios.put(`/employee/${editData._id}`, payload);
      }
      return Axios.post('/employee/add_employee', payload);
    },
    onSuccess: () => {
      // Invalidates cache layer telling clients view to re-fetch on mount
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employeesDropdown"] });
      setIsSubmitting(false)
      formik.resetForm();

      setProfileImage(null);

      
      toast.success(isEditMode ? "Employee updated successfully!" : "Employee created successfully!");
      navigate("/app/employees");
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
      setIsSubmitting(false)
      // const errorMsg = err.response?.data?.message || err.response?.data?.error?.message2 || "An unexpected error occurred.";
      toastError(err);
    }
  });

  const formik = useFormik({
    initialValues: {
      name: editData?.name || "",
      fatherOrHusbandName: editData?.fatherOrHusbandName || "",
      cnicOrNicop: editData?.cnicOrNicop || "",
      phoneNumber: editData?.phoneNumber || "",
      whatsAppNumber: editData?.whatsAppNumber || "",
      email: editData?.email || "",
      address: editData?.address || "",
      city: editData?.city || "",
      state: editData?.state || "",
      status: editData?.status || "",
      monthlySalary:editData?.monthlySalary || ""
    },
    enableReinitialize: true, 
    validationSchema: employeeValidation,
    onSubmit: async (values) => {
              const cleanMonthlySalary = Number(values.monthlySalary?.toString().replace(/,/g, "")) || 0;

      const submissionPayload = { ...values,monthlySalary:cleanMonthlySalary, image: profileImage || "" };
      clientMutation.mutate(submissionPayload);
      
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 800 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      toast.error("File size should be less than 800KB");
    }
  };

  const handleClear = () => {
    formik.resetForm();
    setProfileImage(null);
    if (isEditMode) {
      navigate("/app/employees");
    }
  };

  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  p-4 md:pl-8 bg-[#F9FAFB]  rounded-2xl">
      <div className="flex justify-between items-center text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">{isEditMode ? "Edit Employee" : "Add Employee"}</h2>
        <button
          type="button"
          disabled={clientMutation.isLoading}
          onClick={() => navigate("/app/employees")}
          className="text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
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
              <label className={`cursor-pointer bg-black text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-gray-800 transition shadow-sm ${clientMutation.isLoading ? "opacity-50 pointer-events-none" : ""}`}>
                Upload new
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={clientMutation.isLoading}
                />
              </label>
              <button
                type="button"
                disabled={clientMutation.isLoading}
                onClick={() => setProfileImage(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm disabled:opacity-50"
              >
                Delete
              </button>
            </div>
            <p className="text-[11px] text-gray-400">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
          <FormInput
            label="Name"
            id="name"
            placeholder="Enter Employee name"
            formik={formik}
          />
          <FormInput
            label="Father's / Husband Name"
            id="fatherOrHusbandName"
            placeholder="Enter employee's father or husband name"
            formik={formik}
          />

          <FormInput
            label="CNIC / NICOP Number"
            id="cnicOrNicop"
            placeholder="Enter employee CNIC"
            formik={formik}
          />
          <FormInput
            label="Phone Number"
            id="phoneNumber"
            placeholder="Enter employee phone number"
            formik={formik}
          />

          <FormInput
            label="WhatsApp Number"
            id="whatsAppNumber"
            placeholder="Enter employee whatsApp number"
            formik={formik}
          />
          <FormInput
            label="Email"
            id="email"
            placeholder="Enter employee email"
            type="email"
            formik={formik}
          />
           <FormInput
            label="Salary Per Month"
            id="monthlySalary"
            placeholder="Enter employee salary"
            type="text"
            formik={formik}
          />

          <div className="col-span-1 md:col-span-2 pt-2">
            <h3 className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
              Address
            </h3>
          </div>

          <FormInput
            label="Address/Flat Number"
            id="address"
            placeholder="Enter employee address or flat number"
            formik={formik}
          />
          <SearchSelect
            label="City"
            placeholder="Choose a city"
            options={["Multan", "Lahore", "Karachi", "Islamabad"]}
            value={formik.values.city}
            onChange={(val) => formik.setFieldValue("city", val, true)}
            onBlur={() => formik.setFieldTouched("city", true, true)}
            isError={formik.touched.city && !!formik.errors.city}
            errorMessage={formik.errors.city}
          />
          <FormInput
            label="State"
            type="select"
            id="state"
            defaultOption="Select State"
            options={["Punjab", "Sindh", "KPK", "Balochistan"]}
            formik={formik}
          />
          <FormInput
            label="Status"
            type="select"
            id="status"
            defaultOption="Select Status"
            options={["Active", "Inactive"]}
            formik={formik}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-2">
          <button
            type="button"
            disabled={clientMutation.isLoading}
            onClick={handleClear}
            className="px-5 sm:px-8 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 sm:px-8 py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                <span>Processing...</span>
              </>
            ) : (
              <span>Confirm</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;