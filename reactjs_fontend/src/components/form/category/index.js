import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { Loading } from "../loading";
import { Link } from "react-router-dom";
import Product from "../product";
import LoadingPage from "../../layouts/Loading";
const Category = () => {
  const [loading, setLoading] = useState(true);
  const [getID, setGetID] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [linkCate, setLinkcate] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/loaisp/view")
      .then(function (response) {
        // console.log(response.data.Loaisp);
        if (response.data.status === 200) {
          setListCategory(response.data.Loaisp);
          setLoading(false);
        }
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

  if (loading) {
    return <LoadingPage />;
  } else {
    var category_Html = "";
    if (listCategory.length > 0) {
      category_Html = (
        <>
          {listCategory.map((item) => {
            return (
              <Link
                style={{
                  textDecoration: "none",
                  borderBottom: "1px solid #cecece",
                }}
                key={item.id}
                to={"/pageproducts?category=" + item.id}
              >
                <a
                  className="nav-item nav-link"
                  // onClick={HandleClickCategory}
                >
                  {item.tenLoai}
                </a>
              </Link>
            );
          })}
        </>
      );
    } else {
      <span>Không có category</span>;
    }
  }

  return (
    <>
      <div className="col-sm-2 d-none d-lg-block">
        <a
          className="btn d-flex align-items-center bg-primary text-white"
          style={{ height: "48px", paddingLeft: "10px" }}
        >
          <h5 className="m-0 font-size-30">Categories</h5>
        </a>
        <nav
          className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
          id="navbar-vertical"
        >
          <div
            className="navbar-nav w-100 overflow-hidden"
            style={{
              height: "auto",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            {category_Html}
          </div>
        </nav>
      </div>
    </>
  );
};
export default Category;
