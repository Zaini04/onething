import * as Yup from 'yup';

export const labourValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Labour Name is required'),

  fatherOrHusbandName: Yup.string()
    .trim()
    .required("Father's / Husband Name is required"),

  cnicOrNicop: Yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must follow the pattern: 36302-1234567-1')
    .required('CNIC/NICOP Number is required'),

  phoneNumber: Yup.string()
    .required('Phone Number is required'),

  whatsAppNumber: Yup.string()
    .notRequired(),

  email: Yup.string()
    .email('Invalid email address')
    .notRequired()
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


export const labourExpenseValidation = Yup.object().shape({
  date: Yup.date()
    .required('Date is required'),

  labour: Yup.string()
    .required('Please select a labour'),

  amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be greater than 0')
    .required('Amount is required'),

  notes: Yup.string()
    .trim()
    .max(500, 'Notes cannot exceed 500 characters')
    .notRequired(),
});