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
              <div key={item.id} className="py-3 border border-top-0 hoverItem">
                <Link
                  to={"/pageproducts?category=" + item.id}
                  className="text-decoration-none text-dark ms-4"
                >
                  {item.tenLoai}
                </Link>
              </div>
              // <Link
              //   style={{
              //     textDecoration: "none",
              //     borderBottom: "1px solid #cecece",
              //   }}
              //   key={item.id}
              //   to={"/pageproducts?category=" + item.id}
              // >
              //   <a
              //     className="nav-item nav-link"
              //   // onClick={HandleClickCategory}
              //   >
              //     {item.tenLoai}
              //   </a>
              // </Link>
            );
          })}
        </>
      );
    } else {
      <span>Rỗng</span>;
    }
  }

  return <>{category_Html}</>;
};
export default Category;
