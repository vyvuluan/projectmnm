import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as Bt from "react-bootstrap";

import {
  Slideshow,
  Features,
  SectionTitle,
  Product,
} from "../../form/index.js";
import swal from "sweetalert";
const axios = require("axios").default;

// Make a request for a user with a given ID

const HomePage = () => {
  const [paramToken, setParamToken] = useSearchParams()
  const [paramEmail, setParamEmail] = useSearchParams()
  const [paramFullname, setParamFullname] = useSearchParams()

  
  const history = useNavigate();

  const [listProductNew, setListProductNew] = useState([]);
  const [listProductBestSell, setListProductBestSell] = useState([]);


  useEffect(() => {
    const controller = new AbortController();
    if (paramToken.get('token') && paramEmail.get('email') && paramFullname.get('fullname')) {
      localStorage.setItem('auth_token', paramToken.get('token'))
      localStorage.setItem('auth_name', paramEmail.get('email'))
      localStorage.setItem('auth_fullname', paramEmail.get('fullname'))

      swal({
        title: "Đăng nhập thành công",
        icon: "success",
        button: "đóng",
      });
      history('/')
    }
    //clear function
    return () => controller.abort();
  }, []);


  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/home")
      .then(function (response) {
        // handle success
        // console.log(response.data.product_new);
        setListProductNew(response.data.product_new);
        setListProductBestSell(response.data.product_bestseller)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    //clear function
    return () => controller.abort();
  }, []);

  return (
    <>
    <Bt.Container fluid mb={5}>
    <Bt.Row className=" px-xl-5">
      <Slideshow />
      </Bt.Row>
    </Bt.Container>
      {/* <SectionTitle title="Service" /> */}
      <Features />
      <SectionTitle title="Sản phẩm mới" />
      {listProductNew ? (
        <Product item={listProductNew} />
      ) : (
        <div className="text-center">không có sản phẩm</div>
      )}
      <SectionTitle title="Sản phẩm bán chạy" />
      {listProductBestSell ? (
        <Product item={listProductBestSell} />
      ) : (
        <div className="text-center">không có sản phẩm</div>
      )}
    </>
  );
};

export default HomePage;
