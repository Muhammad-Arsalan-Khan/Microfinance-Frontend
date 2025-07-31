import * as yup from "yup";

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[^a-zA-Z0-9]/, "Must contain a special character")
    .required("Password is required"),
  phone: yup.string().required("Phone number is required"),
  cnic: yup
    .string()
    .matches(/^[0-9]{13}$/, "CNIC must be 13 digits")
    .required("CNIC is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
});

export default signupSchema
