import * as Yup from 'yup';

export const clientValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Client Name is required'),
  
  fatherOrHusbandName: Yup.string()
    .trim()
    .required("Father's / Husband Name is required"),
  
  cnicOrNicop: Yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must follow the pattern: 36302-1234567-1')
    .required('CNIC/NICOP Number is required'),
  
  phoneNumber: Yup.string()
    .required('Phone Number is required'),
  
  whatsAppNumber: Yup.string()
    .required('WhatsApp Number is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .nullable()
    .transform((value) => (value === '---' || value?.trim() === '' ? null : value)),
  
  address: Yup.string()
    .trim()
    .required('Address/Flat Number is required'),
  
  city: Yup.string()
    .required('City is required'),
  
  state: Yup.string()
    .required('State is required'),
  
  status: Yup.string()
    .oneOf(['Active', 'Inactive'], 'Invalid Status')
    .required('Status is required'),
});