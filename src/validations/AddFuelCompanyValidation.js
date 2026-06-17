import * as Yup from "yup";

export const addFuelCompany = Yup.object().shape({
  fuelCompany: Yup.string()
    .trim()
    .required("Fuel company name is required"),
});