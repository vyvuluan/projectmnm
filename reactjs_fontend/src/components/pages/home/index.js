import React, { useState, useEffect } from "react";

import {
  Slideshow,
  Features,
  SectionTitle,
  Product,
} from "../../form/index.js";
const axios = require("axios").default;

// Make a request for a user with a given ID

const HomePage = () => {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("http://localhost:8000/api/products")
      .then(function (response) {
        // handle success
        // console.log(response.data.data[0].hinh);
        setListProduct(response.data.data);
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
      <Slideshow />
      <SectionTitle title="Service" />
      <Features />
      <SectionTitle title="Sản phẩm bán chạy nhất" />
      {listProduct ? (
        <Product item={listProduct} />
      ) : (
        <div>không có sản phẩm</div>
      )}
    </>
  );
};

export default HomePage;