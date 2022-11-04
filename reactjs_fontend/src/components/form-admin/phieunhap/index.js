import React, { useEffect, useState } from "react";
import * as B from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { BsPersonPlusFill } from "react-icons/bs";

import { AiOutlineFileAdd } from "react-icons/ai";
import { FiTool } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import AddPhieuNhap from "./addPhieunhap";
import UpdateCtPN from "./updateCtPn";
/*
    xóa tìm kiếm
    chia thành tab giống sản phẩm (1 thêm 2 xem)
    xóa số lượng , giá nhập
    ngày nhập là hiện tại 
    xóa tên phiếu nhập, tên sản phẩm,nhà sản xuất
    nhà cung cấp có tìm kiếm


    table:
    xóa id đổi thành số thứ tự 
     
    cột 2 sản phẩm (cho tìm kiếm sản phẩm)
    3 số lượng 
    4 đơn giá
    thao tác thêm hiển thị dưới phía dưới
    bên phải có tổng tiền

    tab xem ds phiếu nhập



*/
const PhieuNhap = () => {
  const [ncclist, setNcclist] = useState([]);
  const [nccData, setNccData] = useState();
  const [listProduct, setListProduct] = useState([]);
  const [idProduct, setIdProduct] = useState();
  const [idPN, setIdPN] = useState(null);
  const [errorSL, setErrorSL] = useState();

  const [errorGia, setErrorGia] = useState();
  const [pnCt, setPnCt] = useState([]);

  const [tongTien, setTongtien] = useState([]);
  const [status, setStatus] = useState();
  const [check, setCheck] = useState();


  const handleClose = () => setShow((prev) => !prev);
  const handleCloseUpdateCtPN = () => setShowUpdateCtPN((prev) => !prev);

  const [show, setShow] = useState(false);
  const [showUpdateCtPN, setShowUpdateCtPN] = useState(false);

  const [showTable, setShowTable] = useState(false);
  const [inputPN, setInputPN] = useState({
    soluong: "",
    gia: "",
  });
  const handleShow = () => {
    setShow(true);
  };
  const handleShowUpdateCtPN = () => {
    setShowUpdateCtPN(true);
  };

  const [tabkey, setTabKey] = useState(1);
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  //   console.log(typeof(newDate) );
  const handleOnSearch = (key) => {
    axios.get(`http://localhost:8000/api/searchNcc?key=${key}`).then((res) => {
      if (res.data.status === 200) {
        setNcclist(res.data.ncc);
      }
    });
  };

  const handleOnSelect = (value) => {
    // console.log(value);
    setNccData(value.id);
  };

  //search sp
  const handleOnSearchSp = (key) => {
    axios.get(`api/products-search?key=${key}`).then((res) => {
      // console.log(res.status);
      if (res.status === 200) {
        setListProduct(res.data.data);
      }
    });
  };

  const handleOnSelectSp = (value) => {
    // console.log(value);
    setIdProduct(value.id);
  };

  const formatResult = (item) => {
    return (
      <div className="result-wrapper">
        <span className="result-span">
          <img
            src={`http://localhost:8000/uploadhinh/${item.hinh}`}
            style={{ height: "60px" }}
            alt=""
          />
        </span>
        <span className="result-span">{item.tenSP}</span>
      </div>
    );
  };

  //thêm pn
  const data1 = {
    ncc_id: nccData,
  };

  const AddPN = () => {
    if (data1.ncc_id !== undefined) {
      axios
        .post(`api/kho/addPN`, data1)
        .then((res) => {
          // console.log(res);
          if (res.data.status === 200) {
            setIdPN(res.data.pn.id);
            swal({
              title: res.data.message,
              icon: "success",
              button: "đóng",
            });
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      swal({
        title: "Không có nhà cung cấp",
        icon: "warning",
        button: "đóng",
      });
    }
  };
  //add ctpn
  // const data2 = {
  //   ncc_id: idProduct,
  // };
  const handleInput = (e) => {
    e.persist();
    setInputPN({ ...inputPN, [e.target.name]: e.target.value });
  };
  const dataCT = {
    product_id: idProduct,
    soluong: inputPN.soluong,
    gia: inputPN.gia,
  };
  const AddCTPN = () => {
    axios
      .post(`api/kho/addCtPN/${idPN}`, dataCT)
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          swal({
            title: res.data.message,
            icon: "success",
            button: "đóng",
          });
          setShowTable(true);
          axios
            .get(`api/kho/PN/${idPN}`)
            .then((res) => {
              console.log(res);

              if (res.data.status === 200) {
                setPnCt(res.data.pn.pnct);

                setTongtien(res.data.pn.tongTien);
                setErrorSL([])
                setErrorGia([])
                // swal({
                //   title: res.data.message,
                //   icon: "success",
                //   button: "đóng",
                // });
              }
            })

            .catch(function (error) {
              // handle error
              console.log(error);
            });
        } else if (res.data.status === 400) {
          console.log(res.data);
          setStatus(res.data.status)
          setErrorSL(res.data.message.soluong);
          setErrorGia(res.data.message.gia);
          setCheck(res.data.check)
          if(res.data.check == 1){
            swal({
              title: res.data.message,
              icon: "warning",
              button: "đóng",
            });
          }
         
          
          
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  //delete Ctpn
  const handleDelete = (e) => {
    e.preventDefault();
    swal("Chắc chưa", {
      buttons: {
        catch: {
          text: "Chắc",
          value: "catch",
        },
        no: {
          text: "chưa",
          value: "no",
        },
      },
    }).then((value) => {
      switch (value) {
        case "catch":
          axios
            .delete(`api/kho/deleteCtPN/${idPN}/${idProduct}`)
            .then((res) => {
              console.log(res);
              if (res.data.status == 200) {
                swal({
                  title: res.data.message,
                  icon: "success",
                  button: "đóng",
                });
              }
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
          break;
      }
    });
  };
  //xem tất cả phiếu nhập
  var checkLoi = (
    <>
       <tr>
                              
                              <td className="align-middle"></td>
                              <td className="align-middle"></td>
                              <td className="align-middle text-danger">{errorSL}</td>
                              <td className="align-middle text-danger">{errorGia}</td>
                              
                              <td className="align-middle fs-5 text-primary">
                                
                              </td>
                            </tr>
    </>
  )

  
  return (
    <>
      <B.Modal show={show} onHide={handleClose}>
        <B.ModalHeader closeButton className="bg-secondary">
          <B.ModalTitle>Thêm nhà cung cấp</B.ModalTitle>
        </B.ModalHeader>
        <B.ModalBody>
          <AddPhieuNhap showModal={handleClose} />
        </B.ModalBody>
        <B.ModalFooter className="bg-secondary">
          <B.Button
            variant="outline-primary"
            className="mt-2 rounded-0"
            onClick={handleClose}
          >
            Hủy bỏ
          </B.Button>
        </B.ModalFooter>
      </B.Modal>
      <B.Modal show={showUpdateCtPN} onHide={handleCloseUpdateCtPN}>
        <B.ModalHeader closeButton className="bg-secondary">
          <B.ModalTitle>Sửa chi tiết phiếu nhập</B.ModalTitle>
        </B.ModalHeader>
        <B.ModalBody>
          <UpdateCtPN
            idPN={idPN}
            idSP={idProduct}
            showModal={handleCloseUpdateCtPN}
          />
        </B.ModalBody>
        <B.ModalFooter className="bg-secondary">
          <B.Button
            variant="outline-primary"
            className="mt-2 rounded-0"
            onClick={handleCloseUpdateCtPN}
          >
            Hủy bỏ
          </B.Button>
        </B.ModalFooter>
      </B.Modal>
      <B.Container fluid>
        <B.Row className="pe-xl-5 mb-4">
          <B.Col lg={8}>
            <h1 className="fw-bold text-primary mb-4 text-capitalize">
              QUẢN LÝ PHIẾU NHẬP
            </h1>
          </B.Col>
          <B.Col lg={2}></B.Col>
          {/* <B.Col lg={6}>
                        <B.Form>
                            <B.FormGroup>
                                <B.InputGroup>
                                    <B.FormControl
                                        type="text"
                                        placeholder="Tìm kiếm"
                                        className="rounded-0 shadow-none focus-outline-none fw-semibold"
                                    ></B.FormControl>
                                    <B.InputGroup.Text className="bg-transparent text-primary rounded-0">
                                        <FaSearch variant="primary" />
                                    </B.InputGroup.Text>
                                </B.InputGroup>
                            </B.FormGroup>
                            <B.FormGroup className='d-flex d-inline-block justify-content-between mt-2'>
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo id' />
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo NCC' />
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo NSX' />
                            </B.FormGroup>
                        </B.Form>
                    </B.Col> */}
        </B.Row>

        <B.Row className="pe-xl-5 mb-5">
          <B.Col>
            <B.Tabs activeKey={tabkey} onSelect={(k) => setTabKey(k)}>
              <B.Tab
                eventKey={1}
                title="thêm phiếu nhập"
                className=" border border-top-0 py-3 px-3"
              >
                <B.Row>
                  <B.Col sm={2}>
                    <B.FormControl
                      type="text"
                      className="rounded-0 shadow-none mb-3 me-3 "
                      style={{ width: "150px" }}
                      disabled
                      value={idPN == null ? "PN: " : "PN : " + idPN}
                     
                    ></B.FormControl>
                  </B.Col>
                  <B.Col>
                    <B.Form>
                      <B.FormGroup className="d-flex d-inline-block justify-content-between">
                        <div className="w-100 me-2">
                          <ReactSearchAutocomplete
                            placeholder="nhà cung cấp"
                            items={ncclist}
                            onSearch={handleOnSearch}
                            onSelect={handleOnSelect}
                            fuseOptions={{ keys: ["id", "tenNCC"] }}
                            resultStringKeyName="tenNCC"
                            showIcon={false}
                            styling={{
                              height: "36px",
                              border: "1px solid lightgray",
                              borderRadius: "0",
                              backgroundColor: "white",
                              boxShadow: "none",
                              hoverBackgroundColor: "#d19c97",
                              color: "black",
                              fontSize: "15px",
                              // fontFamily: "Courier",
                              iconColor: "black",
                              lineColor: "#d19c97",
                              // placeholderColor: "black",
                              clearIconMargin: "3px 8px 0 0",
                            }}
                          />
                        </div>

                        <B.Button
                          onClick={() => handleShow()}
                          className="rounded-0 shadow-none me-1 mb-3 text-muted  "
                        >
                          Thêm
                        </B.Button>
                      </B.FormGroup>
                    </B.Form>
                  </B.Col>
                  <B.Col>
                    <B.FormGroup>
                      <B.FormControl
                        type="text"
                        className="rounded-0 shadow-none mb-3"
                        placeholder={dateTime}
                        disabled
                      ></B.FormControl>
                    </B.FormGroup>
                  </B.Col>
                  <B.Col>
                    <B.Button
                      variant="outline-primary"
                      className="rounded-0  mb-2"
                      onClick={AddPN}
                    >
                      <BsPersonPlusFill className="me-2" />
                      Thêm phiếu nhập
                    </B.Button>
                  </B.Col>
                </B.Row>
                <B.Form>
                  <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2"></B.FormGroup>
                  <h4 className="text-primary mb-3">
                    Thêm chi tiết phiếu nhập
                  </h4>
                  <B.Table className="table-borderless border border-secondary text-center mb-0">
                    <thead
                      className="text-dark"
                      style={{ backgroundColor: "#edf1ff" }}
                    >
                      <tr>
                        {/* <th>
                        <input type="checkbox" />
                      </th> */}
                        <th className="border-end">STT</th>
                        <th className="border-end " style={{ width: "20rem" }}>
                          Sản phẩm
                        </th>
                        <th className="border-end">Số lượng</th>
                        <th className="border-end">Đơn giá</th>

                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      <tr>
                        {/* <td className="align-middle">
                        <input type="checkbox" />
                      </td> */}
                        <td className="align-middle">1</td>
                        <td className="align-middle">
                          <div className="w-100 me-2">
                            <ReactSearchAutocomplete
                              placeholder="sản phẩm"
                              items={listProduct}
                              onSearch={handleOnSearchSp}
                              onSelect={handleOnSelectSp}
                              fuseOptions={{ keys: ["id", "tenSP"] }}
                              resultStringKeyName="tenSP"
                              formatResult={formatResult}
                              showIcon={false}
                              styling={{
                                height: "36px",
                                border: "1px solid lightgray",
                                borderRadius: "0",
                                backgroundColor: "white",
                                boxShadow: "none",
                                hoverBackgroundColor: "#d19c97",
                                color: "black",
                                fontSize: "15px",
                                // fontFamily: "Courier",
                                iconColor: "black",
                                lineColor: "#d19c97",
                                // placeholderColor: "black",
                                clearIconMargin: "3px 8px 0 0",
                              }}
                            />
                          </div>
                        </td>
                        <td className="align-middle">
                          <B.FormControl
                            type="text"
                            name="soluong"
                            className="rounded-0 shadow-none "
                            required
                            onChange={handleInput}
                            value={inputPN.soluong}
                            // placeholder={errorSL}
                          ></B.FormControl>
                          {/* <span className="text-danger">{errorSL}</span> */}

                        </td>
                       
                        <td className="align-middle">
                          <B.FormControl
                            name="gia"
                            type="text"
                            className="rounded-0 shadow-none "
                            required
                            onChange={handleInput}
                            value={inputPN.gia}
                            // placeholder={errorGia}
                          ></B.FormControl>
                          {/* <span className="text-danger">{errorGia}</span> */}
                        </td>

                        <td
                          onClick={AddCTPN}
                          className="align-middle fs-5 text-primary"
                          style={{ cursor: "pointer" }}
                        >
                          <AiOutlineFileAdd
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Thêm phiếu nhập"
                          />
                        </td>
                      </tr>
                            { check==2  &&  status==400 ? checkLoi : null }

                               
                            

                                
                            
                              
                            

                      {/* <tr>
                      <td className="align-middle">
                        <input type="checkbox" />
                      </td>
                      <td className="align-middle">2</td>
                      <td className="align-middle">
                        Nhập 50 laptop ASUS đợt 2
                      </td>
                      <td className="align-middle">Laptop ASUS ROG G14</td>
                      <td className="align-middle">GearVN/ASUS</td>
                      <td className="align-middle">50</td>
                      <td className="align-middle">3,500,000,000</td>
                      <td className="align-middle">7/12/2021</td>
                      <td className="align-middle fs-5 text-primary">
                        <BiEdit />
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <input type="checkbox" />
                      </td>
                      <td className="align-middle">3</td>
                      <td className="align-middle">Nhập 10 laptop Lenovo</td>
                      <td className="align-middle">Laptop Lenovo Legion</td>
                      <td className="align-middle">StarComP/Lenovo</td>
                      <td className="align-middle">10</td>
                      <td className="align-middle">300,000,000</td>
                      <td className="align-middle">2/2/2022</td>
                      <td className="align-middle fs-5 text-primary">
                        <BiEdit />
                      </td>
                    </tr> */}
                    </tbody>
                  </B.Table>
                </B.Form>
                {/* xem chi tiết phiếu nhập  */}
                {showTable && (
                  <B.Form>
                    <h4 className="text-primary mb-3">Chi tiết phiếu nhập</h4>

                    <B.Table className=" text-right table-borderless border border-secondary text-center mb-0">
                      <thead
                        className="text-dark"
                        style={{ backgroundColor: "#edf1ff" }}
                      >
                        <tr>
                          <th>STT</th>
                          <th>Tên sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Giá</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="align-middle">
                        {pnCt.map((item, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">
                                  {item.product.tenSP}
                                </td>
                                <td className="align-middle">{item.soluong}</td>
                                <td className="align-middle">{item.gia}</td>

                                <td className="align-middle fs-5 text-primary">
                                  <FiTool
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Sửa chi tiết phiếu nhập"
                                    style={{ marginRight: "15px" }}
                                    onClick={() => handleShowUpdateCtPN()}
                                  />
                                  <MdDeleteForever
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Xóa chi tiết phiếu nhập"
                                    onClick={handleDelete}
                                  />
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </B.Table>
                    <h5 className="text-right mt-2 text-primary">
                      Tổng tiền: {tongTien} VNĐ
                    </h5>
                  </B.Form>
                )}
              </B.Tab>

              <B.Tab
                eventKey={2}
                title="Xem danh sách phiếu nhập"
                className=" border border-top-0 py-3 px-3"
              >
                <B.Form>
                  <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
                    <B.FormSelect
                      className="rounded-0 shadow-none"
                      style={{ width: "200px" }}
                    >
                      <option>Sắp xếp</option>
                      <option>Từ A-Z</option>
                      <option>Theo ID</option>
                      <option>Theo NCC</option>
                      <option>Theo NSX</option>
                      <option>Theo ngày nhập</option>
                    </B.FormSelect>
                  </B.FormGroup>
                  <B.Table className="table-borderless border border-secondary text-center mb-0">
                    <thead
                      className="text-dark"
                      style={{ backgroundColor: "#edf1ff" }}
                    >
                      <tr>
                        <th>
                          <input type="checkbox" />
                        </th>
                        <th>ID</th>
                        <th>Tên phiếu nhập</th>
                        <th>Tên sản phẩm</th>
                        <th>NCC/NSX</th>
                        <th>Số lượng</th>
                        <th>Giá nhập</th>
                        <th>Ngày nhập</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      <tr>
                        <td className="align-middle">
                          <input type="checkbox" />
                        </td>
                        <td className="align-middle">1</td>
                        <td className="align-middle">
                          Nhập 50 laptop ASUS đợt 1
                        </td>
                        <td className="align-middle">Laptop ASUS TUF A15</td>
                        <td className="align-middle">GearVN/ASUS</td>
                        <td className="align-middle">50</td>
                        <td className="align-middle">2,500,000,000</td>
                        <td className="align-middle">20/8/2021</td>
                        <td className="align-middle fs-5 text-primary">
                          {/* <BiEdit /> */}
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">
                          <input type="checkbox" />
                        </td>
                        <td className="align-middle">2</td>
                        <td className="align-middle">
                          Nhập 50 laptop ASUS đợt 2
                        </td>
                        <td className="align-middle">Laptop ASUS ROG G14</td>
                        <td className="align-middle">GearVN/ASUS</td>
                        <td className="align-middle">50</td>
                        <td className="align-middle">3,500,000,000</td>
                        <td className="align-middle">7/12/2021</td>
                        <td className="align-middle fs-5 text-primary">
                          {/* <BiEdit /> */}
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">
                          <input type="checkbox" />
                        </td>
                        <td className="align-middle">3</td>
                        <td className="align-middle">Nhập 10 laptop Lenovo</td>
                        <td className="align-middle">Laptop Lenovo Legion</td>
                        <td className="align-middle">StarComP/Lenovo</td>
                        <td className="align-middle">10</td>
                        <td className="align-middle">300,000,000</td>
                        <td className="align-middle">2/2/2022</td>
                        <td className="align-middle fs-5 text-primary">
                          {/* <BiEdit /> */}
                        </td>
                      </tr>
                    </tbody>
                  </B.Table>
                </B.Form>
              </B.Tab>
            </B.Tabs>
          </B.Col>
        </B.Row>
        {/* table hien thi tai khoan */}
        {/* <B.Row className="pe-xl-5">
          <B.Col lg className="d-grd gap-2 mx-auto table-responsive mb-5">
            <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
              <B.FormSelect
                className="rounded-0 shadow-none"
                style={{ width: "200px" }}
              >
                <option>Sắp xếp</option>
                <option>Từ A-Z</option>
                <option>Theo ID</option>
                <option>Theo NCC</option>
                <option>Theo NSX</option>
                <option>Theo ngày nhập</option>
              </B.FormSelect>
            </B.FormGroup>
            <B.Table className="table-borderless border border-secondary text-center mb-0">
              <thead
                className="text-dark"
                style={{ backgroundColor: "#edf1ff" }}
              >
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>ID</th>
                  <th>Tên phiếu nhập</th>
                  <th>Tên sản phẩm</th>
                  <th>NCC/NSX</th>
                  <th>Số lượng</th>
                  <th>Giá nhập</th>
                  <th>Ngày nhập</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                <tr>
                  <td className="align-middle">
                    <input type="checkbox" />
                  </td>
                  <td className="align-middle">1</td>
                  <td className="align-middle">Nhập 50 laptop ASUS đợt 1</td>
                  <td className="align-middle">Laptop ASUS TUF A15</td>
                  <td className="align-middle">GearVN/ASUS</td>
                  <td className="align-middle">50</td>
                  <td className="align-middle">2,500,000,000</td>
                  <td className="align-middle">20/8/2021</td>
                  <td className="align-middle fs-5 text-primary">
                    <BiEdit />
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">
                    <input type="checkbox" />
                  </td>
                  <td className="align-middle">2</td>
                  <td className="align-middle">Nhập 50 laptop ASUS đợt 2</td>
                  <td className="align-middle">Laptop ASUS ROG G14</td>
                  <td className="align-middle">GearVN/ASUS</td>
                  <td className="align-middle">50</td>
                  <td className="align-middle">3,500,000,000</td>
                  <td className="align-middle">7/12/2021</td>
                  <td className="align-middle fs-5 text-primary">
                    <BiEdit />
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">
                    <input type="checkbox" />
                  </td>
                  <td className="align-middle">3</td>
                  <td className="align-middle">Nhập 10 laptop Lenovo</td>
                  <td className="align-middle">Laptop Lenovo Legion</td>
                  <td className="align-middle">StarComP/Lenovo</td>
                  <td className="align-middle">10</td>
                  <td className="align-middle">300,000,000</td>
                  <td className="align-middle">2/2/2022</td>
                  <td className="align-middle fs-5 text-primary">
                    <BiEdit />
                  </td>
                </tr>
              </tbody>
            </B.Table>
          </B.Col>
        </B.Row> */}
      </B.Container>
    </>
  );
};

export default PhieuNhap;
