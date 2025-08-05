import { Button, Box, Stack } from '@mui/material'

const buttons = ['Dashboard', 'Pending', 'Approved', 'Rejected', 'Completed']

function Sidebar({ onSelect, active }) {
  return (
    <Box sx={{width:{xs:"100%", sm: "200px"}}} bgcolor="#fdfdfdff" height="100vh" p={2} border={"1px solid black"}>
      <Stack spacing={2} >
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