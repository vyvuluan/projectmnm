import React from "react";
import { NavbarAdmin, SideBar } from "../components/form-admin";
import * as B from "react-bootstrap";

const _LayoutAdmin = (props) => {
  return (
    <>
      <NavbarAdmin />
      <B.Container fluid>
        <B.Row>
          <B.Col lg={2}>
            <SideBar />
          </B.Col>
          <B.Col lg={10} style={{ marginTop: '100px' }}>
            {props.children}
          </B.Col>
        </B.Row>
      </B.Container>
    </>
  );
};
export default _LayoutAdmin;
