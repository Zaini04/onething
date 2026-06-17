import * as Yup from "yup";


export const entryVehicleValidation = Yup.object({
  date: Yup.string().required("Date is required"),
  client: Yup.string().required("Please select a client"),
  site: Yup.string().required("Please select a site"),
  vehicle: Yup.string().required("Please select a vehicle"),
  materialType: Yup.string().required("Please select a material"),
  rateType: Yup.string().required("Please select a rate type"),
  rate: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Rate is required"),
  vendor: Yup.string().optional(),
  fuel: Yup.string().optional(),
  totalSftVehicles: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Total Sft/Vehicles is required"),
  
  materialCost: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Material cost is required"),
  dieselCost: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Material cost is required"),
  dieselInLitters: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Material cost is required"),
  driverExpense: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative"),
  loading: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Loading charges are required"),
  otherExpenses: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
  
});
