import * as Yup from "yup";

export const AddUserValidation = Yup.object().shape({
  username: Yup.string()
    .required("username is required"),
 email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .nullable()
    .transform((value) => (value === '---' || value?.trim() === '' ? null : value)),
   password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /[0-9]/,
      "Password must contain at least one number"
    )
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  role: Yup.string()
    .required("Role is required"),
});