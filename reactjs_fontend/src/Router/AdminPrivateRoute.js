import React from "react";
import { Route, redirect } from "react-router-dom";

const AdminPrivateRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ props, location }) =>
        localStorage.getItem("auth_token") ? redirect("/PageAdmin") : redirect("/login")
      }
    />
  );
};
export default AdminPrivateRoute;
