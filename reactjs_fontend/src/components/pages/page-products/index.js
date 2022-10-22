import React, { useEffect, useState } from "react";
import { SectionTitle, Product, Pagination, Filter } from "../../form/index.js";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSearchParams } from "react-router-dom";
const PageProducts = () => {
  const [loading, setLoading] = useState(true);

  const [listProduct, setListProduct] = useState([]);
  // const [search, setSearch] = useSearchParams(
  //   search.get('search')
  // );
  const [searchParam,setSearchParam] = useSearchParams();
  useEffect(() => {
    const controller = new AbortController();

    if(searchParam.get("category")){
      axios
      .get(`/api/cate/product/${[...searchParam][0][1]}`)
      .then(function (response) {
        // handle success
        console.log(response.data.Loaisp);
        setListProduct(response.data.Loaisp)
        setLoading(false)
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
    else {
      const controller = new AbortController();
        axios
          .get("http://localhost:8000/api/products/view")
          .then(function (response) {
            // handle success
            // console.log(response.data.data[0].hinh);
            setListProduct(response.data.data);
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
    
  }, []);
  if (loading) {
    return (
      <div className="d-flex justify-content-center text-primary">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }else {
   var product_HTML = '';
    if (listProduct.length > 0){
      product_HTML = <>
        {listProduct ? (
              <Product item={listProduct} />
            ) : (
              <div className="text-center">không có sản phẩm</div>
            )}
      </>
    }
    
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2}>
            <Filter />
          </Col>
          <Col>
            <SectionTitle title="Sản phẩm" />
            {product_HTML}
            <Pagination />
          </Col>
        </Row>
        {/* <div>{search}</div> */}
      </Container>
    </>
  );
};
export default PageProducts;
