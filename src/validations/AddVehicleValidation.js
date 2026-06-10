import * as Yup from "yup";

export const AddVehicleValidation = Yup.object().shape({
  vehicleNo: Yup.string()
    .required("Vehicle number is required")
    .matches(/^[A-Z0-9-]+$/i, "Invalid vehicle number format"),
  ownerName: Yup.string()
    .min(3, "Owner name must be at least 3 characters")
    .required("Owner name is required"),
  typeVehicle: Yup.string()
    .required("Vehicle type is required"),
  status: Yup.string()
    .oneOf(["Active", "Inactive", "Block"], "Invalid Status")
    .required("Status selection is required"),
});