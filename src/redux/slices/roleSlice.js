import  { createSlice }   from "@reduxjs/toolkit";

const initialErrors = {
    role:''
}

const roleSlice =  createSlice({
    name: 'role',
    initialState:{
        role : [],
        loading : false,
        errors: initialErrors

    },
    reducers:{
        setRole(state,action){
            state.role = action.payload
        },
        setLoading(state,action){
            state.loading = action.payload
        },
        setErrors(state,action){
            state.errors = {...action.payload}
        },
        clearErrors(state,action){
            state.errors = action.payload
        }
    }

})

export const {setErrors,setLoading,setRole,clearErrors} = roleSlice.actions
export default roleSlice.reducer