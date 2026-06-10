import  { createSlice }   from "@reduxjs/toolkit";

const errorInitialState = {
    user: ''
}

const userSlice =  createSlice({
    name: 'user',
    initialState:{
        users : [],
        loading : false,
        errors: errorInitialState

    },
    reducers:{
        setUsers(state,action){
            state.users = action.payload
        },
        AddUser(state,action){
            state.users.push(action.payload)
        },
        setUserLoading(state,action){
            state.loading = action.payload
        },
        setUserErrors(state,action){
            state.errors = {...action.payload}
        },
        clearUserErrors(state,action){
            state.errors = action.payload
        }
    }

})

export const {setUserErrors,setUserLoading,setUsers,clearErrors,AddUser} = userSlice.actions
export default userSlice.reducer