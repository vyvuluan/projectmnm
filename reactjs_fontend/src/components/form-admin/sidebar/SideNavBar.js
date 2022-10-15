import React, { useState } from "react";
import { FaICursor } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as FaI from "react-icons/fa";
import * as B from "react-bootstrap";
import { MdDashboard } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import { SideNavBarData } from "./SideNavBarData.js";

function SideNavBar() {
  return (
    <>
      <B.TabContainer fluid defaultActiveKey={"/Home"} className="fixed-top " >
        <B.Row
          className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
          style={{ height: "100vh" }}
          
        >
          <B.Nav variant="pills" className="flex-column mb-auto">
            <B.NavItem>
              {SideNavBarData.map(({ title, icon, path, link }, index) => (
                <B.NavLink key={index} className="text-white " eventKey={path}>
                  <Link style={{textDecoration:"none", color: "#fff"}} s to={link}>
                  <span className="fs-5 me-3">{icon}</span>
                    <span className="fs-5">{title}</span>
                  </Link>
                </B.NavLink>
              ))}
            </B.NavItem>
            {/* <B.Tabs className='mt-3'>
                        </B.Tabs> */}
          </B.Nav>
        </B.Row>
      </B.TabContainer>
    </>
  );
}

export default SideNavBar;
