import React, { useEffect, useState } from "react";
import { Route, redirect } from "react-router-dom";

import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoutes = () => {
  const cookies = new Cookies();

  return (localStorage.getItem("auth_name") &&
    cookies.get("role_id") == 2 ||
    cookies.get("role_id") == 3 ||
    cookies.get("role_id") == 4) ? (
    <Outlet />
  ) : (
    <Navigate to="/loginAdmin" />
  );
};
export default PrivateRoutes;
