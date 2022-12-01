import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as Bt from "react-bootstrap";
import { AiFillFire, AiOutlineStock } from 'react-icons/ai'
import { RiShoppingBag2Fill, RiMedalFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import {
  Slideshow,
  Features,
  SectionTitle,
  Product,
  Discount,
} from "../../form/index.js";
import swal from "sweetalert";
const axios = require("axios").default;

// Make a request for a user with a given ID

const HomePage = () => {
  const [paramToken, setParamToken] = useSearchParams();
  const [paramEmail, setParamEmail] = useSearchParams();
  const [paramFullname, setParamFullname] = useSearchParams();
  const [paramEmailFB, setParamEmailFB] = useSearchParams();

  const history = useNavigate();

  const [listProductNew, setListProductNew] = useState([]);
  const [listProductBestSell, setListProductBestSell] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    if (
      paramToken.get("token") &&
      paramEmail.get("email") || paramEmailFB.get("email") == "" &&
      paramFullname.get("fullname")
    ) {
      localStorage.setItem("auth_token", paramToken.get("token"));
      localStorage.setItem("auth_name", paramEmail.get("email"));
      localStorage.setItem("auth_fullname", paramEmail.get("fullname"));

      swal({
        title: "Đăng nhập thành công",
        icon: "success",
        button: "đóng",
      });
      history("/");
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

        setListProductNew(response.data.product_new);
        setListProductBestSell(response.data.product_bestseller);
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
      <SectionTitle title="Mã khuyến mại" icon={<AiFillFire className='fs-2 text-danger mt-1' />} />
      <Discount />
      {/* <SectionTitle title="Service" /> */}
      {/* <SectionTitle title="Sản phẩm mới" /> */}
      <Link to='/pageproducts' className="text-decoration-none text-dark"><SectionTitle title="Sản phẩm mới" icon={<RiShoppingBag2Fill className='fs-2 text-danger mt-1' />} /></Link>
      {listProductNew ? (
        <Product item={listProductNew} />
      ) : (
        <div className="text-center">không có sản phẩm</div>
      )}
      <Link to='/pageproducts' className="text-decoration-none text-dark"><SectionTitle title="Sản phẩm bán chạy" icon={<RiMedalFill className='fs-2 text-danger mt-1' />} /></Link>
      {/* <SectionTitle title="Sản phẩm bán chạy" /> */}
      {listProductBestSell ? (
        <Product item={listProductBestSell} />
      ) : (
        <div className="text-center">không có sản phẩm</div>
      )}
      <Features />
    </>
  );
};

export default HomePage;
