import axios from "axios"
import { useEffect, useState } from "react"
import LoanApplicationCard from "../../components/admin/LoanApplicationCard"
import { Box, Typography } from "@mui/material"

function Approved() {
  const [LoanApprovedApplicationData, setLoanApprovedApplicationData] = useState(
    []
  );

  useEffect(() => {
    fetchLoanApprovedApplication();
  }, []);

  const fetchLoanApprovedApplication = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/loanrequestapproved`,
        { withCredentials: true }
      )
      setLoanApprovedApplicationData(response.data.data)
      // console.log(response.data.data)
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

