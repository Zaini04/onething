import { clearErrors, setLoading, setRole } from "../slices/roleSlice"
import { toast } from "react-toastify"
import { toastError } from "../../hooks/toastError"
import Axios from "../../configs/api"
import { AddUser, setUserErrors, setUserLoading } from "../slices/UserSlice"
import { useQuery } from "@tanstack/react-query"



export const roleAdd = (data, resetForm) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        
        const response = await Axios.post('/user/create-role',data)

        const message = response.data?.data?.message || "Role created successfully"
        const doc = response.data?.data?.doc

        toast.success(message)
        dispatch(setRole(doc))
        dispatch(clearErrors())
        resetForm()  

    } catch (error) {
        // const message =
        //     error.response?.data?.message ||   
        //     error.message ||
        //     "Something went wrong"
        // toast.error(message)
        // console.log(error)
        toastError(error)
    } finally {
        dispatch(setLoading(false))
    }
}


export const addUser = (data,resetForm)=>async(dispatch)=>{
    dispatch(setUserLoading(true))
    try {
     const {data:{data:{doc,message}}} = await Axios.post('/user/register-admin-user',data)
    toast.success(message)
    dispatch(AddUser(doc))
    dispatch(setUserLoading(false))
    dispatch(setUserErrors())
    resetForm()
    return doc
    } catch (error) {
        toastError(error)
        throw error
    }
}
export const updateUser = (id,data,resetForm)=>async(dispatch)=>{
    dispatch(setUserLoading(true))
    try {
     const {data:{data:{doc,message}}} = await Axios.put(`/user/${id}`,data)
    toast.success(message)
    dispatch(AddUser(doc))
    dispatch(setUserLoading(false))
    dispatch(setUserErrors())
    resetForm()
    return doc
    } catch (error) {
        toastError(error)
        throw error
    }
}


export const deleteUser = (id)=>async(dispatch)=>{
    dispatch(setUserLoading(true))
    try {
     const {data:{data:{doc}}} = await Axios.delete(`/user/${id}`)
    // toast.success(message)
    dispatch(setUserLoading(false))
    dispatch(setUserErrors())
    return doc
    } catch (error) {
        toastError(error)
        throw error
    }
}

export const fetchUsers = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/user/all-admins", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};

export const useUsers = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ["users", page, perPage],
    queryFn: fetchUsers,
    staleTime: 1000 * 30, 
  cacheTime: 1000 * 60 * 10, 
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  keepPreviousData: true,
  });
};

export const fetchRoles = async ()=>{
       const res = await Axios.get("/user/get-user-roles");
        return res.data.data.doc
}

export const useRoles =  ()=>{
    return useQuery({
        queryKey: ["roles"],
        queryFn:fetchRoles,
        keepPreviousData: true,
        refetchOnWindowFocus: true,
        refetchInterval: 30000,
    })
}



export const fetchDashboard = async () => {

  const res = await Axios.get(
    "/entry-vehicle/dashboard",
  );

  return res.data.data;
};

export const fetchTodayDashboard = async () => {

  const res = await Axios.get(
    "/entry-vehicle/today_dashboard",
  );

  return res.data.data;
};



export const fetchSalesChart = async () => {

  const res = await Axios.get(
    "/entry-vehicle/sales_profit_chart",
  );

  return res?.data?.data;
};



export const fetchOfficeExpenses = async ({ queryKey }) => {

  const [, page, limit,apiFilters] = queryKey;
  const pageSize = limit
  const res = await Axios.get("/office-expense/all_expenses", {
    params: { page, pageSize,...apiFilters },
  });


  return res.data.data;
};
