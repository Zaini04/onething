import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useFormik } from 'formik'
import FormInput from '../global/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../../redux/actions/authAction'

function EditProfile() {

  const navigate= useNavigate()
  const location = useLocation();
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state=> state.auth.loading)

      const [userImage, setUserImage] = useState(user?.image || null);

  


   const profileEdit = ()=>{
    navigate('/app/profile-edit')
  }
  const updatePassword = ()=>{
    navigate('/app/profile-edit/update-password')
}

const dispatch = useDispatch()

const formik = useFormik({
    initialValues: {
      username: "",
    },

    validationSchema: '',

    onSubmit: async (values, { resetForm }) => {

      const payload ={
        ...values,
        image:userImage
      }
      
        // const {
        //   data: {
        //     data: { message },
        //   },
        // } = await Axios.put("/user/edit_profile",payload);
        // toast.success(message);
        // resetForm();
            dispatch(updateUserProfile(payload, resetForm))
        
    }
    
  });

   const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 800 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setUserImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      toast.error("File size should be less than 800KB");
    }
  };

  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  px-4   md:px-8 py-6  bg-[#F7F7F7] overflow-x-hidden">
        <div className="w-full pb-4">
        <h1 className="text-xl font-medium text-black tracking-tight">
          Profile
        </h1>
      </div>

      <div className=" mt-4  ">
              <div className="flex text-xs items-center gap-x-6 gap-y-4 mb-4 bg-gray-200 py-0.5  px-4 rounded-xl">
                <button onClick={profileEdit}
                  className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer  ${location.pathname === '/app/profile-edit'  ? "font-semibold border-b-2 border-black text-black" : ""} `}
                >
                  Edit Profile
                </button>
                <button onClick={updatePassword}
                  className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer ${location.pathname === '/app/profile/update-password'? "font-semibold border-b-2 border-black text-black" : ""} `}
                >
                  Update Password
                </button>
              
              </div>
              
            </div>


             <form
          onSubmit={formik.handleSubmit}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-purple-50 overflow-hidden flex items-center justify-center border border-gray-100">
            {userImage ? (
              <img
                src={userImage}
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
                onClick={() => setUserImage(null)}
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
          

          <FormInput
            label="User Name"
            id="username"
            type="text"
            placeholder="Enter new username"
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
              {loading ? (
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
  )
}

export default EditProfile