import React, { useEffect, useState } from "react";
import Widget from "../widget";
import Chart from "../chart";
import CircelChart from "../circelChart";
import axios from "axios";
import Cookies from "universal-cookie";

const DashBoard = () => {
  const [data, setData] = useState();
  const [dataKho, setDataKho] = useState();
  const [dataNV, setDataNV] = useState();


  const cookies = new Cookies();

  useEffect(() => {
    const controller = new AbortController();
    if(cookies.get('role_id')==2){
      axios
        .get("/api/admin/baocao")
        .then((res) => {
          if (res.data.status === 200) {
            // console.log(res.data);
            setData(res.data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }else if (cookies.get('role_id')==3) {
      axios
        .get("/api/kho/thongKeChiTieuSoLuong")
        .then((res) => {
          if (res.data.status === 200) {
            // console.log(res.data);
            setDataKho(res.data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }else if (cookies.get('role_id')==4) {
      axios
      .get("/api/nhanvien/doanhThuNhanVien")
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          
          setDataNV(res.data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }
    return () => controller.abort();
  }, []);
  // console.log(dataKho);

  // console.log(data);
  return (
    <>
      <Widget dataWidget={data} />
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <Chart data1={data} dataKho={dataKho} dataNV={dataNV}  />
        </div>
        <div className="col-xl-4 col-lg-5">
          <CircelChart data2={data} />
        </div>
      </div>
    </>
  );
};
export default React.memo(DashBoard);
