import { useState } from "react"
import {Card, Typography, Box, IconButton} from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import AppointmentModal from "../model/AppointmentModal"

const AppointmentCard = ({ data }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    category,
    subCategory,
    appointmentDate,
    appointmentTime,
    appointmentLocation,
    qrCodeURL,
  } = data;

  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          paddingRight: 0,
          mb: 2,
          maxWidth: 650,
          flexDirection :{xs: 'column', sm: 'row'},
          width:{xs: "250px", sm: "600px"},
          height:{xs: "auto", sm:"180px"}
        }}
      >
        <Box sx={{ flex: 2 }}>
          <Typography variant="h6">
            {category}{" "}
            <Typography component="span" variant="body2" color="text.secondary">
              ({subCategory})
            </Typography>
          </Typography>
          <Typography>Date: {appointmentDate}</Typography>
          <Typography>Time: {appointmentTime}</Typography>
          <Typography>Location: {appointmentLocation}</Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection :{xs: 'column', sm: 'row'},
            gap: 1,
          }}
        >
          <img
            src={qrCodeURL}
            alt="QR Code"
            style={{ width: 170, height: 170, objectFit: "contain" }}
          />
          <IconButton
            onClick={handleOpen}
            sx={{
              height: {xs: "auto", sm: "190px"},
              width:{xs:"100%", sm: "auto"},
              borderRadius: 2,
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Card>

      <AppointmentModal open={open} handleClose={handleClose} data={data} />
    </>
  );
};

export default AppointmentCard
