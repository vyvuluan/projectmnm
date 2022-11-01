import axios from "axios";
import React, { useEffect, useState } from "react";
import * as B from "react-bootstrap";

import { NavbarAdmin, SideBar, DashBoard } from "../../form-admin";
const PageAdmin = () => {
 
  return (
    <>
      <NavbarAdmin />
      <B.Container fluid>
        <B.Row>
          <B.Col lg={2}>
            <SideBar />
          </B.Col>
          <B.Col lg={10} className="mt-5">
            <DashBoard />
          </B.Col>
        </B.Row>
      </B.Container>
    </>
  );
};
export default PageAdmin;
