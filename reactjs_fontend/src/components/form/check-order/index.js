import React from "react";
import "./style.css";
import OrderDetail from "../order-detail";  
import { Link } from "react-router-dom";
const CheckOrder = () => {
  
  return (
    <>
      <div className="container padding-bottom-3x mb-5 mt-5">
        <form action="">
          <div className="card mb-3">
            <div className="p-4 text-center text-white text-lg bg-primary">
              <span className="text-uppercase">Đơn hàng số - </span>
              <span className="text-medium">001698653lp</span>
            </div>
            <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
              <div className="w-100 text-center py-1 px-2">
                <span className="text-medium">Vận chuyển qua: </span> Grapp
              </div>
              <div className="w-100 text-center py-1 px-2">
                <span className="text-medium">Tình Trạng: </span> Kiểm tra chất
                lượng
              </div>
              <div className="w-100 text-center py-1 px-2">
                <span className="text-medium">Ngày dự kiến: </span> APR 27, 2021
              </div>
            </div>

            <div className="card-body">
              <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                <div className="step completed">
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="pe-7s-cart"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Đơn hàng chờ xác nhận</h4>
                </div>
                <div className="step completed">
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="pe-7s-config"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Đơn hàng đã xác nhận</h4>
                </div>
                <div className="step completed">
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="pe-7s-medal"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Đang được vận chuyển</h4>
                </div>
                <div className="step">
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="pe-7s-car"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Đã thanh toán</h4>
                </div>
                <div className="step">
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="pe-7s-home"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Sản phẩm đã được giao</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
            <div className="custom-control custom-checkbox mr-3">
              {/* <input
                className="custom-control-input"
                type="checkbox"
                id="notify_me"
              />
              <label className="custom-control-label" htmlFor="notify_me">
                Thông báo cho tôi khi đơn hàng được giao
              </label> */}
            </div>
            <div className="text-left text-sm-right">
              <Link className="btn btn-outline-primary btn-rounded btn-sm " to={`/OrderDetail`}>
                Xem chi tiết đơn hàng
              </Link>

            </div>
          </div>
        </form>
      </div>
      {/* chi tiết đơn hàng */}
    </>
  );
};
export default CheckOrder;
