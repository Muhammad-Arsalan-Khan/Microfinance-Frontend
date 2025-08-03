import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useForm } from "react-hook-form"
import axios from "axios"
import Swal from "sweetalert2"
import config from "../config.js"
import Cookies from "js-cookie"

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: {xs: "90%", sm:500},
};

const LoanModal = ({ onClose, fetchData }) => {
  const [step, setStep] = useState(1);
  const [catData, setCatData] = useState([]);
  const [image, setImage] = useState(null);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [loading, setLoading] = useState(false);
  const [guarantor2Error, setGuarantor2Error] = useState(false);
  const id = useParams().id || JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    fetchCategories()
  }, []);

  const fetchCategories = async () => {
    try {
      // const response = await axios.get(
      //   `${config.baseURL}/api/loancategories`,
      //   { withCredentials: true }
      // )
      const response = await axios.get(
        `${config.baseURL}/api/loancategories`,
        { 
          headers: {
            Authorization:  `Bearer ${Cookies.get("token")} `
          }
         }
      )
      setCatData(response.data.data)
    } catch (error) {
      console.error("error fetching categories", error)
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm({ mode: "onChange" })

  useEffect(() => {
    setValue("subCategory", "")
    clearErrors("subCategory")
  }, [watch("category")])

  const handleClose = () => {
    reset()
    setStep(1)
    setImage(null)
    setGuarantor2Error(false)
    onClose()
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData()

      const guarantors = [
        {
          name: data.guarantor1Name,
          cnic: data.guarantor1Cnic,
          email: data.guarantor1Email,
          location: data.guarantor1Location,
        },
        {
          name: data.guarantor2Name,
          cnic: data.guarantor2Cnic,
          email: data.guarantor2Email,
          location: data.guarantor2Location,
        },
      ];

      const {
        guarantor1Name,
        guarantor1Cnic,
        guarantor1Email,
        guarantor1Location,
        guarantor2Name,
        guarantor2Cnic,
        guarantor2Email,
        guarantor2Location,
        ...rest
      } = data

      for (const key in rest) {
        formData.append(key, rest[key])
      }

      if (image) {
        formData.append("image", image)
      }

      formData.append("guarantors", JSON.stringify(guarantors))

      // const response = await axios.post(
      //   `${config.baseURL}/api/loanrequest/${id}`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       "Authorization": `Bearer ${Cookies.get("token")}`
      //     },
      //     withCredentials: true,
      //   }
      // )
      const response = await axios.post(
        `${config.baseURL}/api/loanrequest/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
             Authorization : `Bearer ${Cookies.get("token")}`
          },
        }
      )
      onClose()
      Swal.fire({
        title: "Application submitted!",
        icon: "success",
        draggable: true,
      });
      fetchData()
    } catch (error) {
      toast.error("Error submitting application", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err)
    }
  };

  const handleNext = async (currentStep) => {
    if (currentStep === 1) {
      const requiredFields = ["userName", "userCnic", "userEmail", "category"]
      const allFilled = requiredFields.every((field) => !!watch(field));
      if (!allFilled) return;
      setStep(2);
    } else if (currentStep === 2) {
      const requiredFields = [
        "subCategory",
        "requestedAmount",
        "initialPayment",
        "durationMonths",
      ];
      const allFilled = requiredFields.every((field) => !!watch(field));
      if (!allFilled) return

      const requestedAmount = Number(watch("requestedAmount"))
      const initialPayment = Number(watch("initialPayment"))
      const durationMonths = Number(watch("durationMonths"))

      const maxAmount = catData.find(
        (cat) => cat.category === watch("category")
      )?.maxAmount;
      if (Number(requestedAmount) > Number(maxAmount)) {
        return setError2(`Maximum loan limit is PKR ${maxAmount}`)
      }

      if (Number(initialPayment) < 0.3 * requestedAmount) {
        return setError3(
          `The minimum required initial payment is PKR ${0.3 * requestedAmount}`
        );
      }

      if (Number(initialPayment) > requestedAmount) {
        return setError3(
          `You initial payment is bigger than you requested amount`
        );
      }

      const loanPeriod = catData.find(
        (cat) => cat.category === watch("category")
      )?.loanPeriod;
      if (Number(durationMonths) > Number(loanPeriod)) {
        return setError4(
          `The maximum repayment period available is ${loanPeriod} months`
        );
      }

      const monthlyInstallment = Math.ceil(
        (requestedAmount - initialPayment) / durationMonths
      );

      toast.success(`Your Monthly installment is ${monthlyInstallment}`, {
        position: "top-right",
        autoClose: 5000,
      });
      setStep(3);
    } else if (currentStep === 3) {
      const requiredFields = [
        "guarantor1Name",
        "guarantor1Cnic",
        "guarantor1Email",
        "guarantor1Location",
      ];
      const allFilled = requiredFields.every((field) => !!watch(field));
      if (!allFilled) return;
      setStep(4);
    } else if (currentStep === 4) {
      const requiredFields = [
        "guarantor2Name",
        "guarantor2Cnic",
        "guarantor2Email",
        "guarantor2Location",
      ];
      const allFilled = requiredFields.every((field) => !!watch(field));
      if (!allFilled) return;

      const guarantor1Cnic = watch("guarantor1Cnic")
      const guarantor2Cnic = watch("guarantor2Cnic")

      if (guarantor1Cnic === guarantor2Cnic) {
        setGuarantor2Error(true)
        return;
      } else {
        setGuarantor2Error(false)
      }

      setStep(5);
    } else if (currentStep === 5) {
      if (!image) return;
      setStep(6)
    }
  };

  const getFieldError = (field) => !!errors[field]

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Loan Application</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {step === 1 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Name"
                fullWidth
                {...register("userName", { required: "Name is required" })}
                error={getFieldError("userName")}
                helperText={errors.name?.message}
              />
              <TextField
                label="CNIC"
                fullWidth
                {...register("userCnic", {
                  required: "CNIC is required",
                  minLength: {
                    value: 13,
                    message: "CNIC must be 13 digits",
                  },
                })}
                error={!!errors.userCnic}
                helperText={errors.userCnic?.message || ""}
              />
              <TextField
                label="Email"
                fullWidth
                {...register("userEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                error={getFieldError("userEmail")}
                helperText={errors.email?.message}
              />
              <FormControl fullWidth error={getFieldError("category")}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={watch("category") || ""}
                  onChange={(e) => setValue("category", e.target.value)}
                >
                  {catData.map((cat) => (
                    <MenuItem key={cat.category} value={cat.category}>
                      {cat.category}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleNext(1)}
                disabled={
                  !watch("userName") ||
                  !watch("userCnic") ||
                  !watch("userEmail") ||
                  !watch("category") ||
                  getFieldError("userName") ||
                  getFieldError("userCnic") ||
                  getFieldError("userEmail") ||
                  getFieldError("category")
                }
              >
                Next
              </Button>
            </Box>
          </form>
        )}

        
        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={2}>
              <FormControl fullWidth error={getFieldError("subcategory")}>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  label="Subcategory"
                  {...register("subCategory", {
                    required: "Subcategory is required",
                  })}
                  value={watch("subCategory") || ""}
                  onChange={(e) => setValue("subCategory", e.target.value)}
                >
                  {catData
                    .find((cat) => cat.category === watch("category"))
                    ?.subcategory.map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        {sub}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors.subcategory?.message}</FormHelperText>
              </FormControl>

              <TextField
                label="Requested Amount"
                fullWidth
                type="number"
                {...register("requestedAmount", {
                  required: "Requested Amount is required",
                  min: {
                    value: 1,
                    message: "Amount cannot be negative",
                  },
                })}
                error={!!errors.requestedAmount || !!error2}
                helperText={errors.requestedAmount?.message || error2}
              />
              <TextField
                label="Initial Payment"
                fullWidth
                type="number"
                {...register("initialPayment", {
                  required: "Initial Payment is required",
                  min: {
                    value: 1,
                    message: "Amount cannot be negative",
                  },
                })}
                error={!!errors.initialPayment || !!error3}
                helperText={errors.initialPayment?.message || error3}
              />
              <TextField
                label="Loan Duration (Months)"
                fullWidth
                type="number"
                {...register("durationMonths", {
                  required: "Duration is required",
                  min: {
                    value: 1,
                    message: "Months cannot be negative",
                  },
                })}
                error={!!errors.durationMonths || !!error4}
                helperText={!!errors.durationMonths?.message || error4}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleNext(2)}
                disabled={
                  !watch("subCategory") ||
                  !watch("requestedAmount") ||
                  !watch("initialPayment") ||
                  !watch("durationMonths") ||
                  getFieldError("subCategory") ||
                  getFieldError("requestedAmount") ||
                  getFieldError("initialPayment") ||
                  getFieldError("durationMonths")
                }
              >
                Next
              </Button>
              <Button variant="contained" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            </Box>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Guarantor 1 Name"
                fullWidth
                {...register("guarantor1Name", {
                  required: "Guarantor 1 Name is required",
                })}
                error={getFieldError("guarantor1Name")}
                helperText={errors.guarantor1Name?.message}
              />
              <TextField
                label="Guarantor 1 CNIC"
                fullWidth
                {...register("guarantor1Cnic", {
                  required: "Guarantor 1 CNIC is required",
                  minLength: {
                    value: 13,
                    message: "CNIC must be 13 digits",
                  },
                })}
                error={!!errors.guarantor1Cnic}
                helperText={errors.guarantor1Cnic?.message}
              />
              <TextField
                label="Guarantor 1 Email"
                fullWidth
                {...register("guarantor1Email", {
                  required: "Guarantor 1 Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                error={getFieldError("guarantor1Email")}
                helperText={errors.guarantor1Email?.message}
              />
              <TextField
                label="Guarantor 1 Location"
                fullWidth
                {...register("guarantor1Location", {
                  required: "Guarantor 1 Location is required",
                })}
                error={getFieldError("guarantor1Location")}
                helperText={errors.guarantor1Location?.message}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleNext(3)}
                disabled={
                  !watch("guarantor1Name") ||
                  !watch("guarantor1Cnic") ||
                  !watch("guarantor1Email") ||
                  !watch("guarantor1Location") ||
                  getFieldError("guarantor1Name") ||
                  getFieldError("guarantor1Cnic") ||
                  getFieldError("guarantor1Email") ||
                  getFieldError("guarantor1Location")
                }
              >
                Next
              </Button>
              <Button variant="contained" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            </Box>
          </form>
        )}

        {step === 4 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Guarantor 2 Name"
                fullWidth
                {...register("guarantor2Name", {
                  required: "Guarantor 2 Name is required",
                })}
                error={getFieldError("guarantor2Name")}
                helperText={errors.guarantor2Name?.message}
              />
              <TextField
                label="Guarantor 2 CNIC"
                fullWidth
                {...register("guarantor2Cnic", {
                  required: "Guarantor 2 CNIC is required",
                  minLength: {
                    value: 13,
                    message: "CNIC must be 13 digits",
                  },
                })}
                error={
                  !!errors.guarantor2Cnic || getFieldError("guarantor2Cnic")
                }
                helperText={errors.guarantor2Cnic?.message}
              />
              <TextField
                label="Guarantor 2 Email"
                fullWidth
                {...register("guarantor2Email", {
                  required: "Guarantor 2 Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                error={getFieldError("guarantor2Email")}
                helperText={errors.guarantor2Email?.message}
              />
              <TextField
                label="Guarantor 2 Location"
                fullWidth
                {...register("guarantor2Location", {
                  required: "Guarantor 2 Location is required",
                })}
                error={getFieldError("guarantor2Location")}
                helperText={errors.guarantor2Location?.message}
              />
              {guarantor2Error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  Guarantor 1 and Guarantor 2 CNIC cannot be the same!
                </Typography>
              )}
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleNext(4)}
                disabled={
                  !watch("guarantor2Name") ||
                  !watch("guarantor2Cnic") ||
                  !watch("guarantor2Email") ||
                  !watch("guarantor2Location") ||
                  getFieldError("guarantor2Name") ||
                  getFieldError("guarantor2Cnic") ||
                  getFieldError("guarantor2Email") ||
                  getFieldError("guarantor2Location") ||
                  guarantor2Error
                }
              >
                Next
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setStep(step - 1);
                  setGuarantor2Error(false);
                }}
              >
                Back
              </Button>
            </Box>
          </form>
        )}

        {step === 5 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6">Upload Document (e.g. CNIC)</Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ marginBottom: 2 }}
                component="label"
              >
                Upload Salary Slip or Bank Statement
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ marginBottom: 16 }}
                />
              </Button>
              {image && (
                <Typography variant="body2" color="textSecondary">
                  File selected: {image.name}
                </Typography>
              )}
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleNext(5)}
                disabled={!image}
              >
                Next
              </Button>
              <Button variant="contained" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            </Box>
          </form>
        )}

        {step === 6 && (
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            p={4}
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 3,
              boxShadow: 3,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="primary"
            >
              Confirm Your Details
            </Typography>

            <Box component="div" sx={{ pl: 1 }}>
              <Typography variant="body1">
                <strong>Name:</strong> {watch("userName")}
              </Typography>
              <Typography variant="body1">
                <strong>CNIC:</strong> {watch("userCnic")}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {watch("userEmail")}
              </Typography>
              <Typography variant="body1">
                <strong>Category:</strong> {watch("category")}
              </Typography>
              <Typography variant="body1">
                <strong>Subcategory:</strong> {watch("subCategory")}
              </Typography>
              <Typography variant="body1">
                <strong>Requested Amount:</strong> {watch("requestedAmount")}
              </Typography>
              <Typography variant="body1">
                <strong>Initial Payment:</strong> {watch("initialPayment")}
              </Typography>
              <Typography variant="body1">
                <strong>Duration:</strong> {watch("durationMonths")} months
              </Typography>
              <Typography variant="body1">
                <strong>Guarantor 1 Name:</strong> {watch("guarantor1Name")}
              </Typography>
              <Typography variant="body1">
                <strong>Guarantor 2 Name:</strong> {watch("guarantor2Name")}
              </Typography>
              <Typography variant="body1">
                <strong>Image:</strong>{" "}
                {image ? image.name : "No image uploaded"}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: "bold",
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "#2e7d32",
                  boxShadow: 4,
                },
              }}
            >
             {loading ? "Submit Application..." : "Submit Application"}
            </Button>

            <Button
              variant="outlined"
              onClick={handleClose}
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: "bold",
                borderColor: "#d32f2f",
                color: "#d32f2f",
                "&:hover": {
                  backgroundColor: "#ffeaea",
                  borderColor: "#b71c1c",
                  color: "#b71c1c",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default LoanModal
