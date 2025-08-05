import axios from "axios"
import { useEffect, useState } from "react"
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material"
import DaysStatusModal from "../../model/admin/DaysStatus"
import config from "../../config.js"
import Cookies from "js-cookie"

function MainDashboard() {
  const [LoanApplicationData, setLoanApplicationData] = useState([])
    const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    fetchLoanApplication()
  }, []);

  const fetchLoanApplication = async () => {
    try {
      // const response = await axios.get(
      //   `${config.baseURL}/api/loanrequest`,
      //   { withCredentials: true }
      // )
      const response = await axios.get(
        `${config.baseURL}/api/loanrequest`,
        {
          headers:{
            Authorization: `Bearer ${Cookies.get("token")}`
          }
        }
      )
      setLoanApplicationData(response.data.data)
    } catch (error) {
      console.error("error fetching loan application:", error)
    }
  };

  const getStatusCount = (status) =>
    LoanApplicationData.filter((item) => item.loanStatus === status).length

  const statuses = ["Pending", "Approved", "Rejected", "completed"]

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {statuses.map((status) => (
          <Grid item xs={12} sm={6} md={3} key={status}>
            <Card sx={{ backgroundColor: "#f5f5f5" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {status}
                </Typography>
                <Typography variant="h4">{getStatusCount(status)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
       <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => setOpenModal(true)}
      >
        Set Appointments Days Status
      </Button>
      {openModal && <DaysStatusModal open={openModal} handleClose={() => setOpenModal(false)} />}
    </Box>
  )
}

export default MainDashboard
