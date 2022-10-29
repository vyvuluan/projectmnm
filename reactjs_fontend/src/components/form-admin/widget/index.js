import React, { useEffect, useState } from "react";
import "./style.css";
import {
  BsFillCalendarWeekFill,
  BsFillChatSquareQuoteFill,
} from "react-icons/bs";
import { BiDollar, BiTask } from "react-icons/bi";
const Widget = (props) => {
  const {data} = props
  // console.log(data);
  const [doanhthu, setDoanhThu] = useState();
  const [chiTieu, setChiTieu] = useState(1);


  useEffect(()=>{
    // console.log(data.doanhthu.tongTien);
    setDoanhThu(data?.doanhthu?.tongTien);
    setChiTieu(data?.chitieu?.tongTien)

  },[])
  
  console.log(doanhthu);
  console.log(chiTieu)
  
  return (
    <>
      <div className="row">
        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs pl-3 font-weight-bold text-primary text-uppercase mb-1">
                    Chi tiêu
                  </div>
                  <div className="h5 pl-3 mb-0 font-weight-bold text-gray-800">
                    {chiTieu}
                  </div>
                </div>
                <div className="col-auto">
                  {/* <i className="fas fa-calendar fa-2x text-gray-300"></i> */}
                  <BsFillCalendarWeekFill
                    className="text-gray-300 pr-2"
                    size={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs pl-3 font-weight-bold text-success text-uppercase mb-1">
                    Doanh thu
                  </div>
                  <div className="h5 mb-0 pl-3 font-weight-bold text-gray-800">

                    {doanhthu}
                  </div>
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
                  <div className="text-xs  pl-3 font-weight-bold text-info text-uppercase mb-1">
                    Tasks
                  </div>
                  <div className="row no-gutters align-items-center">
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
                  </div>
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
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs pl-3 font-weight-bold text-warning text-uppercase mb-1">
                    Pending Requests
                  </div>
                  <div className="h5 mb-0 pl-3 font-weight-bold text-gray-800">
                    18
                  </div>
                </div>
                <div className="col-auto">
                  {/* <i className="fas fa-comments fa-2x text-gray-300"></i> */}
                  <BsFillChatSquareQuoteFill
                    className="text-gray-300 pr-2"
                    size={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Widget;
