import { createSlice } from "@reduxjs/toolkit";

const mockEntryVehicles = Array.from({ length: 50 }, (_, i) => {
  const names = ["Imran Khan", "Saad"];
  const sites = ["Multan", "Overseas", "Lahore"];
  const vehicles = ["Standard Dump Truck", "Mini Dump Trucks", "Low-Side Dump Trucks"];
  const vehicleNo = ["TLL-4679", "MJU-5210", "ABC-1234"];
  const materials = ["Concrete", "Sand"];
  const rateTypes = ["per sft", "per vehicle"];
  const rate = ["50", "70", "80"];
  const totalSft = ["100", "150", "200"];
  const totalVehicles = ["5", "10", "15"];
  const totalRate = Number(rateTypes[i % 2] === "per sft" ? totalSft[i % 3] * rate[i % 3] : totalVehicles[i % 3] * rate[i % 3]);
  const driverExpense = 300;
  const loading = 200;
  const materialCost = 500;
  const otherExpenses = 200;
  const diesal = 350;
  const paymentReceived = ['received', 'pending'];
  const billStatus = ['generated', 'pending'];

  return {
    id: i + 1,
    no: String(i + 1).padStart(2, "0"),
    date: "24-10-2025",
    clientName: names[i % 2],
    site: sites[i % 3],
    vehicle: vehicles[i % 3],
    vehicleNo:vehicleNo[i % 3],
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
    remaingAmount: totalRate - driverExpense - diesal - loading - materialCost - otherExpenses,
    paymentReceived: paymentReceived[i % 2],
    billStatus: billStatus[i % 2],
  };
  });

  const entryVehiclesSlice = createSlice ({
    name : 'entryVehicles',
    initialState : {
        items: mockEntryVehicles,
        selectedItem : null
    },
    reducers :{
        setEntryVehicleById:(state,action)=>{
            state.selectedItem = state.items.find(item=> String(item._id || item.id)=== String(action.payload ))|| null;
        },
        clearSelectedEntryVehicle: (state)=>{
            state.selectedItem = null
        }
    }
  })

  export const {setEntryVehicleById,clearSelectedEntryVehicle} = entryVehiclesSlice.actions

  export default entryVehiclesSlice.reducer