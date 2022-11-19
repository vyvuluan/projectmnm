import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { PublicRouter, PublicRouter_Admin, PrivateRoute } from "./Router";
import { ProductCate } from "./components/form/index.js";
import PrivateRoutes from "./Router/AdminPrivateRoute";
import { EmptyCart, NotFoundPage, PageAdmin } from "./components";
import Cookies from "universal-cookie";
import swal from "sweetalert";

import { icons } from "react-icons/lib";
import { useEffect } from "react";
// import TestTable from "./components/form-admin/TestTable";
// import { DropDownMenu } from "./components/form";
// import HomePage from "./components/pages/home/index.js"
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("auth_token");

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
function App() {
  const cookies = new Cookies();

  useEffect(() => {
    document.title = "L3M SHOP";
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {PublicRouter.map((item, index) => {
            let Page = <item.component />;
            if (item.layout !== null) {
              const Layout = <item.layout children={Page} />;
              Page = Layout;
            }
            return <Route key={index} path={item.path} element={Page} />;
          })}

          {PublicRouter_Admin.map((item, index) => {
            let Page = <item.component />;
            const Layout = <item.layout children={Page} />;
            Page = Layout;
            return (
              <Route key={index} element={<PrivateRoutes />}>
                <Route path={item.path} element={Page} />
              </Route>
            );
          })}

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
