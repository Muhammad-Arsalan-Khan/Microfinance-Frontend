import React from "react";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box} from "@mui/material";
import { Link } from "react-router-dom";
import LoanModal from "../model/loanForm.jsx";
import LoandeatilCrad from "./loandeatilCrad.jsx"
const userData = JSON.parse(localStorage.getItem("user"))

function LoanCard() {
  const [showLoanModal, setshowLoanModal] = useState(false);
   const [isRefresh, setIsRefresh] = useState(false);
     const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        margin="15px auto"
        flexDirection="column"
        // padding={4}
        // border={"1px solid black"}
        // maxWidth="lg"
      >
        <h1>
          Welcome to Microfinance,{" "}
          <Box component="span" color="#8BC441">
            {userData.username} 👋
          </Box>
        </h1>
        <Box width={"100%"} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => setshowLoanModal(true)}
            disabled={isButtonDisabled} 
          >
            Apply for a Loan
          </Button>

          {showLoanModal && (
            <LoanModal onClose={() => setshowLoanModal(false)} fetchData={() => setIsRefresh(true)}/>
          )}
        </Box>
        <LoandeatilCrad Refresh={isRefresh} onDisableButton={(disable) => setIsButtonDisabled(disable)}/>
      </Box>
    </>
  );
}

export default LoanCard;
