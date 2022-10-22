import React, { useState, useEffect } from "react";
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { FaBars, FaSearch, FaBell, FaEnvelope, FaUser } from "react-icons/fa";
import SearchAdmin from "../search-admin";
import ContactAdmin from "../contact-admin";
const NavBarAdmin = () => {
  const [nameUserAdmin, setNameUserAdmin] = useState();

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
          {/* <!-- Nav Item - Alerts --> */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="alertsDropdown"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaBell />
              {/* <!-- Counter - Alerts --> */}
              <span className="badge badge-danger badge-counter d-none">3</span>
            </a>
            {/* <!-- Dropdown - Alerts --> */}
          </li>

          {/* <!-- Nav Item - Messages --> */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="messagesDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaEnvelope />
              {/* <!-- Counter - Messages --> */}
              <span className="badge badge-danger d-none  badge-counter">
                7
              </span>
            </a>
            {/* <!-- Dropdown - Messages --> */}
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item no-arrow" >
            
            <a className="nav-link"  id="userDropdown" >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {nameUserAdmin}
              </span>
              <FaUser />
            </a>
            
            {/* <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                Activity Log
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      {/* <SearchAdmin/> */}
      {/* <ContactAdmin/> */}
    </>
  );
};
export default NavBarAdmin;
