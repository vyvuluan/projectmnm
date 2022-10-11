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
          style={{ height: "65px", paddingLeft: "10px" }}
        >
          <h5 className="m-0 font-size-30">Categories</h5>
        </a>
        <nav
          className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
          id="navbar-vertical"
        >
          <div
            className="navbar-nav w-100 overflow-hidden"
            style={{ height: "auto" , borderBottom: "1px solid #333"}}
          >
            
            <a href="" className="nav-item nav-link">
              Shirts
            </a>
            <a href="" className="nav-item nav-link">
              Jeans
            </a>
            <a href="" className="nav-item nav-link">
              Swimwear
            </a>
            <a href="" className="nav-item nav-link">
              Sleepwear
            </a>
            <a href="" className="nav-item nav-link">
              Sportswear
            </a>
            <a href="" className="nav-item nav-link">
              Jumpsuits
            </a>
            <a href="" className="nav-item nav-link">
              Blazers
            </a>
            <a href="" className="nav-item nav-link">
              Jackets
            </a>
            <a href="" className="nav-item nav-link">
              Shoes
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Category;
