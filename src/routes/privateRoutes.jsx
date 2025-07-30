import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const PrivateRoutes = () => {
  const token = Cookies.get("token");
  return token ? <Outlet /> : <Navigate to="/" />
  //return !token ? <Navigate to="/" /> : isVerified === "true" ? <Navigate to="/" /> : <Outlet />
};

export default PrivateRoutes;
