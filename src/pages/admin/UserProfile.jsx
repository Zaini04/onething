import React from 'react'
import EditProfile from '../../components/auth/EditProfile'
import UpdatePassword from '../../components/auth/UpdatePassword'

function UserProfile() {
  return (
    <div className="w-full md:w-[93%] lg:w-[94%] xl:w-[95%]  px-4   md:px-8 py-6 min-h-screen bg-[#F7F7F7] overflow-x-hidden">
        <EditProfile/>
        <UpdatePassword/>
    </div>
  )
}

export default UserProfile