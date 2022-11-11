import React, { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { Link, useSearchParams, useParams } from "react-router-dom";
import Pagination from "../pagination";
import axios from "axios";
import "./styles.css";
const Product = (props) => {
  const { item } = props;
  // const id = useParams();

  // const handleFindId = (id) => {
  //   // console.log(axios.get('/api/loaisp/view').then((res) => res.data.Loaisp));
  //   const arrayID = axios.get('/api/loaisp/view').then((res) => res.data.Loaisp)
  //   arrayID.find(e=>e.id == id)
  //   // console.log(typeof array D);
  // }

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-4 pb-3">
          {item.map((item, index) => {
            for (let i = 0; i <= index; i++) {
              return (
                <div key={item.id} className="col-lg-3 col-md-6 col-sm-12 pb-1 hoverCSS">
                  <div className="card product-item border-0 mb-4">
                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                      <img
                        className="img-fluid w-100"
                        src={`http://localhost:8000/uploadhinh/${item.hinh}`}
                        alt="img product"
                      ></img>
                    </div>
                    <div className="text-center border-end border-start p-0 pt-4 pb-3 ">
                      <h6 className="mb-3">{item.tenSP}</h6>
                      <div className="d-flex justify-content-center">
                        <h6>{item.gia}</h6>
                        <h6 className="text-muted ms-2">
                          <del>{item.gia}</del>
                        </h6>
                      </div>
                    </div>
                    <div className="card-footer d-flex text-center bg-light border">
                      <div className="m-auto">
                        {/* <AiFillEye className="me-1 mb-1"></AiFillEye> */}

                        <Link
                          className="text-decoration-none"
                          to={`/DetailProduct/${item.id}`}
                        >
                          <button className="btn1 btn21 btn-sep1 icon-cart rounded">
                            <div className="text2">Mua ngay</div>
                          </button>

                          {/* <span>Xem chi tiết</span> */}
                        </Link>
                      </div>
                      {/* <div className="text-center">
                        <a
                          href=""
                          className="text-decoration-none text-dark p-1"
                        >
                          <BsFillCartFill className="me-1 mb-1"></BsFillCartFill>
                          <span>
                            <Link className="text-decoration-none">
                              Thêm vào giỏ
                            </Link>
                          </span>
                        </a>
                      </div> */}
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
