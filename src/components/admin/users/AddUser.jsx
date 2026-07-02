import { useFormik } from "formik";
import FormInput from "../../global/FormInput";
import { AddUserValidation } from "../../../validations/AddUserValidation";
import { useDispatch } from "react-redux";
import { addUser, updateUser, useRoles } from "../../../redux/actions/superAdminActions";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddUser({setEditedUser,editUser}) {

    const queryClient = useQueryClient()
    const dispatch = useDispatch()
      const [isSubmitting, setIsSubmitting] = useState(false);
    
 const isEdit = !!editUser;

const formik = useFormik({
  enableReinitialize: true,

  initialValues: {
    username: editUser?.username || "",
    email: editUser?.email || "",
    password: "",
    role: editUser?.role?._id || "",
  },

  validationSchema: AddUserValidation,

  onSubmit: async (values, { resetForm }) => {
        setIsSubmitting(true)

    try {
         if (isEdit) {
      await dispatch(updateUser(editUser._id, values,resetForm));
    } else {
      await dispatch(addUser(values,resetForm));
    }

    queryClient.invalidateQueries({ queryKey: ["users"] });

    resetForm();
    navigate("/app/users"); // close panel
    } catch (error) {
        toast.error(error)
            setIsSubmitting(false)

    }finally{
        setIsSubmitting(false)
    }
   
  },
});

 
// const roles = useSelector(state => state.role.role || [])

const {data} = useRoles()
const roleValues = data?.roles.map(role =>({label:role.name, value : role._id}))

console.log("data",data)
// console.log("roleValues",roleValues)
const navigate= useNavigate()
const handleClear = () => {
  formik.resetForm();

  if (isEdit) {
    setEditedUser(null);
    navigate("/app/users");
  }
};
  return (
    <div className="w-full lg:max-w-[540px] bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className=" flex justify-between  text-gray-900 mb-6 tracking-tight">
        <h2 className="text-lg font-medium">Add Admin</h2>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-7 pt-2"
      >
        <FormInput
          label="Username"
          id="username"
          type="text"
          placeholder="Enter username"
          formik={formik}
        />

        <FormInput
          label="Email"
          id="email"
          type="text"
          placeholder="Enter email"
          formik={formik}
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Enter password"
          formik={formik}
        />
        <FormInput
          label="Role"
          id="role"
          type="select"
          defaultOption='choose a role'
options={roleValues}
  value={formik.values.role}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  formik={formik}        />

       

        <div className="flex items-center gap-4 mt-8 justify-start lg:justify-end">
            <button
              type="button"
              onClick={handleClear} // Formik default reset logic handles this smoothly
            className="px-5 sm:px-8 py-2.5 bg-white disabled:bg-gray-400 text-black font-medium text-sm rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
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
}
