import { Button, Box, Stack } from '@mui/material'

const buttons = ['Dashboard', 'Pending', 'Approved', 'Rejected', 'Completed']

function Sidebar({ onSelect, active }) {
  return (
    <Box width="200px" bgcolor="#fdfdfdff" height="100vh" p={2} >
      <Stack spacing={2}>
        {buttons.map((btn) => (
          <Button
            key={btn}
            variant={active === btn ? 'contained' : 'outlined'}
            onClick={() => onSelect(btn)}
            fullWidth
          >
            {btn}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}

export default Sidebar