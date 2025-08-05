import { useState, useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
} from '@mui/material'
import axios from 'axios'
import Swal from "sweetalert2"
import config from "../../config.js"
import Cookies from "js-cookie"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const isValidDate = (dateStr) => {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if (!regex.test(dateStr)) return false;
  const [day, month, year] = dateStr.split('-').map(Number)
  const date = new Date(`${year}-${month}-${day}`)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

function DaysStatusModal({ open, handleClose }) {
  const [location, setLocation] = useState('HeadOffice')
  const [date, setDate] = useState('')
  const [isOpen, setIsOpen] = useState('')
  const [dateError, setDateError] = useState(false)

  useEffect(() => {
    if (!open) {
      setLocation('HeadOffice');
      setDate('')
      setIsOpen('')
      setDateError(false)
    }
  }, [open])

  const handleUpdate = async () => {
    if (!location || !date || !isOpen || !isValidDate(date)) {
      setDateError(!isValidDate(date));
      return;
    }

    try {
      const payload = {
        location,
        date,
        isOpen: isOpen === 'Open' ? true : false,
      };

      // const response = await axios.patch(
      //   `${config.baseURL}/api/admin/daystatus`,
      //   payload,
      //   { withCredentials: true }
      // )
      const response = await axios.patch(
        `${config.baseURL}/api/admin/daystatus`,payload,
         {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")} `
         }}
      )
      console.log('Day status updated:', response.data);
      handleClose()
      Swal.fire({
              title: "Day status updated successfully",
              icon: "success",
              draggable: true,
            });
    } catch (error) {
      console.error('Failed to update day status:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Days Status
        </Typography>

        <Stack spacing={2}>
          <TextField
            select
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
          >
            <MenuItem value="HeadOffice">HeadOffice</MenuItem>
          </TextField>

          <TextField
            label="Date (DD-MM-YYYY)"
            placeholder="e.g., 29-07-2025"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              setDateError(!isValidDate(e.target.value))
            }}
            error={dateError}
            helperText={dateError ? 'Please enter a valid date (DD-MM-YYYY)' : ''}
            fullWidth
          />

          <TextField
            select
            label="Status"
            value={isOpen}
            onChange={(e) => setIsOpen(e.target.value)}
            fullWidth
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Close">Close</MenuItem>
          </TextField>

          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default DaysStatusModal

