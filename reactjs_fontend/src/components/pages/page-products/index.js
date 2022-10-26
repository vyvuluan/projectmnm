import React, { useEffect, useState } from "react";
import { SectionTitle, Product, Pagination, Filter } from "../../form/index.js";
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
    const controller = new AbortController();

    if (searchParam.get("category")) {
      axios
        .get(`/api/cate/product/${[...searchParam][0][1]}`)
        .then(function (response) {
          // handle success
          // console.log(response.data.Loaisp);
          // console.log("hello"+[...searchParam][0][1]);

          // setListProduct(response.data.Loaisp);

          setTotalPage(response.data.Loaisp.total);
          setPerPage(response.data.Loaisp.per_page);
          setListProduct(response.data.Loaisp.data);
          setCurrentPage(response.data.Loaisp.current_page)
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
      return () => controller.abort();
    } else {
      const controller = new AbortController();
      axios
        .get(`/api/products/view?page=${page}`)
        .then(function (response) {
          // handle success
          // console.log(response.data.total);
          setTotalPage(response.data.total);
          setPerPage(response.data.per_page);
          setListProduct(response.data.data);
          setCurrentPage(response.data.current_page)
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
  }, [page]);
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
      <Container fluid>
        <Row>
          <Col>
            <SectionTitle title="Sản phẩm" />
            {product_HTML}
            <Pagination currentPage={currentPage} totalPage={pageNumbers} handlePerPage={handlePerPage} />
          </Col>
        </Row>
        {/* <div>{search}</div> */}
      </Container>
    </>
  );
};
export default PageProducts;
