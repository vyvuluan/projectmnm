import React,{useEffect,useState} from "react";
import { SectionTitle, Product, Pagination } from "../../form/index.js";
import axios from "axios";
const PageProducts = () => {
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
      <SectionTitle title="Sản phẩm" />
      {listProduct ? (
        <Product item={listProduct} />
      ) : (
        <div className="text-center">không có sản phẩm</div>
      )}
      <Pagination/>
    </>
  );
};
export default PageProducts;
