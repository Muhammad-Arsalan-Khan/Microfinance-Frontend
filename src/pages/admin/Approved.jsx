import axios from "axios"
import { useEffect, useState } from "react"
import LoanApplicationCard from "../../components/admin/LoanApplicationCard"
import { Box, Typography } from "@mui/material"
import config from "../../config.js"
import Cookies from "js-cookie"

function Approved() {
  const [LoanApprovedApplicationData, setLoanApprovedApplicationData] = useState(
    []
  );

  useEffect(() => {
    fetchLoanApprovedApplication();
  }, []);

  const fetchLoanApprovedApplication = async () => {
    try {
      // const response = await axios.get(
      //   `${config.baseURL}/api/loanrequestapproved`,
      //   { withCredentials: true }
      // )
      const response = await axios.get(
        `${config.baseURL}/api/loanrequestapproved`,
        { 
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
         }
      )
      setLoanApprovedApplicationData(response.data.data)
    } catch (error) {
      console.error("error fetching loan application:", error)
    }
  };

  return (
    <>
      <h1>Approved Application</h1>
      {LoanApprovedApplicationData && LoanApprovedApplicationData.length > 0 ? (
        <Box sx={{ p: 2 }}>
        {LoanApprovedApplicationData.map((application) => (
          <LoanApplicationCard
            key={application._id}
            application={application}
          />
        ))}
      </Box>
      ):(
        <Typography variant="body1" color="textSecondary">
          No applications at the moment
        </Typography>
      )
      }
    </>
  )
}

export default Approved

