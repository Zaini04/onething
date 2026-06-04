import * as Yup from "yup";

export const PaymentReceivedValidation = Yup.object({
  paymentMethod: Yup.string()
    .required("Please select a payment method"),
  
  amount: Yup.number()
    .typeError("Amount must be a number")
    .when("paymentMethod", {
      is: "Cash",
      then: (schema) => schema.positive("Amount must be greater than 0").required("Amount is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  checkNo: Yup.string().when("paymentMethod", {
    is: "Check",
    then: (schema) => schema.trim().required("Check number is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  fuelCompany: Yup.string().when("paymentMethod", {
    is: "Fuel",
    then: (schema) => schema.trim().required("Fuel company name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  fuelLiters: Yup.number()
    .typeError("Liters must be a number")
    .when("paymentMethod", {
      is: "Fuel",
      then: (schema) => schema.positive("Liters must be greater than 0").required("Fuel liters amount is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  note: Yup.string().trim().notRequired(),
});