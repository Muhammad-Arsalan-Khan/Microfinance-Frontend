import  { useState } from 'react'
import Navbar from "../../components/navbar"
import Sidebar from '../../components/admin/Sidebar.jsx'
import Pending from './Pending.jsx'
import Approved from './Approved.jsx'
import Rejected from './Rejected.jsx'
import Completed from './Completed.jsx'
import MainDashboard from './MainDashboard.jsx'
import { Box } from '@mui/material'

function Dashboard() {
  const [activePage, setActivePage] = useState('Dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'Pending': return <Pending />
      case 'Approved': return <Approved />
      case 'Rejected': return <Rejected />
      case 'Completed': return <Completed />
      default: return <MainDashboard />
    }
  };

  return (
    <>
      <Navbar />
      <Box display="flex" height="calc(100vh - 64px)" sx={{flexDirection :{xs: 'column', sm: 'row'}}} >
        <Sidebar onSelect={setActivePage} active={activePage} />
        <Box flex={1} p={3}>
          {renderPage()}
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
