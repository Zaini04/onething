import * as Yup from "yup";

export const addFuelCompany = Yup.object().shape({
  fuelCompany: Yup.string()
    .trim()
    .required("Fuel company name is required"),
  fuelLitter: Yup.number()
    .typeError("Please enter a valid number")
    .positive("Please enter a valid positive number")
    .required("Fuel capacity/litter is required"),
});