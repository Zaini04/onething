import * as Yup from 'yup';

export const clientValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Client Name is required'),
  
  fatherOrHusbandName: Yup.string()
    .trim()
    .required("Father's / Husband Name is required"),
  
  cnic: Yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must follow the pattern: 36302-1234567-1')
    .required('CNIC/NICOP Number is required'),
  
  phoneNumber: Yup.string()
    .matches(/^\+\d{2}-\d{3}-\d{7}$/, 'Phone number must follow the pattern: +92-301-1234567')
    .required('Phone Number is required'),
  
  whatsAppNumber: Yup.string()
    .matches(/^\+\d{2}-\d{3}-\d{7}$/, 'WhatsApp number must follow the pattern: +92-301-1234567')
    .required('WhatsApp Number is required'),
  
  email: Yup.string()
    .email('Invalid email address')
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
    .oneOf(['Active', 'InActive'], 'Invalid Status')
    .required('Status is required'),
});