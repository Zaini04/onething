import React from 'react'
import EditProfile from '../../components/auth/EditProfile'
import UpdatePassword from '../../components/auth/UpdatePassword'
import { useNavigate } from 'react-router-dom'

function UserProfile() {

  const navigate= useNavigate()

   const editProfile = ()=>{
    navigate('/app/profile-edit')
  }
  const updatePassword = ()=>{
    navigate('/app/profile-edit/update')
}
  return (
    <div className="w-full md:w-[80%] lg:w-[85%] xl:w-[87%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
        <div className="w-full pb-4">
        <h1 className="text-xl font-medium text-black tracking-tight">
          Profile
        </h1>
      </div>

      <div className=" mt-4  ">
              <div className="flex text-xs items-center gap-x-6 gap-y-4 mb-4 bg-gray-200 py-0.5  px-4 rounded-xl">
                <button onClick={editProfile}
                  className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer  ${location.pathname === '/app/profile-edit' ? "font-semibold border-b-2 border-black text-black" : ""} `}
                >
                  Edit Profile
                </button>
                <button onClick={updatePassword}
                  className={`text-gray-700 hover:border-b-2 h-10 hover:border-black  hover:text-gray-900 cursor-pointer ${location.pathname === '/app/profile/update'? "font-semibold border-b-2 border-black text-black" : ""} `}
                >
                  Update Password
                </button>
              
              </div>
              
            </div>
       
       
    </div>
  )
}

export default UserProfile