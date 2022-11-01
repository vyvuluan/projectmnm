// import logo from "./logo.svg";
import user from "../../../img/user.png";
import edit from "../../../img/edit.png";
import inbox from "../../../img/envelope.png";
import settings from "../../../img/settings.png";
import help from "../../../img/question.png";
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
            <Link to={'/accountinfo'} className='text-decoration-none'><DropdownItem img={user} text={"My Profile"} /></Link>
            {/* logout1={test}  */}
            <Link to={'/CheckOrder'} className='text-decoration-none'><DropdownItem img={edit} text={"Check Order"} /></Link>
            <DropdownItem img={inbox} text={"Inbox"} />
            <DropdownItem img={settings} text={"Settings"} />
            <DropdownItem img={help} text={"Helps"} />
            <DropdownItem img={logout} text={"Logout"} logout1={props.logout} />
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
      <img className="anhItem" src={props.img}></img>
      <a className="iconItem"> {props.text} </a>
    </li>
  );
}

export default DropDownMenu;
