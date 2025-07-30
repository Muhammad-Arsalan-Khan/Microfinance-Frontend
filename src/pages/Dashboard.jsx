import React from 'react'
import { useEffect, useState } from "react";
import Navbar from '../components/navbar.jsx'
import LoanCard from '../components/loanCard.jsx'

function Dashboard() {
  return (
    <> 
      <Navbar />
      <LoanCard />
    </>
  )
}

export default Dashboard