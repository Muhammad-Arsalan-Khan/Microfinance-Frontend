import  { useState } from "react";
import { Box, TextField, Button, Typography,Paper,Snackbar,Alert,Link} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import loginSchema from "../validation/loginSchema"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import OtpModal from "../model/otp"

const LoginPage = () => {
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cnic: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/login", data, {
        withCredentials: true,
      })
      const userData = res.data.user
      localStorage.setItem("user", JSON.stringify(userData))
      if (userData.isVerified) {
        setSnackbar({
          open: true,
          message: "Login successful",
          severity: "success",
        });
        if (userData.isAdmin) {
          setTimeout(() => {
            navigate(`/admin/dashboard/${userData.id}`)
          }, 1500);
        } else {
          setTimeout(() => {
            navigate(`/dashboard/${userData.id}`)
          }, 1500)
        }
        setLoading(false);
      }
    } catch (err) {
      setLoading(false)
      if(err.response?.data?.message == "unAuthorized user"){
        setUserId(err.response?.data?.data)
        setSnackbar({
          open: true,
          message: "Please verify your account via OTP try to login again",
          severity: "warning",
        });
        setShowOtpModal(true);
      }
      setSnackbar({
        open: true,
        message:
          err.response?.data?.message || "Login failed. Check credentials.",
        severity: "error",
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 450, mx: "auto", mt: 5 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Login
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {[
          { name: "name", label: "Name" },
          { name: "email", label: "Email" },
          { name: "cnic", label: "CNIC" },
          { name: "password", label: "Password", type: "password" },
        ].map((field) => (
          <Box key={field.name} mb={2}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) => (
                <TextField
                  fullWidth
                  label={field.label}
                  type={field.type || "text"}
                  {...controllerField}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                />
              )}
            />
          </Box>
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          Login
        </Button>
        <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary" align="center">
              Don't have an account?{" "}
              <Link href="/signup" underline="hover" color="primary">
                Signup
              </Link>
            </Typography>
          </Box>
      </Box>

      {showOtpModal && (
        <OtpModal onClose={() => setShowOtpModal(false)} userId={userId} page={"login"} />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default LoginPage
