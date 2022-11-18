import React, { useEffect, useState } from "react";
import "./style.css";
import {
  BsFillCalendarWeekFill,
  BsFillChatSquareQuoteFill,
} from "react-icons/bs";
import Cookies from "universal-cookie";

import { BiDollar, BiTask } from "react-icons/bi";
const Widget = ({ dataWidget }) => {
  // const { dataWidget } = props;
  const [chuaXuLy, setchuaXuLy] = useState(0);
  const [daXuly, setDaXuly] = useState(0);
  // console.log(dataWidget);
  const cookies = new Cookies();
  function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  const [doanhthu, setDoanhThu] = useState();
  const [chiTieu, setChiTieu] = useState();
  const [contact, setContact] = useState();
  const [SLBan, setSLBan] = useState();
  const [tongSLBanNV, setTongSLBanNV] = useState();

  const [tongTienNV, setTongtienNV] = useState();
  const [terms, setTerms] = useState(true);
  if (chiTieu == null) {
    setChiTieu(0);
  }
  if (doanhthu == null) {
    setDoanhThu(0);
  }
  if (contact == null) {
    setContact(0);
  }
  if (SLBan == null) {
    setSLBan(0);
  }

  useEffect(() => {
    if (dataWidget && terms) {
      setTerms(false);
      setDoanhThu(dataWidget?.doanhthu?.tongTien);
      setChiTieu(dataWidget?.chitieu?.tongTien);
      setContact(dataWidget?.contact_count);
      setSLBan(dataWidget?.soluongban.soluongban);
      setTongtienNV(dataWidget?.tongTien?.tongTien);
      setchuaXuLy(dataWidget?.chuaxuly?.chuaxuly);
      setDaXuly(dataWidget?.daxuly?.daxuly);
      setTongSLBanNV(dataWidget?.tongsoluong?.soluongban);
    }
    // console.log(dataWidget?.doanhthu?.tongTien);
  });
  // console.log(doanhthu);
  // console.log(chiTieu)
  // console.log(contact);
  let NV_HTML = (
    <>
      <div className="col border-right">
        <div className="text-xs pl-3 font-weight-bold text-primary text-uppercase mb-1">
          ĐH chưa xử lý
        </div>
        <div className="h5 pl-3 mb-0 font-weight-bold text-gray-800">
          {chuaXuLy}
        </div>
      </div>

      <div className="col ">
        <div className="text-xs pl-3 font-weight-bold text-success text-uppercase mb-1">
          ĐH đã xử lý
        </div>
        <div className="h5 pl-3 mb-0 font-weight-bold text-gray-800">
          {daXuly}
        </div>
      </div>
    </>
  );
  let NV_UI_HTML = (
    <>
      <div className="col border-right">
        <div className="text-xs pl-3 font-weight-bold text-warning text-uppercase mb-1">
          Tin nhắn chưa đọc
        </div>
        <div className="h5 mb-0 pl-3 font-weight-bold text-gray-800">
          {contact}
        </div>
      </div>
      <div className="col ">
        <div className="text-xs pl-3 font-weight-bold text-primary text-uppercase mb-1">
          Tổng đơn đặt hàng
        </div>
        <div className="h5 pl-3 mb-0 font-weight-bold text-gray-800">
          {tongSLBanNV}
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className="row">
        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                {cookies.get("role_id") == 4 ? (
                  NV_HTML
                ) : (
                  <>
                    <div className="col mr-2">
                      <div className="text-xs pl-3 font-weight-bold text-primary text-uppercase mb-1">
                        Chi tiêu
                      </div>
                      <div className="h5 pl-3 mb-0 font-weight-bold text-gray-800">
                        {formatMoney(chiTieu)}
                      </div>
                    </div>
                    <div className="col-auto">
                      {/* <i className="fas fa-calendar fa-2x text-gray-300"></i> */}
                      <BsFillCalendarWeekFill
                        className="text-gray-300 pr-2"
                        size={40}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                {cookies.get("role_id") == 4 ? (
                  NV_UI_HTML
                ) : (
                  <>
                    <div className="col mr-2">
                      <div className="text-xs pl-3 font-weight-bold text-warning text-uppercase mb-1">
                        Tin nhắn chưa đọc
                      </div>
                      <div className="h5 mb-0 pl-3 font-weight-bold text-gray-800">
                        {contact}
                      </div>
                    </div>
                    <div className="col-auto">
                      {/* <i className="fas fa-comments fa-2x text-gray-300"></i> */}
                      <BsFillChatSquareQuoteFill
                        className="text-gray-300 pr-2"
                        size={40}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  {cookies.get("role_id") == 4 ? (
                    <>
                      <div className="text-xs pl-3 font-weight-bold text-success text-uppercase mb-1">
                        tổng tiền nhân viên bán
                      </div>
                      <div className="h5 mb-0 pl-3 font-weight-bold text-gray-800">
                        {formatMoney(tongTienNV)}
                      </div>
                    </>
                  ) : cookies.get("role_id") == 2 ? (
                    <>
                      <div className="text-xs pl-3 font-weight-bold text-success text-uppercase mb-1">
                        Doanh thu
                      </div>
                      <div className="h5 mb-0 pl-3 font-weight-bold text-gray-800">
                        {formatMoney(doanhthu)}
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  <BiDollar className="text-gray-300 pr-2" size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  {cookies.get("role_id") == 4 ? (
                    <>
                      <div className="text-xs  pl-3 font-weight-bold text-info text-uppercase mb-1">
                        tổng đơn hàng nhân viên bán
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xs  pl-3 font-weight-bold text-info text-uppercase mb-1">
                        Tổng số đơn hàng
                      </div>
                    </>
                  )}
                  <div className="h5 mb-0 pl-3 font-weight-bold text-gray-800">
                    {SLBan}
                  </div>
                  {/* <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 pl-4 mb-0 mr-3 font-weight-bold text-gray-800">
                        50%
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="col-auto">
                  {/* <i className="fas fa-clipboard-list fa-2x text-gray-300"></i> */}
                  <BiTask className="text-gray-300 pr-2" size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Pending Requests Card Example --> */}
      </div>
    </>
  );
};
export default Widget;
