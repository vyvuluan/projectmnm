import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
// import { Login, DetailProduct, CheckOrder } from "../components/form";
import { HomePage, PageProducts, PageAdmin } from "../components";
import _Layout from "../_Layout";
import _LayoutAdmin from "../_Layout/layout-admin";
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
  Contact,
  Warrantycheck,
  Checkout,
  Accountinfo,
  NewPass,
  MyOrder,
  PaymentReturn,

} from "../components/form";
import {
  DetailCustomer,
  Bill,
  ContactAdmin,
  DashBoard,
  ListBill,
  ListBillDetail,
  Account,
  Products,
  Nsx,
  Ncc,
  Emplyee,
  Phieunhap,
  PhieuXuat,
  DonHang,
  LoaiSP,
  Discount,
} from "../components/form-admin";
import Chart from "../components/form-admin/chart";
import LoginAdmin from "../components/form-admin/loginAdmin";
export const PublicRouter = [
  {
    path: "/Login",
    component: Login,
    layout: null,
  },
  {
    path: "/newPass",
    component: NewPass,
    layout: null,
  },
  {
    path: "/DetailProduct/:id",
    component: DetailProduct,
    layout: _Layout,
  },

  {
    path: "/myorder/CheckOrder/:id",
    component: CheckOrder,
    layout: _Layout,
  },
  {
    path: "/orderDetail",
    component: OrderDetail,
    layout: _Layout,
  },
  {
    path: "/Register",
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
    path: "/forgotpass",
    component: ForgotPass,
    layout: null,
  },
  {
    path: "/warranty",
    component: Warrantycheck,
    layout: _Layout,
  },
  {
    path: "/checkout",
    component: Checkout,
    layout: _Layout,
  },
  {
    path: "/LoginAdmin",
    component: LoginAdmin,
    layout: null,
  },
  {
    path: "/Accountinfo",
    component: Accountinfo,
    layout: _Layout,
  },
  {
    path: "/myorder",
    component: MyOrder,
    layout: _Layout,
  },
  {
    path: "/sortProduct",
    component: PageProducts,
    layout: _Layout,
  },
  {
    path: "/paymentreturn",
    component: PaymentReturn,
    layout: _Layout,
  },
];
//chưa xử lý
export const PublicRouter_Admin = [
  {
    path: "/PageAdmin",
    component: DashBoard,
    layout: _LayoutAdmin,
  },

  {
    path: "/Bill",
    component: Bill,
    layout: _LayoutAdmin,
  },
  {
    path: "/contactAdmin",
    component: ContactAdmin,
    layout: _LayoutAdmin,
  },
  {
    path: "/ListBill",
    component: ListBill,
    layout: _LayoutAdmin,
  },
  {
    path: "/ListBillDetail",
    component: ListBillDetail,
    layout: _LayoutAdmin,
  },
  {
    path: "/Chart",
    component: Chart,
    layout: _LayoutAdmin,
  },
  {
    path: "/Account",
    component: Account,
    layout: _LayoutAdmin,
  },
  {
    path: "/Products",
    component: Products,
    layout: _LayoutAdmin,
  },
  {
    path: "/Ncc",
    component: Ncc,
    layout: _LayoutAdmin,
  },
  {
    path: "/Nsx",
    component: Nsx,
    layout: _LayoutAdmin,
  },
  {
    path: "/Employee",
    component: Emplyee,
    layout: _LayoutAdmin,
  },
  {
    path: "/Phieunhap",
    component: Phieunhap,
    layout: _LayoutAdmin,
  },
  {
    path: "/Phieuxuat",
    component: PhieuXuat,
    layout: _LayoutAdmin,
  },
  {
    path: "/donhang",
    component: DonHang,
    layout: _LayoutAdmin,
  },
  {
    path: "/loaisp",
    component: LoaiSP,
    layout: _LayoutAdmin,
  },
  {
    path: "/discount",
    component: Discount,
    layout: _LayoutAdmin,
  },
];
{
  /* <Route path="/product" element={<Product />} />
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
          <Route path="/" element={<HomePage />} /> */
}
export const PrivateRoute = () => {
  const auth = null; // determine if authorized, from context or however you're doing it

  return auth ? <Outlet /> : <Navigate to="/" />;
}
