import  { createSlice }   from "@reduxjs/toolkit";
import { getUser } from "../../hooks/authLocalStorage";

const errorInitialState = {
    login: ''
}

const authSlice =  createSlice({
    name: 'auth',
    initialState:{
        user : getUser() || null,
        loading : false,
        errors: errorInitialState

    },
    reducers:{
        setAuthUser(state,action){
            state.user = action.payload
        },
        updateAuthUser(state,action){
            state.user= {...state.user,...action.payload}
        },
        setAuthLoading(state,action){
            state.loading = action.payload
        },
        setAuthErrors(state,action){
            state.errors = {...action.payload}
        },
        clearAuthErrors(state,action){
            state.errors = action.payload
        }
    }

})

export const {setAuthErrors,setAuthLoading,setAuthUser,clearAuthErrors,updateAuthUser} = authSlice.actions
export default authSlice.reducer