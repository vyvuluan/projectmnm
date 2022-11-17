import React, { useCallback, useEffect, useState } from "react";
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
import { useParams, useSearchParams } from "react-router-dom";
import LoadingPage from "../../layouts/Loading/index.js";
const PageProducts = () => {
  const [loading, setLoading] = useState(true);
  const [b, setB] = useState([])
  // const [firstPage,setFirstPage] = useState();
  const [gia, setGia] = useState();
  const [value1, setValue1] = useState([0, gia]);
  const [Checked, setChecked] = useState([]);
  const [CheckedALL, setCheckedALL] = useState([]);

  const [viewNSX, setViewNSX] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState();
  const [currentPage, setCurrentPage] = useState();

  const [listProduct, setListProduct] = useState([]);
  // const [search, setSearch] = useSearchParams(
  //   search.get('search')
  // );
  let dataIDNSX = [];
  let idNSX1 = viewNSX.map((item) => {
    return dataIDNSX.push(item.id);
  });
  
   

  const handlePerPage = (page) => {
    // console.log(page);
    setPage(page);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }
  let gia1;
  useEffect(() => {
    axios
      .get(`/api/giaMax`)
      .then((res) => {
        setGia(res.data.data.gia);
        gia1 = res.data.data.gia;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setValue1([0, gia1]);
      });
  }, []);
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    axios
      .get(`/api/nsx`)
      .then((res) => {
        if (res.data.status == 200) {
          // console.log(res.data.Nsx);
          setViewNSX(res.data.Nsx);
          // setIdNSX(res.data.Nsx.id);
          let dataNSXtest = []
          res.data.Nsx.map((item) =>{
            return dataNSXtest.push(item.id)
          })
          setB(dataNSXtest)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    // const controller = new AbortController();
    // console.log(...searchParam);
    if (searchParam.has("search")) {
      axios
        .get(`/api/searchProduct?key=${searchParam.get("search")}`)
        .then((res) => {
          if (res.status === 200) {
            setListProduct(res.data.product);
            setLoading(false);
          }
        });
    } else if (searchParam.get("category")) {
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

  // console.log(listProduct);

  // const [dataFilter, setDataFilter] = useState();
  console.log(b);
  const handleChange = (e) => {
    // console.log([e.target.value]);
    var a = e.target.value;
    setB(a.split(",").map(Number));
  };

  const minDistance = 10;
  function valuetext(value) {
    // console.log(value);
    return value;
  }

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const handleToggle = (value) => {
    // console.log("qqq");
    idNSX1 = null;
    // console.log(idNSX1);
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setB(null);
    setChecked(newChecked);
  };

  const handleFilter = () => {
    console.log(idNSX1);
    // console.log(Checked);
    axios
      .get(
        `/api/sort-chitiet-minmax?nsx_id=${
          b ? b : Checked
        }&giaMin=${value1[0]}&giaMax=${value1[1]}&page=${page}`
      )
      .then(
        (res) => {
          // console.log(res.data.data);
          setListProduct(res.data.data.data);
          setTotalPage(res.data.data.total);
          setPerPage(res.data.data.per_page);
          setCurrentPage(res.data.data.current_page);
        },
        [page]
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Container fluid className="mt-5">
        <Row>
          <SectionTitle title="Sản phẩm" />
          <Col sm={2}>
            <Filter
              handleFilter={handleFilter}
              handleToggle={handleToggle}
              value1={value1}
              handleChange1={handleChange1}
              valuetext={valuetext}
              Checked={Checked}
              viewNSX={viewNSX}
              handleChange={handleChange}
              idNSX1={idNSX1}
              gia={gia}
            />
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
