import { useState } from "react"
import { Card, CardContent, Typography, Button } from "@mui/material"
import ViewDetailsModal from "../../model/admin/ViewDetailsModal"

function LoanApplicationCard({ application }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Card sx={{ mb: 2, backgroundColor: "#fafafa" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {application.userName} ({application.userEmail})
          </Typography>

          <Typography variant="body2">
            <strong>Loan Status:</strong> {application.loanStatus}
          </Typography>

          <Typography variant="body2">
            <strong>Category:</strong> {application.category} - {application.subCategory}
          </Typography>

          <Typography variant="body2">
            <strong>Appointment Date:</strong> {application.appointmentDate}
          </Typography>

          <Typography variant="body2">
            <strong>Appointment Time:</strong> {application.appointmentTime}
          </Typography>

          <Typography variant="body2">
            <strong>Appointment Location:</strong> {application.appointmentLocation}
          </Typography>

          <Typography variant="body2">
            <strong>Requested Amount:</strong> {application.requestedAmount.toLocaleString()}
          </Typography>

          <Typography variant="body2">
            <strong>Monthly Installment:</strong> {application.monthlyInstallment.toLocaleString()}
          </Typography>

          <Typography variant="body2">
            <strong>Duration (Months):</strong> {application.durationMonths}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>ID:</strong> {application.token}
          </Typography>

          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleOpen}>
            View Details
          </Button>
        </CardContent>
      </Card>

      {open && <ViewDetailsModal open={open} handleClose={handleClose}  application={application} />}
    </>
  );
}

export default LoanApplicationCard

