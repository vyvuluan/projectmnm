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
//báo cáo 234
//sp 3
//lien he 4
// nhan vien 2
//tai khoản 2,4
// ncc nsx 3
//pn px 3

export const SideNavBarData = [
  {
    title: "Trang chủ",
    path: "/Home",
    icon: <HiI.HiHome />,
    link: "/PageAdmin",
    id_role: [2, 3, 4],
  },
  {
    title: "Báo cáo",
    path: "/reports",
    icon: <IoI.IoIosPaper />,
    link: `/Chart`,
    id_role: []
  },
  {
    title: "Sản phẩm",
    path: "/products",
    icon: <FaI.FaBoxOpen />,
    link: `/Products`,
    id_role: [3]

  },
  {
    title: "Liên hệ",
    path: "/contact",
    icon: <AiOutlineContacts />,
    link: `/ContactAdmin`,
    id_role: [4]

  },
  {
    title: "Nhân viên",
    path: "/employee",
    icon: <FaI.FaUserTie />,
    link: `/Employee`,
    id_role: [2]

  },
  {
    title: "Tài Khoản",
    path: "/account",
    icon: <MdOutlineManageAccounts />,
    link: `/Account`,
    id_role: [2, 4]
  },
  {
    title: "Nhà sản xuất",
    path: "/nsx",
    icon: <BiBuildingHouse />,
    link: `/Nsx`,
    id_role: [3]

  },
  {
    title: "Nhà cung cấp",
    path: "/ncc",
    icon: <FaI.FaWarehouse />,
    link: `/Ncc`,
    id_role: [3]

  },
  {
    title: "Phiếu nhập",
    path: "/phieunhap",
    icon: <MdOutlineInput />,
    link: `/Phieunhap`,
    id_role: [3]

  },
  {
    title: "Phiếu xuất",
    path: "/phieuxuat",
    icon: <MdOutlineRequestPage />,
    link: "/Phieuxuat",
    id_role: [3]
  },
];
