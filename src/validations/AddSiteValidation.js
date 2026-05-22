import * as Yup from 'yup';

export const addSiteValidation = Yup.object().shape({
  client: Yup.string()
    .required('Client selection is required'),
  
  siteName: Yup.string()
    .trim()
    .required('Site Name is required'),
  
  address: Yup.string()
    .trim()
    .required('Address is required'),

materials: Yup.array()
  .of(
    Yup.object().shape({
      name: Yup.string().required(),
      rateType: Yup.string().required('Rate Type is required'),
      rate: Yup.string()
        .required('Rate is required')
        .matches(/^[0-9]+$/, 'Please write numbers only') // Yup validation check
        .test('is-positive', 'Rate must be greater than 0', value => Number(value) > 0)
    })
  )
  .min(1, 'Please select at least one material'),
});
