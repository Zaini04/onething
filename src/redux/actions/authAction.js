// import axios from "axios"
import { toast } from "react-toastify"
import { removeUser, storeUser } from "../../hooks/authLocalStorage"
import { clearAuthErrors, setAuthErrors, setAuthLoading, setAuthUser, updateAuthUser } from "../slices/authSlice"
import returnErrorMsg from "../../hooks/returnErrorMsg"
import { toastError } from "../../hooks/toastError"
import Axios from "../../configs/api"

export const loginUser =  (data,navigate,resetForm) =>async (dispatch)=>{
    dispatch(setAuthLoading(true))
    try {
    const {data:{data:{doc,message}}} = await Axios.post('/user/admin-login',data)
    toast.success(message)
    console.log("login response",doc)
    storeUser(doc)
    dispatch(setAuthUser(doc))
    navigate('/app/dashboard')
    resetForm()
    dispatch(clearAuthErrors())
    dispatch(setAuthLoading(false))
    }
     catch (error) {
        dispatch(setAuthLoading(false))
        dispatch(setAuthErrors({loginUser : returnErrorMsg(error)}))
        toastError(error)
    }
    
}

export const logoutUser = (navigate) => async(dispatch)=>{
    dispatch(setAuthLoading(true))
    try {
    await Axios.post('/user/logout' )
    removeUser()
    dispatch(setAuthLoading(false))
    dispatch(setAuthUser(null))
    dispatch(clearAuthErrors())
    navigate('/auth/login')
    toast.success("Logged out successfully")
    } catch (error) {
        toastError(error)
       dispatch(setAuthLoading(false))
    }
}

export const updateUserProfile = (data,resetForm)=>async(dispatch)=>{
    dispatch(setAuthLoading(true))
    try {
     const {data:{data:{doc,message}}} = await Axios.put(`/user/edit_profile`,data)
    toast.success(message)
    dispatch(updateAuthUser(doc))
    dispatch(setAuthLoading(false))
    dispatch(setAuthErrors())
    resetForm()
    return doc
    } catch (error) {
        toastError(error)
        throw error
    }finally{
               dispatch(setAuthLoading(false))

    }
}