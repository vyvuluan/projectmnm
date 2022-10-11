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
import {
  Login,
  CheckOrder,
  DetailProduct,
  Features,
  Filter,
  ForgotPass,
  OrderDetail,
  Product,
  ResetPass,
  Resgiter,
  Slideshow,
  AccountInfor,
} from "./components/form/index.js";

import { HomePage } from "./components/index.js";
function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <Warrantycheck /> */}
      {/* <Contact /> */}
      {/* <Footers></Footers> */}
      <BrowserRouter>
        <Routes>
          <Route path="/product" element={<Product />} />
          <Route path="/detailProduct" element={<DetailProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resgiter" element={<Resgiter />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/resetPass" element={<ResetPass />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/slideshow" element={<Slideshow />} />
          <Route path="/checkOrder" element={<CheckOrder />} />
          <Route path="/orderDetail" element={<OrderDetail />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/accountInfor" element={<AccountInfor />} />
          <Route path="/homePage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
