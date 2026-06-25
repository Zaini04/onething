import * as Yup from "yup";


export const addCompanyRecords = Yup.object({
  date: Yup.string().required("Date is required"),
  client: Yup.string().required("Please select a client"),
  site: Yup.string().required("Please select a site"),
  vehicle: Yup.string().required("Please select a vehicle"),
  materialType: Yup.string().required("Please select a material"),
  rate: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Rate is required"),
  
  totalSft: Yup.number()
    .typeError("Must be a valid number")
    .min(0, "Cannot be negative")
    .required("Total Sft is required"),
  
});
