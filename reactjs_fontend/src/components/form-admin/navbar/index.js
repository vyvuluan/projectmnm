import React from "react";
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import { FaBars, FaSearch, FaBell, FaEnvelope, FaUser } from "react-icons/fa";
import SearchAdmin from "../search-admin";
import ContactAdmin from "../contact-admin";
const NavBarAdmin = () => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-dark topbar static-top shadow">
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
          <a href='#' className='text-decoration-none'>
            <span className='fs-4 text-primary fw-bold'>L3M <span className='text-white'>SHOP</span></span>
          </a>
          <div className='text-muted fs-6'>ADMINISTRATOR</div>

        </div>
        <ul className="navbar-nav ml-auto">
          {/* <!-- Nav Item - Alerts --> */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaBell  />
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
              <span className="badge badge-danger d-none  badge-counter">7</span>
            </a>
            {/* <!-- Dropdown - Messages --> */}
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item no-arrow">
            <a className="nav-link" href="#" id="userDropdown" role="button">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                User
              </span>
              <FaUser />
            </a>
            {/* <!-- Dropdown - User Information --> */}
          </li>
        </ul>
      </nav>
      {/* <SearchAdmin/> */}
      {/* <ContactAdmin/> */}
    </>
  );
};
export default NavBarAdmin;
