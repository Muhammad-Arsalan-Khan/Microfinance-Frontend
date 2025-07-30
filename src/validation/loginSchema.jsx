import * as yup from 'yup'

const loginSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email("Invalid email").required("Email is required"),
  cnic: yup.string().matches(/^[0-9]{13}$/, 'CNIC must be 13 digits').required('CNIC is required'),
  password: yup.string().required('Password is required'),
})

export default loginSchema
