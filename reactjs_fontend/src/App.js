import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PublicRouter } from "./Router";

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <Warrantycheck /> */}
      {/* <Contact /> */}
      <BrowserRouter>
        <Routes>
          {PublicRouter.map((item, index) => {
            let Page = <item.component />;
            if (item.layout !== null) {
              const Layout = <item.layout children={Page} />;
              Page = Layout;
            }
            return <Route path={item.path} element={Page} />;
          })}
        </Routes>
      </BrowserRouter>
      {/* <Footers></Footers> */}
    </>
  );
}

export default App;
