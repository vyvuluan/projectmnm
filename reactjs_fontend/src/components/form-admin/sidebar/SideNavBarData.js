import React from "react";
import * as FaI from "react-icons/fa";
import * as AiI from "react-icons/ai";
import * as IoI from "react-icons/io";
import * as RiI from "react-icons/ri";
import * as HiI from "react-icons/hi";
import { AiOutlineContacts } from "react-icons/ai";
import {
  MdOutlineManageAccounts,
  MdOutlineRequestPage,
  MdOutlineInput,
} from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";

export const SideNavBarData = [
  {
    title: "Trang chủ",
    path: "/Home",
    icon: <HiI.HiHome />,
    link: "/PageAdmin",
  },
  {
    title: "Báo cáo",
    path: "/reports",
    icon: <IoI.IoIosPaper />,
    link: `/Chart`,
  },
  {
    title: "Sản phẩm",
    path: "/products",
    icon: <FaI.FaBoxOpen />,
  },
  {
    title: "Liên hệ",
    path: "/contact",
    icon: <AiOutlineContacts />,
    link: `/ContactAdmin`,
  },
  {
    title: "Tài Khoản",
    path: "/account",
    icon: <MdOutlineManageAccounts />,
    link: `/Account`
  },
  {
    title: "Nhà sản xuất",
    path: "/producer",
    icon: <BiBuildingHouse />,
  },
  {
    title: "Nhà cung cấp",
    path: "/supplier",
    icon: <FaI.FaWarehouse />,
  },
  {
    title: "Phiếu nhập",
    path: "/inputForm",
    icon: <MdOutlineInput />,
  },
  {
    title: "Phiếu xuất",
    path: "/outputForm",
    icon: <MdOutlineRequestPage />,
    link: "/ListBill",
  },
];
