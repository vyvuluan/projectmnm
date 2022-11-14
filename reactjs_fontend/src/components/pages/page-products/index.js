import React, { useEffect, useState } from "react";
import * as Bt from "react-bootstrap";

import {
  SectionTitle,
  Product,
  Pagination,
  Filter,
  SortProduct,
} from "../../form/index.js";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSearchParams } from "react-router-dom";
import LoadingPage from "../../layouts/Loading/index.js";
const PageProducts = () => {
  const [loading, setLoading] = useState(true);
  // const [firstPage,setFirstPage] = useState();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState();
  const [currentPage, setCurrentPage] = useState();

  const [listProduct, setListProduct] = useState([]);
  // const [search, setSearch] = useSearchParams(
  //   search.get('search')
  // );
  const handlePerPage = (page) => {
    // console.log(page);
    setPage(page);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }

  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    // const controller = new AbortController();
    console.log(...searchParam);
    if (searchParam.get("category")) {
      axios
        .get(`/api/cate/product/${[...searchParam][0][1]}`)
        .then(function (response) {
          // handle success
          // console.log(response);

          setListProduct(response.data.Loaisp.data);
          setTotalPage(response.data.Loaisp.total);
          setPerPage(response.data.Loaisp.per_page);
          setCurrentPage(response.data.Loaisp.current_page);
          // console.log(response.data.Loaisp.length);
          // if(response.data.Loaisp.length)
          setLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      //clear function
    } else if (searchParam.get("key")) {
      // console.log("thanhf coong");
      axios
        .get(`/api/sortProduct?key=${[...searchParam][0][1]}`)
        .then((response) => {
          // handle success
          // console.log(response);
          setListProduct(response.data.product.data);
          setTotalPage(response.data.product.total);
          setPerPage(response.data.product.per_page);
          setCurrentPage(response.data.product.current_page);
          setLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      const controller = new AbortController();
      axios
        .get(`/api/products/view?page=${page}`)
        .then(function (response) {
          // handle success
          setListProduct(response.data.data);
          setTotalPage(response.data.total);
          setPerPage(response.data.per_page);
          setCurrentPage(response.data.current_page);
          setLoading(false);
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
    }
  }, [page, searchParam]);
  if (loading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  } else {
    var product_HTML = "";
    if (listProduct.length > 0) {
      product_HTML = (
        <>
          {listProduct ? (
            <Product item={listProduct} />
          ) : (
            <div className="text-center">không có sản phẩm</div>
          )}
        </>
      );
    }
  }

  return (
    <>
      <Container fluid className="mt-5">
        <Row>
            <SectionTitle title="Sản phẩm" />
            <Col sm ={2}>
              <Filter/>
              

            </Col>
            <Col sm={10}>

            {/* sort */}
            <SortProduct />
            
            {product_HTML}

            <Pagination
              currentPage={currentPage}
              totalPage={pageNumbers}
              handlePerPage={handlePerPage}
            />
          </Col>
        </Row>
        {/* <div>{search}</div> */}
      </Container>
    </>
  );
};
export default PageProducts;
