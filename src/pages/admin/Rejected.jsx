import axios from "axios"
import { useEffect, useState } from "react"
import LoanApplicationCard from "../../components/admin/LoanApplicationCard"
import { Box, Typography } from "@mui/material"
import config from '../../config.js'
import Cookies from "js-cookie"

function Rejected() {
  const [LoanRejectedApplicationData, setLoanRejectedApplicationData] = useState(
    []
  );

  useEffect(() => {
    fetchLoanRejectedApplication()
  }, []);

  const fetchLoanRejectedApplication = async () => {
    try {
      // const response = await axios.get(
      //   `${config.baseURL}/api/loanrequestreject`,
      //   { withCredentials: true }
      // );
      const response = await axios.get(
        `${config.baseURL}/api/loanrequestreject`,
        { 
          headers:{
            Authorization: `Bearer ${Cookies.get("token")}`
          }
         }
      )
      setLoanRejectedApplicationData(response.data.data)
    } catch (error) {
      console.error("error fetching loan application:", error)
    }
  };

  return (
    <>
      <h1>Rejected Application</h1>
      {LoanRejectedApplicationData && LoanRejectedApplicationData.length > 0 ?
      (<Box sx={{ p: 2 }}>
        {LoanRejectedApplicationData.map((application) => (
          <LoanApplicationCard
            key={application._id}
            application={application}
          />
        ))}
      </Box>):(
         <Typography variant="body1" color="textSecondary">
          No applications at the moment
        </Typography>
      )
      }
    </>
  )
}

export default Rejected

