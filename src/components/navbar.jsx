import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material"
import { Link } from "react-router-dom"
import logo from "../assets/logo-microfinance.png"
import Cookies from "js-cookie";
const userData = JSON.parse(localStorage.getItem("user"))

const Navbar = () => {
  let authCheck = Cookies.get("token") ? true : false
  let admin = Cookies.get("isVerified") ? true : false

  const logout = () => {
    authCheck = false
    Cookies.remove("token")
    Cookies.remove("isVerified")
    localStorage.removeItem("user")
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <Typography variant="h5" fontWeight={700} marginLeft={3.6} color="#8BC441">
          <img
            src={logo}
            alt="Microfinance Logo"
            style={{ height: 60, marginRight: 16 }}
          />
          {/* MICROFINANCE */}
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {authCheck ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  marginRight: "17px",
                  color: "gray",
                  "&:hover": { color: "#8BC441" },
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to ={admin ? `/admin/dashboard/${userData.id}` :`/dashboard/${userData.id}`}
                sx={{
                  marginRight: "19px",
                  color: "gray",
                  "&:hover": { color: "#8BC441" },
                }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  logout();
                }}
                component={Link}
                to="/"
                sx={{
                  backgroundColor: "#005EB8",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#1976d2" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/signup"
                sx={{
                  backgroundColor: "#005EB8",
                  color: "#fff",
                  marginRight: "18px",
                  "&:hover": { backgroundColor: "#1976d2" },
                }}
              >
                Signup
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: "#005EB8",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#1976d2" },
                }}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar
