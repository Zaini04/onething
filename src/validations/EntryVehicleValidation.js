import * as Yup from "yup";


// --- YUP VALIDATION SCHEMA ---
// Strict validation mapping based on the form context
export const entryVehicleValidation = Yup.object({
  date: Yup.string().required("Date is required"),
  client: Yup.string().required("Please select a client"),
  site: Yup.string().required("Please select a site"),
  vehicle: Yup.string().required("Please select a vehicle"),
  material: Yup.string().required("Please select a material"),
  rateType: Yup.string().required("Please select a rate type"),
  vendor: Yup.string().optional(),
  fuel: Yup.string().optional(),
  driverExpense: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Driver expense is required"),
  loading: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Loading charges are required"),
  miscellaneousExpenses: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Misc expenses are required"),
  totalPrice: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Total price is required"),
});
