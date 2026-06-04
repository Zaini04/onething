import * as Yup from "yup";

export const entryFuel = Yup.object().shape({
  vehicle: Yup.string()
    .trim()
    .required("Vehicle setup information is required"),
  fuelCompany: Yup.string()
    .trim()
    .required("Fuel company designation is required"),
  fuelLitter: Yup.number()
    .typeError("Please enter a valid number")
    .positive("Please enter a valid positive number")
    .required("Fuel quantity metric is required"),
  totalPrice: Yup.string()
    .required("Total price estimation is required")
    .test("is-positive", "Please enter a valid price structure", (value) => {
      if (!value) return false;
      const cleanNum = Number(value.replace(/,/g, ""));
      return !isNaN(cleanNum) && cleanNum > 0;
    }),
});