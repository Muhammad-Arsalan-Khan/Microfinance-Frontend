import { Modal, Box, Typography, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import jsPDF from 'jspdf'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: "90%", sm: 400 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: 'none',
  maxHeight: '90vh',
  overflowY: 'auto',
};

const AppointmentModal = ({ open, handleClose, data }) => {

  const handleDownloadPDF = () => {
     const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setDrawColor('#8BC441')
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20)

  doc.setFontSize(22);
  doc.setTextColor('#005EB8')
  doc.setFont('helvetica', 'bold')
  doc.text('Appointment Details', pageWidth / 2, 30, { align: 'center' })

  let y = 50
  const lineHeight = 10

  const addLine = (label, value) => {
    doc.setFontSize(12)
    doc.setTextColor('#000')
    doc.setFont('helvetica', 'normal')
    doc.text(`${label}: ${value}`, 20, y)
    y += lineHeight
  };

  addLine('ID',   data.token  || 'N/A')
  addLine('Name', data.userName || 'N/A')
  addLine('Loan Status', data.loanStatus || 'N/A')
  addLine('Category', data.category || 'N/A')
  addLine('Subcategory', data.subCategory || 'N/A')
  addLine('Date', data.appointmentDate || 'N/A')
  addLine('Time', data.appointmentTime || 'N/A')
  addLine('Location', data.appointmentLocation || 'N/A')
  addLine('Requested Amount', data.requestedAmount || 'N/A')
  addLine('Initial Payment', data.initialPayment || 'N/A')
  addLine('Monthly Installment', data.monthlyInstallment || 'N/A')
  addLine('Duration', data.durationMonths ? `${data.durationMonths} months` : 'N/A')

  doc.save('appointment-details.pdf')
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Appointment Details
        </Typography>

        <Typography><strong>ID:</strong> {data.token}</Typography>
        <Typography><strong>Name:</strong> {data.userName}</Typography>
        <Typography><strong>Loan Status:</strong> {data.loanStatus}</Typography>
        <Typography><strong>Category:</strong> {data.category}</Typography>
        <Typography><strong>Subcategory:</strong> {data.subCategory}</Typography>
        <Typography><strong>Date:</strong> {data.appointmentDate}</Typography>
        <Typography><strong>Time:</strong> {data.appointmentTime}</Typography>
        <Typography><strong>Location:</strong> {data.appointmentLocation}</Typography>
        <Typography><strong>Requested Amount:</strong> {data.requestedAmount}</Typography>
        <Typography><strong>Initial Payment:</strong> {data.initialPayment}</Typography>
        <Typography><strong>Monthly Installment:</strong> {data.monthlyInstallment}</Typography>
        <Typography><strong>Duration:</strong> {data.durationMonths} months</Typography>

        <Box mt={3} textAlign="right">
          <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
            Download as PDF
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AppointmentModal;
