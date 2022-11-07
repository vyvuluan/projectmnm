// import logo from "./logo.svg";
import user from "../../../img/user.png";
import edit from "../../../img/edit.png";
import inbox from "../../../img/envelope.png";
import settings from "../../../img/settings.png";
import help from "../../../img/question.png";
import logout from "../../../img/log-out.png";
import React, { useState, useEffect, useRef } from "react";
import { RiLogoutBoxFill } from 'react-icons/ri'
import { FaUser } from "react-icons/fa";
import "./style.css";
const DropDownMenuAdmin = (props) => {
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
        <FaUser className="m-2" />

        <div className={`dropdown-menu1 ${open ? "active" : "inactive"}`}>
          <ul className="ul">
            <DropdownItem icon={<RiLogoutBoxFill />} text={"Logout"} logout1={props.logout} />
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
      <span className="fs-5 text-dark">{props.icon}</span>
      <a className="iconItem ms-3"> {props.text} </a>
    </li>
  );
}

export default DropDownMenuAdmin;
