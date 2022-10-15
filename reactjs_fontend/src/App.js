import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PublicRouter, PublicRouter_Admin } from "./Router";

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
          {/* <Route path="/SideNavBar" element={<SideNavBar />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
