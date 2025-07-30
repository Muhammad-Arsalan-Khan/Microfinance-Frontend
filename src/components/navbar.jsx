import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import microfinanceLogo from "../assets/logo.png";
import Cookies from "js-cookie";
const userData = JSON.parse(localStorage.getItem("user"));

const Navbar = () => {
  let authCheck = Cookies.get("token") ? true : false;
  let admin = Cookies.get("isVerified") ? true : false

  const logout = () => {
    authCheck = false;
    Cookies.remove("token");
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
          padding: "20px",
        }}
      >
        <Typography variant="h5" fontWeight={700} marginLeft={3.2}>
          <img
            src={microfinanceLogo}
            alt="Microfinance Logo"
            style={{ height: 40, marginRight: 16 }}
          />
        </Typography>

        {/* Right Side - Conditional Buttons */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {authCheck ? (
            // If authCheck is true, show Home, MyBlog, and Create Blog
            <>
              <Button
                color="inherit"
                // onClick={() => setRefresh(!refresh)}
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
                // onClick={() => setRefresh(!refresh)}
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
                  // setRefresh(!refresh);
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
            // If authCheck is false, show Login button
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
export default Navbar;
