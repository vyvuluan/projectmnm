import React from "react";
import "./style.css";
const Category = () => {
  return (
    <>
      <div className="col-sm-2 d-none d-lg-block">
        <a
          className="btn shadow-none d-flex align-items-center bg-primary text-white"
          data-toggle="collapse"
          // href="#navbar-vertical"
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
            <a href="" className="nav-item nav-link border-bottom">
              Shirts
            </a>
            <a href="" className="nav-item nav-link border-bottom">
              Jeans
            </a>
            <a href="" className="nav-item nav-link border-bottom">
              Swimwear
            </a>
            <a href="" className="nav-item nav-link border-bottom">
              Sleepwear
            </a>
            <a href="" className="nav-item nav-link border-bottom">
              Sportswear
            </a>
            <a href="" className="nav-item nav-link border-bottom">
              Jumpsuits
            </a>
            <a href="" className="nav-item nav-link border-bottom">
              Blazers
            </a>
            <a href="" className="nav-item nav-link border-bottom">
              Jackets
            </a>
            <a href="" className="nav-item nav-link border-bottom">
              Shoes
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Category;
