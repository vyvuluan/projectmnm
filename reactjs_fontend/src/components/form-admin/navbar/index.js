import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { FaBars, FaSearch, FaBell, FaEnvelope, FaUser } from "react-icons/fa";
import SearchAdmin from "../search-admin";
import ContactAdmin from "../contact-admin";
import DropDownMenuAdmin from "../dropdownMenuAdmin";
import swal from "sweetalert";
import axios from "axios";
import Cookies from "universal-cookie";
const NavBarAdmin = () => {
  const [nameUserAdmin, setNameUserAdmin] = useState();
  const history = useNavigate();
  const cookies = new Cookies();

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/logout").then((res) => {
        if (res.data.status === 200) {
          // console.log(res);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_name");
          cookies.remove("role_id");
          swal({
            title: res.data.message,
            icon: "success",
            button: "đóng",
          });
          history("/loginAdmin");
        }
      });
    });
  };

  useEffect(() => {
    if (localStorage.getItem("auth_name")) {
      setNameUserAdmin(localStorage.getItem("auth_name"));
    }
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-dark topbar fixed-top">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          {/* <i className="fa fa-bars"></i> */}
          <FaBars />
        </button>
        {/* form tìm kiếm */}
        <div className="row m-3 " style={{ color: "#d19c97" }}>
          {/* <h5>L3M Admin</h5> */}
          <a href="#" className="text-decoration-none">
            <span className="fs-4 text-primary fw-bold">
              L3M <span className="text-white">SHOP</span>
            </span>
          </a>
          <div className="text-muted fs-6">ADMINISTRATOR</div>
        </div>
        <ul className="navbar-nav ml-auto">
        
          {/* <div className="topbar-divider d-none d-sm-block"></div> */}

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item no-arrow">
            <a className="nav-link" id="userDropdown">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {nameUserAdmin}
              </span>

              <DropDownMenuAdmin logout={logoutSubmit} />
            </a>

      
           
          </li>
        </ul>
      </nav>
      {/* <SearchAdmin/> */}
      {/* <ContactAdmin/> */}
    </>
  );
};
export default NavBarAdmin;
