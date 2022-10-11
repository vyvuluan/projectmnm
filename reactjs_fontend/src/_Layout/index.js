import React from "react";
import { Header, Footer } from "../components/layouts";
const _Layout = (props) => {
  return (
    <>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  );
};
export default _Layout;
