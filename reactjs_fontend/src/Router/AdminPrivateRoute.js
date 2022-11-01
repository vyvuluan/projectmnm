import React, { useEffect, useState } from "react";
import { Route, redirect } from "react-router-dom";

import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {

  return localStorage.getItem("auth_name") ? <Outlet /> : <Navigate to='/loginAdmin' />
  
}
export default PrivateRoutes
