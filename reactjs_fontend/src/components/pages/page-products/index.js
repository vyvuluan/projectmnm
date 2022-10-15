import React, { useEffect, useState } from "react";
import { SectionTitle, Product, Pagination, Filter } from "../../form/index.js";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Filter  />
          </Col>
          <Col>
            <SectionTitle title="Sản phẩm" />
            {listProduct ? (
              <Product item={listProduct} />
            ) : (
              <div className="text-center">không có sản phẩm</div>
            )}
            <Pagination />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PageProducts;
