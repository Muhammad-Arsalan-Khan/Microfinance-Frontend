import axios from "axios"
import { useEffect, useState } from "react"
import LoanApplicationCard from "../../components/admin/LoanApplicationCard"
import { Box, Typography } from "@mui/material"
import config from "../../config.js"
import Cookies from "js-cookie"

function Completed() {
  const [LoanCompletedApplicationData, setLoanCompletedApplicationData] = useState(
    []
  );

  useEffect(() => {
    fetchLoanCompletedApplication()
  }, []);

  const fetchLoanCompletedApplication = async () => {
    try {
      // const response = await axios.get(
      //   `${config.baseURL}/api/loanrequestcomplete`,
      //   { withCredentials: true }
      // )
       const response = await axios.get(
        `${config.baseURL}/api/loanrequestcomplete`,
        { 
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
         }
      )
      setLoanCompletedApplicationData(response.data.data)
    } catch (error) {
      console.error("error fetching loan application:", error)
    }
  };

  return (
    <>
      <h1>Completed Application</h1>
      {
        LoanCompletedApplicationData && LoanCompletedApplicationData.length > 0 ?
        ( <Box sx={{ p: 2 }}>
        {LoanCompletedApplicationData.map((application) => (
          <LoanApplicationCard
            key={application._id}
            application={application}
          />
        ))}
        </Box>
         ) :( 
        <Typography variant="body1" color="textSecondary">
          No applications at the moment
        </Typography>
      )
      }
    </>
  )
}

export default Completed




