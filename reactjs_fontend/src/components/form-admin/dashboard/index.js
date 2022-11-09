import React, { useEffect, useState } from "react";
import Widget from "../widget";
import Chart from "../chart";
import CircelChart from "../circelChart";
import axios from "axios";
import Cookies from "universal-cookie";
import * as Bt from "react-bootstrap";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
const DashBoard = () => {
  const [data, setData] = useState();
  const [tabkey, setTabKey] = useState(1);
  const [dataKho, setDataKho] = useState();
  const [dataKho2, setDataKho2] = useState();
  const [dataNV, setDataNV] = useState();
  const [dataSPganhet, setDataSPganhet] = useState([]);

  const cookies = new Cookies();

  useEffect(() => {
    const controller = new AbortController();
    if (cookies.get("role_id") == 2) {
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
    } else if (cookies.get("role_id") == 3) {
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
      axios
        .get("/api/kho/thongKeDoanhThuSoLuong")
        .then((res) => {
          if (res.data.status === 200) {
            // console.log(res.data);
            setDataKho2(res.data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else if (cookies.get("role_id") == 4) {
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

  //sản phẩm gần hết

  useEffect(() => {
    axios
      .get("/api/kho/spGanHet")
      .then((res) => {
        // console.log(res.data.product.data);
        if (res.data.status === 200) {
          setDataSPganhet(res.data.product.data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  var UIkho = (
    <>
      {/* <Widget dataWidget={data} /> */}

      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-xl-10 col-lg-7">
          <Tabs
            activeKey={tabkey}
            onSelect={(k) => setTabKey(k)}
          
          >
            <Tab eventKey={1} title="Thống kê">
              <Chart dataKho={dataKho} dataKho2={dataKho2} />
            </Tab>
            
            <Tab eventKey={3} title="Sản phẩm gần hết">
              <h2>Sản phẩm gần hết</h2>
              <Table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm </th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSPganhet.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.tenSP}</td>
                          <td className="text-danger">{item.soLuongSP}</td>
                          <td>{item.gia}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            
          </Tabs>
        </div>
      </div>
    </>
  );
  var UINV = (
    <>
      <Widget dataWidget={data} />
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <Chart dataNV={dataNV} />
        </div>
        <div className="col-xl-4 col-lg-5">
          <CircelChart data2={data} />
        </div>
      </div>
    </>
  );
  var UIAdmin = (
    <>
      <Widget dataWidget={data} />
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <Chart data1={data} />
        </div>
        <div className="col-xl-4 col-lg-5">
          <CircelChart data2={data} />
        </div>
      </div>
    </>
  );
  // console.log(data);
  return (
    <>
      {cookies.get("role_id") == 3
        ? UIkho
        : cookies.get("role_id") == 4
          ? UINV
          : cookies.get("role_id") == 2
            ? UIAdmin
            : null}
      {/* <Widget dataWidget={data} />
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <Chart data1={data} dataKho={dataKho} dataNV={dataNV}  />
        </div>
        <div className="col-xl-4 col-lg-5">
          <CircelChart data2={data} />
        </div>
      </div> */}
    </>
  );
};
export default React.memo(DashBoard);
