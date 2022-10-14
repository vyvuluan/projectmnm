import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNavBar from "./components/form-admin/sidebar/SideNavBar.js";
import { PublicRouter } from "./Router";
import { NavbarAdmin } from "./components/form-admin/index.js";

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          {PublicRouter.map((item, index) => {
            let Page = <item.component />;
            if (item.layout !== null) {
              const Layout = <item.layout children={Page} />;
              Page = Layout;
            }
            return <Route path={item.path} element={Page} />;
          })}
          <Route path="/SideNavBar" element={<SideNavBar />}></Route>
        </Routes>
      </BrowserRouter> */}
      <NavbarAdmin />
      <AdminLayout />
    </>
  );
}

export default App;
