import "./App.css";
import Header from "./components/layouts/header/header";
import Cart from "./components/form/cart/cart";
import AccountInfo from "./components/form/account-info/account-info";
import Contact from "./components/form/contact/contact";
import Footers from "./components/layouts/footer";
import Warrantycheck from "./components/form/warranty/warrantycheck";
import Paymentreturn from "./components/form/payment/payment-return";
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
