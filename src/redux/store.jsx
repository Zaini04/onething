import { configureStore } from "@reduxjs/toolkit";
import entryVehicles from "./slices/entryVehiclesSlice"
import vehicleLedger from "./slices/vehicleLedgerSlice"

export const store  =  configureStore({
    reducer:{
        entryVehicles : entryVehicles,
        vehicleLedger: vehicleLedger
    }
})