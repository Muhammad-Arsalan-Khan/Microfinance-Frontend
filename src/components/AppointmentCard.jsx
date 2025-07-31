import React, { useState } from "react"
import {Card, CardContent, Typography, Box, IconButton, Modal} from "@mui/material"
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
          height: 180,
          maxWidth: 650,
         width: "600px"
        }}
      >
        {/* Left Section: Appointment Details */}
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
              height: 190,
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
