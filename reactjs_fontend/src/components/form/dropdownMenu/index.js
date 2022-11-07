// import logo from "./logo.svg";
import user from "../../../img/user.png";
import edit from "../../../img/edit.png";
import { FaUserCircle, FaClipboardList } from 'react-icons/fa'
import { RiLogoutBoxFill } from 'react-icons/ri'
import logout from "../../../img/log-out.png";
import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom'
import "./style.css";
const DropDownMenu = (props) => {

  const [open, setOpen] = useState(false);
  // console.log(props.logout);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        // console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="menu-container" ref={menuRef}>
      <div
        className="menu-trigger"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {/* <img className="anh" src={user}></img> */}
        <FaUser
          style={{ width: "auto", height: "25px" }}
          className="text-primary anh1"
        />

        <div className={`dropdown-menu1 ${open ? "active" : "inactive"}`}>
          <ul className="ul">
            <Link to={'/accountinfo'} className='text-decoration-none'><DropdownItem icon={<FaUserCircle />} text={"Tài khoản"} /></Link>
            {/* logout1={test}  */}
            <Link to={'/CheckOrder'} className='text-decoration-none'><DropdownItem icon={<FaClipboardList />} text={"Đơn hàng"} /></Link>
            <DropdownItem icon={<RiLogoutBoxFill />} text={"Đăng xuất"} logout1={props.logout} />
          </ul>
        </div>
      </div>
    </div>
  );
};

function DropdownItem(props) {
  // console.log(props.logout1);
  return (
    <li className="dropdownItem1" onClick={props.logout1}>
      <span className="fs-4">{props.icon}</span>
      <a className="iconItem mt-2 ms-3"> {props.text} </a>
    </li>
  );
}

export default DropDownMenu;
