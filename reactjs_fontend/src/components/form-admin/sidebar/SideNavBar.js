import React, { useEffect, useState } from "react";
import { FaICursor } from "react-icons/fa";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import * as FaI from "react-icons/fa";
import * as B from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { SideNavBarData } from "./SideNavBarData.js";
import axios from "axios";
import Cookies from "universal-cookie";

import { connect } from "react-redux";

function SideNavBar() {
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const history = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const handleClose = () => {
    history("?show=false");
  }

  useEffect(() => {
    if (searchParam.has("show")) {
      if (searchParam.get("show") === "true") {
        setShow(true);
      } else if (searchParam.get("show") === "false") {
        setShow(false);
      }
    }
  }, [searchParam])


  return (
    <>
      <B.TabContainer fluid defaultActiveKey={"/Home"}>
        <B.Row
          className="d-flex flex-column d-none d-xl-block flex-shrink-0 p-3 text-white bg-dark"
          style={{ height: "100vh", position: "fixed" }}
        >
          <B.Nav
            variant="pills"
            className="flex-column mb-auto"
            style={{ marginTop: "70px" }}
          >
            <B.NavItem>
              {SideNavBarData.map(
                ({ title, icon, path, link, id_role }, index) => {
                  var res =
                    id_role.filter(function (val) {
                      return val == cookies.get("role_id");
                    }).length > 0;
                  if (res) {
                    return (
                      <B.NavLink
                        key={index}
                        className="text-white"
                        eventKey={path}
                      >
                        <Link
                          style={{ textDecoration: "none", color: "#fff" }}
                          to={link}
                        >
                          <span className="fs-5 me-3">{icon}</span>
                          <span className="fs-5">{title}</span>
                        </Link>
                      </B.NavLink>
                    );
                  }
                }
              )}
            </B.NavItem>
          </B.Nav>
        </B.Row>

        <B.Offcanvas show={show} onHide={handleClose} className="bg-dark d-xl-none d-lg-block">
          <B.Offcanvas.Header closeButton>
            <B.Offcanvas.Title></B.Offcanvas.Title>
          </B.Offcanvas.Header>
          <B.Offcanvas.Body>
            <B.Nav
              variant="pills"
              className="flex-column mb-auto"
              style={{ marginTop: "70px" }}
            >
              <B.NavItem>
                {SideNavBarData.map(
                  ({ title, icon, path, link, id_role }, index) => {
                    var res =
                      id_role.filter(function (val) {
                        return val == cookies.get("role_id");
                      }).length > 0;
                    if (res) {
                      return (
                        <B.NavLink
                          key={index}
                          className="text-white"
                          eventKey={path}
                        >
                          <Link
                            style={{ textDecoration: "none", color: "#fff" }}
                            to={link}
                          >
                            <span className="fs-5 me-3">{icon}</span>
                            <span className="fs-5">{title}</span>
                          </Link>
                        </B.NavLink>
                      );
                    }
                  }
                )}
              </B.NavItem>
            </B.Nav>
          </B.Offcanvas.Body>
        </B.Offcanvas>
      </B.TabContainer>
    </>
  );
}

export default SideNavBar;
