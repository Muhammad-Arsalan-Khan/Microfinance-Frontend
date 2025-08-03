import axios from "axios"
import { useEffect, useState } from "react"
import LoanApplicationCard from "../../components/admin/LoanApplicationCard"
import { Box, Typography } from "@mui/material"
import config from "../../config.js"
import Cookies from "js-cookie"

function Pending() {
  const [LoanPeddingApplicationData, setLoanPeddingApplicationData] = useState(
    []
  );

  useEffect(() => {
    fetchLoanPenddingApplication()
  }, []);

  const fetchLoanPenddingApplication = async () => {
    try {
      // const response = await axios.get(
      //   `${config.baseURL}/api/loanrequestpendding`,
      //   { withCredentials: true }
      // )
      const response = await axios.get(
        `${config.baseURL}/api/loanrequestpendding`,
        { 
          headers:{
            Authorization: `Bearer ${Cookies.get("token")}`
          }
         }
      )
      setLoanPeddingApplicationData(response.data.data)
    } catch (error) {
      console.error("error fetching loan application:", error)
    }
  };

  return (
    <>
      <h1>Pendding Application</h1>
      {
        LoanPeddingApplicationData && LoanPeddingApplicationData.length > 0 ?
        ( <Box sx={{ p: 2 }}>
        {LoanPeddingApplicationData.map((application) => (
          <LoanApplicationCard
            key={application._id}
            application={application}
          />
        ))}
      </Box>) :( 
        <Typography variant="body1" color="textSecondary">
          No applications at the moment
        </Typography>
      )
      }
    </>
  )
}

export default Pending
