import React from "react";
// import { Login, DetailProduct, CheckOrder } from "../components/form";
import { HomePage, PageProducts, PageAdmin } from "../components";
import _Layout from "../_Layout";
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
  Category,
  Cart,
  Contact
} from "../components/form";
export const PublicRouter = [
  {
    path: "/Login",
    component: Login,
    layout: null,
  },
  {
    path: "/DetailProduct",
    component: DetailProduct,
    layout: _Layout,
  },
  {
    path: "/CheckOrder",
    component: CheckOrder,
    layout: _Layout,
  },
  {
    path: "/orderDetail",
    component: OrderDetail,
    layout: _Layout,
  },
  {
    path: "/resgiter",
    component: Resgiter,
    layout: null,
  },
  {
    path: "/",
    component: HomePage,
    layout: _Layout,
  },

  {
    path: "/Category",
    component: Category,
    layout: _Layout,
  },
  {
    path: "/Slideshow",
    component: Slideshow,
    layout: _Layout,
  },
  {
    path: "/Cart",
    component: Cart,
    layout: _Layout,
  },
  {
    path: "/Contact",
    component: Contact,
    layout: _Layout,
  },
  {
    path: "/pageproducts",
    component: PageProducts,
    layout: _Layout,
  },
  {
    path: "/PageAdmin",
    component: PageAdmin,
    layout: null,
  },

];
{/* <Route path="/product" element={<Product />} />
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
          <Route path="/" element={<HomePage />} /> */}
