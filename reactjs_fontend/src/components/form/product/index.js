import React from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import Pagination from "../pagination";
const Product = (props) => {
  const {item} = props;
  
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {item.map((item, index) => {
            //console.log(index);
            for (let i = 0; i <= index; i++) {
              return (
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                  <div className="card product-item border-0 mb-4">
                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                      <img
                        className="img-fluid w-100"
                        src={item.image}
                        alt="img product"
                      ></img>
                    </div>
                    <div className="text-center border-end border-start p-0 pt-4 pb-3 ">
                      <h6 className="mb-3">{item.name}</h6>
                      <div className="d-flex justify-content-center">
                        <h6>{item.price}</h6>
                        <h6 className="text-muted ms-2">
                          <del>{item.price}</del>
                        </h6>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                      <div className="text-center">
                        <a
                          href=""
                          className="text-decoration-none text-dark p-1"
                        >
                          <AiFillEye className="me-1 mb-1"></AiFillEye>
                          <span>Xem chi tiết</span>
                        </a>
                      </div>
                      <div className="text-center">
                        <a
                          href=""
                          className="text-decoration-none text-dark p-1"
                        >
                          <BsFillCartFill className="me-1 mb-1"></BsFillCartFill>
                          <span>Thêm vào giỏ</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          
         
        </div>
      </div>
    </>
  );
};

export default Product;
