import { configureStore } from "@reduxjs/toolkit";
import entryVehicles from "./slices/entryVehiclesSlice"
import vehicleLedger from "./slices/vehicleLedgerSlice"
import auth from "./slices/authSlice"
import role from "./slices/roleSlice"
import user from "./slices/UserSlice"

export const store  =  configureStore({
    reducer:{
        auth : auth,
        user: user,
        role: role,
        entryVehicles : entryVehicles,
        vehicleLedger: vehicleLedger
    }
})