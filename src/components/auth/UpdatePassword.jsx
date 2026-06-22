import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserPasswordValidation } from "../../validations/AddUserValidation";
import Axios from "../../configs/api";
import { toastError } from "../../hooks/toastError";
import { toast } from "react-toastify";
import { useState } from "react";
import FormInput from "../global/FormInput";

function UpdatePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profileEdit = () => {
    navigate("/app/profile-edit");
  };
  const updatePassword = () => {
    navigate("/app/profile-edit/update-password");
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: updateUserPasswordValidation,

    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const {
          data: {
            data: { message },
          },
        } = await Axios.put("/user/update_password",values);
        toast.success(message);
        resetForm();
      } catch (error) {
        toastError(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6  bg-[#F7F7F7] overflow-x-hidden">
      <div className="w-full pb-4">
        <h1 className="text-xl font-medium text-black tracking-tight">
          Profile
        </h1>
      </div>

      <div className=" mt-4  ">
        <div className="flex text-xs items-center gap-x-6 gap-y-4 mb-4 bg-gray-200 py-0.5  px-4 rounded-xl">
          <button
            onClick={profileEdit}
            className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer  ${location.pathname === "/app/profile-edit" ? "font-semibold border-b-2 border-black text-black" : ""} `}
          >
            Edit Profile
          </button>
          <button
            onClick={updatePassword}
            className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer ${location.pathname === "/app/profile-edit/update-password" ? "font-semibold border-b-2 border-black text-black" : ""} `}
          >
            Update Password
          </button>
        </div>
      </div>

      <>
        <div className=" flex justify-between  text-gray-900 mb-6 tracking-tight">
          <h2 className="text-sm font-medium">Update Password</h2>
        </div>

        <form
          onSubmit={formik.handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 grid grid-cols-1 sm:grid-cols-2  gap-x-6 gap-y-7 "
        >
          <FormInput
            label="Current Password"
            id="currentPassword"
            type="password"
            placeholder="Enter current password"
            formik={formik}
          />
          <FormInput
            label="New Password"
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            formik={formik}
          />

          <FormInput
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="Enter confrim password"
            formik={formik}
          />

          <div className="flex items-center gap-4 pt-4 justify-start lg:justify-end">
            <button
              type="button"
              onClick={formik.resetForm}
              className="flex-1 sm:flex-none px-2 sm:px-10 py-3.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-900 font-medium text-sm rounded-xl transition cursor-pointer active:scale-[0.99]"
            >
              Clear
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none px-2 sm:px-10 py-3.5 bg-[#1A1C1E] hover:bg-black text-white font-medium text-sm rounded-xl transition cursor-pointer active:scale-[0.99] shadow-sm shadow-gray-100"
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
      </>
    </div>
  );
}

export default UpdatePassword;
