import React, { useEffect } from "react";
import { VscCommentDiscussion } from "react-icons/vsc";
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
  function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-4 pb-3">
          {item.map((item, index) => {
            for (let i = 0; i <= index; i++) {
              return (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-6 col-sm-12 pb-1 "
                >
                  <div className="card product-item border-0 mb-4">
                    <Link
                      className="text-decoration-none text-black"
                      to={`/DetailProduct/${item.id}`}
                    >
                      <div className=" product-img position-relative overflow-hidden bg-transparent  p-0">
                        <img
                          className="img-fluid w-100 hoverCSS "
                          src={`http://localhost:8000/uploadhinh/${item.hinh}`}
                          alt="img product"
                        ></img>
                      </div>
                      <div className="text-center   p-0 pt-4 pb-3 ">
                        <h6 className="mb-3 hovertext ">{item.tenSP}</h6>
                        <div className="d-flex justify-content-center">
                          <h6 className="text-danger">
                            {formatMoney(item.gia)}
                          </h6>
                        </div>
                        <div ><VscCommentDiscussion/><span className="ms-2">Bình luận (100)</span></div>
                      </div>
                    </Link>
                    {/* <div className="card-footer d-flex text-center bg-light border">
                      <div className="w-100"> */}
                    {/* <AiFillEye className="me-1 mb-1"></AiFillEye> */}

                    {/* <button className="btn1 btn21 btn-sep1 icon-cart rounded">
                          <div className="text2">Mua ngay</div>
                        </button> */}

                    {/* <span>Xem chi tiết</span> */}
                    {/* </div> */}
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
                    {/* </div> */}
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
