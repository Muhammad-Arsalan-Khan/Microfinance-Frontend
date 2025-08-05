import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import AppointmentCard from "./AppointmentCard"
import config from "../config.js"
import Cookies from "js-cookie"

function LoandeatilCrad({Refresh, onDisableButton}) {
const id = useParams().id || JSON.parse(localStorage.getItem("user")).id
  const [loanData, setloanData] = useState([])

  useEffect(() => {
      fetchloanApplication()
    }, [Refresh])

  const fetchloanApplication = async () => {
    try {
      // const response = await axios.get(
      //   `${config.baseURL}/api/loanrequest/${id}`,
      //   { withCredentials: true }
      // )
      const response = await axios.get(
        `${config.baseURL}/api/loanrequest/${id}`,{
          headers:{
          Authorization : `Bearer ${Cookies.get("token")}`
        }}
      )
     if (response.data.data.length >= 3) {
        onDisableButton(true)
      } else {
        onDisableButton(false)
      }
      setloanData(response.data.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  };

  return (
    <>
      <div style={{ padding: "20px", marginTop: "20px" }}>
      {loanData.length === 0 ? (
        <h2>You still haven’t applied for a loan yet!</h2>
      ) : (
        loanData.map((loan, index) => (
          <AppointmentCard key={index} data={loan} />
        ))
      )}
    </div>
    </>
  );
}

export default LoandeatilCrad
