import * as Yup from "yup";

export const settingsValidation = Yup.object().shape({
  companyLogo: Yup.mixed()
    .required("Company logo is required")
    .test("fileSize", "Max allowed size is 800K", (value) => {
      if (!value) return true;
      if (typeof value === "string") return true; // Base64 fallback
      return value.size <= 800 * 1024;
    }),
  companyName: Yup.string()
    .trim()
    .min(3, "Company name must be at least 3 characters")
    .required("Company name is required"),
  phoneNumber: Yup.string()
    .trim()
    .required("Phone number is required"),
  accountNumber: Yup.string()
    .trim()
    .required("Account number is required"),
  accountHolderName: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Account holder name is required"),
});