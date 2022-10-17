import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { PublicRouter, PublicRouter_Admin } from "./Router";
import TestTable from "./components/form-admin/TestTable";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {PublicRouter.map((item) => {
            let Page = <item.component />;
            if (item.layout !== null) {
              const Layout = <item.layout children={Page} />;
              Page = Layout;
            }
            return <Route path={item.path} element={Page} />;
          })}
          {PublicRouter_Admin.map((item) => {
            let Page = <item.component />;
            const Layout = <item.layout children={Page} />;
            Page = Layout;
            return <Route path={item.path} element={Page} />;
          })}
          <Route path="/TestTable" element={<TestTable />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
