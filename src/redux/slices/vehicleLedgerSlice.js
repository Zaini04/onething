import { createSlice } from "@reduxjs/toolkit";

const vehicleLedger = Array.from({ length: 50 }, (_, i) => {
  const names = ["Imran Khan", "Saad"];
  const sites = ["Multan", "Overseas", "Lahore"];

  const materials = ["Concrete", "Sand"];
  const rateTypes = ["per sft", "per vehicle"];
  const rate = ["50", "80", "80"];
  const totalSft = ["100", "150", "200"];
  const totalVehicles = ["5", "10", "15"];
  const totalRate = Number(rateTypes[i % 2] === "per sft" ? totalSft[i % 3] * rate[i % 3] : totalVehicles[i % 3] * rate[i % 3]);
  // const vendors = ["Mudasir", "Muaaz", "Musaz"];
  const driverExpense = 300;
  const loading = 200;
  const materialCost = 500;
  const otherExpenses = 200;
  const  diesal= 350;
  const paymentReceived = ['received', 'pending'];
    const billStatus = ['generated', 'pending'];
  return {
    id: i + 1,
    no: String(i + 1).padStart(2, "0"),
    date: "24-10-2025",
    clientName: names[i % 2],
    site: sites[i % 3],
    material: materials[i % 2],
    rateType: rateTypes[i % 2],
    rate: rate[i % 3],
    totalSft: totalSft[i % 3],
    totalVehicles: totalVehicles[i % 3],
    totalRate: totalRate,
    diesal: diesal,
    driverExpense: driverExpense,
    loading: loading,
    materialCost: materialCost,
    otherExpenses: otherExpenses,
    // vendorName: vendors[i % 3],
    // fuel: "35,000",
    remaingAmount: totalRate-driverExpense - diesal-loading-materialCost-otherExpenses,
    paymentReceived: paymentReceived[i % 2],
    billStatus: billStatus[i % 2] ,
  };
});

const vehicleLedgerSlice = createSlice({
    name:'vehicleLedger',
    initialState:{
        items:vehicleLedger,
        selectedItem: null
    },
    reducers:{
        setvehicleLedgerById: (state,action)=>{
            state.selectedItem = state.items.find(item=>String(item.id || item._id)===String(action.payload))|| null ;
        },
        clearSelectedVehicleLeger: (state)=>{
            state.selectedItem = null
        },
    }
})

export const { setvehicleLedgerById,clearSelectedVehicleLeger}= vehicleLedgerSlice.actions

export default vehicleLedgerSlice.reducer