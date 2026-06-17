import * as Yup from "yup";

export const addFuelStock = Yup.object().shape({
  fuelCompany: Yup.string()
  .ensure()
    .trim()
    .required("Fuel company name is required"),
  fuelLiters: Yup.number()
    .typeError("Please enter a valid number")
    .positive("Please enter a valid positive number")
    .required("Fuel capacity/litter is required"),
});