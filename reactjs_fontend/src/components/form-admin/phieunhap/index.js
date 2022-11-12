import React, { useEffect, useState, useCallback } from "react";
import * as B from "react-bootstrap";
import axios, { Axios } from "axios";
import swal from "sweetalert";
import { BsPersonPlusFill } from "react-icons/bs";

import { AiOutlineFileAdd, AiFillEye } from "react-icons/ai";
import { FiTool } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { BiReset, BiEdit } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import AddPhieuNhap from "./addPhieunhap";
import UpdateCtPN from "./updateCtPn";
import Pagination from "../../form/pagination";
import Ctpn from "./ctpn";
import LichSuNhapHang from "./lichsunhaphang";

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
  const [idProduct, setIdProduct] = useState([]);
  const [idPN, setIdPN] = useState(null);
  const [errorSL, setErrorSL] = useState();
  const [errorSP, setErrorSP] = useState();
  const [errorGia, setErrorGia] = useState();
  const [pnCt, setPnCt] = useState([]);
  const [idShowPn, setIdShowPn] = useState([]);
  const [submitting, setSubmitting] = useState(true);

  const [tongTien, setTongtien] = useState([]);
  const [tongTienPN, setTongtienPN] = useState([]);

  const [status, setStatus] = useState();
  const [check, setCheck] = useState();
  const [dataShowPN, setDataShowPN] = useState([]);
  // const [inc, setInc] = useState();
  // const [dec, setDec] = useState();

  // const [load, setLoad] = useState(true);
  const handleClose = () => setShow((prev) => !prev);
  const handleCloseUpdateCtPN = () => setShowUpdateCtPN((prev) => !prev);
  const handleCloseCtPN = () => setShowCtPN((prev) => !prev);
  const [viewPn, setViewPn] = useState();
  const [tabkey, setTabKey] = useState(1);

  const [show, setShow] = useState(false);
  const [showUpdateCtPN, setShowUpdateCtPN] = useState(false);
  const [showCtPN, setShowCtPN] = useState(false);
  const [showTab, setShowTab] = useState(false);

  const [buttonText, setButtonText] = useState("Chưa thanh toán");

  // const handleClick = () =>  {
  //   setButtonText('Đã thanh toán');
  // }

  const handleView = (item) => {
    // console.log(item);
    setShowTab(true);
    setTabKey(3);
    setViewPn(item);
    setTongtienPN(item.tongTien);
    setIdPN(item.id);
  };

  const test = (value) => {
    console.log(value.product_id);
    var index, index1;
    const d = dataShowPN.filter((item, i) => {
      return item.id === value.pn_id ? (index = i) : null;
    });
    const d1 = dataShowPN[index].pnct.filter((item1, i1) => {
      return item1.product_id == value.product_id ? (index1 = i1) : null;
    });
    // setDataShowPN((prev) => [
    //   ...prev,
    //   (prev[index].pnct[i1] = value),
    // ])
    let newData = [...dataShowPN];
    console.log(index + " " + index1);
    console.log(newData[index].pnct[index1]);
    newData[index].pnct[index1] = value;

    console.log(newData);
    setDataShowPN(newData);
  };

  console.log(dataShowPN);
  const handleCloseTab = () => {
    setShowTab(false);
    setTabKey(2);
  };
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const handlePerPage = (page) => {
    setPage(page);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }

  const CheckStatus = (status) => {
    var x;
    switch (status) {
      case 0: {
        x = (
          <>
            <span className="fw-semibold">Chưa thanh toán</span>
          </>
        );
        break;
      }
      case 1: {
        x = (
          <>
            <span className=" fw-semibold">Đã thanh toán</span>
          </>
        );
        break;
      }
      default: {
        break;
      }
    }
    return x;
  };

  const [showTable, setShowTable] = useState(false);
  const [inputPN, setInputPN] = useState({
    soluong: "",
    gia: "",
  });
  const handleShow = () => {
    setShow(true);
  };
  const [nameProduct, setNameProduct] = useState();
  const [soLuong, setSoLuong] = useState();
  const [gia, setGia] = useState();

  const handleShowUpdateCtPN = (item) => {
    console.log({ tab3: item });

    setIdProduct(item?.product_id);
    setNameProduct(item?.product.tenSP);
    setSoLuong(item?.soluong);
    setGia(item?.gia);
    setShowUpdateCtPN(true);
  };
  const handleShowCtPN = () => {
    setShowCtPN(true);
  };

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
  const handleOnNCClear = () => {
    setNcclist([]);
    // setShowSearchTable(false);
  };
  // console.log(ncclist);
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
    // console.log(value.id);
    setIdProduct(value.id);
  };

  // console.log(dataShowPN);

  const refresh = useCallback(async () => {
    const res = await axios.get(`/api/kho/getAllPN-new?page=${page}`);
    setDataShowPN(res.data.pns.data);
    setTotalPage(res.data.pns.total);
    setPerPage(res.data.pns.per_page);
    setCurrentPage(res.data.pns.current_page);
  }, [page]);

  useEffect(() => {
    refresh().then(() => setSubmitting(false));
  }, [submitting, refresh]);
  const formatResult = (item) => {
    return (
      <div className="result-wrapper">
        <B.Row>
          <B.Col sm={4}>
            <span className="result-span ">
              <img
                src={`http://localhost:8000/uploadhinh/${item.hinh}`}
                style={{ height: "60px" }}
                alt=""
              />
            </span>
          </B.Col>
          <B.Col sm={8}>
            <B.Row>
              <span className="result-span p-0  ms-3">{item.tenSP}</span>
            </B.Row>
            <B.Row>
              <span className="result-span p-0  ms-3">Giá: {item.gia}</span>
              <span className="result-span p-0 ms-3">
                Số lượng: {item.soLuongSP}
              </span>
            </B.Row>
          </B.Col>
        </B.Row>
      </div>
    );
  };

  function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  //thêm pn
  const data1 = {
    ncc_id: nccData,
  };

  const AddPN = () => {
    if (data1.ncc_id !== undefined) {
      axios
        .post(`/api/kho/addPN`, data1)
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
      .post(`/api/kho/addCtPN/${idPN}`, dataCT)
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
            .get(`/api/kho/PN/${idPN}`)
            .then((res) => {
              // console.log(res);

              if (res.data.status === 200) {
                setPnCt(res.data.pn.pnct);
                setTongtien(res.data.pn.tongTien);
                setErrorSL([]);
                setErrorGia([]);
                setErrorSP([]);
              }
            })

            .catch(function (error) {
              // handle error
              console.log(error);
            });
        } else if (res.data.status === 400) {
          console.log(res.data);
          setStatus(res.data.status);
          setErrorSL(res.data.message.soluong);
          setErrorGia(res.data.message.gia);
          setErrorSP(res.data.message.product_id);

          setCheck(res.data.check);
          if (res.data.check == 1) {
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
  const handleDelete = (idPN1, idProduct1) => {
    // console.log(idProduct1);
    // e.preventDefault();
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
            .delete(`/api/kho/deleteCtPN/${idPN1}/${idProduct1}`)
            .then((res) => {
              console.log(res);
              if (res.data.status == 200) {
                setSubmitting(true);

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
        <td className="align-middle text-danger">{errorSP}</td>
        <td className="align-middle text-danger">{errorSL}</td>
        <td className="align-middle text-danger">{errorGia}</td>

        <td className="align-middle fs-5 text-primary"></td>
      </tr>
    </>
  );
  //xem phiếu nhập
  useEffect(() => {
    axios
      .get(`/api/kho/getAllPN-new?page=${page}`)
      .then((res) => {
        if (res.data.status === 200) {
          // console.log(res.data.pns.data);
          setDataShowPN(res.data.pns.data);
          // setIdShowPn(res.data.pns);
          // setTongtienPN(res.data.pns.data.tongTien)
          // setIdPN()
          setTotalPage(res.data.pns.total);
          setPerPage(res.data.pns.per_page);
          setCurrentPage(res.data.pns.current_page);
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
  }, [page]);

  //Sắp xếp theo tổng tiền
  const SortMoney = (e) => {
    // console.log(e);
    // setInc(e)
    if (e == "inc") {
      axios.get(`api/kho/loc-pn-thap-cao?page=${page}`).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          setDataShowPN(res.data.pns.data);
          setTotalPage(res.data.pns.total);
          setPerPage(res.data.pns.per_page);
          setCurrentPage(res.data.pns.current_page);
        }
      });
    } else if (e == "dec") {
      axios.get(`api/kho/loc-pn-cao-thap?page=${page}`).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          setDataShowPN(res.data.pns.data);
          setTotalPage(res.data.pns.total);
          setPerPage(res.data.pns.per_page);
          setCurrentPage(res.data.pns.current_page);
        }
      });
    }
  };
  const handleDeletePN = (id) => {
    // console.log(id);
    // e.preventDefault();
    swal("Chắc chắn xóa", {
      buttons: {
        catch: {
          text: "Chắc",
          value: "catch",
        },
        no: {
          text: "Chưa",
          value: "no",
        },
      },
    }).then((value) => {
      switch (value) {
        case "catch":
          axios
            .delete(`/api/kho/deletePN/${id}`)
            .then((res) => {
              console.log(res);
              if (res.data.status == 200) {
                setSubmitting(true);

                swal({
                  title: res.data.message,
                  icon: "success",
                  button: "đóng",
                });
              } else if (res.status == 200) {
                swal({
                  title: res.data.message,
                  icon: "warning",
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
  //tab 2
  const handleReload = () => {
    const controller = new AbortController();

    axios.get(`api/kho/getAllPN-new?page=${page}`).then((res) => {
      if (res.data.status === 200) {
        setDataShowPN(res.data.pns.data);
        // setIdShowPn(res.data.pns);
        // setTongtienPN(res.data.pns.data.tongTien)
        // setIdPN()
        setTotalPage(res.data.pns.total);
        setPerPage(res.data.pns.per_page);
        setCurrentPage(res.data.pns.current_page);
      }
    });
    return () => {
      controller.abort();
    };
  };
  //tab 1
  const handleReloadCTPN = () => {
    const controller = new AbortController();
    axios
      .get(`api/kho/PN/${idPN}`)
      .then((res) => {
        // console.log(res);

        if (res.data.status === 200) {
          setPnCt(res.data.pn.pnct);
          setTongtien(res.data.pn.tongTien);
          setErrorSL([]);
          setErrorGia([]);
          setErrorSP([]);

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
    return () => {
      controller.abort();
    };
  };

  const dataStatus = {
    status_check: 1,
  };

  const changeStatus = (item) => {
    const id = item.id;
    const controller = new AbortController();
    axios.put(`api/kho/setStatusPn/${id}`, dataStatus).then((res) => {
      // console.log(res);
      if (res.data.status === 200) {
        setSubmitting(true);

        swal({
          title: res.data.message,
          icon: "success",
          button: "đóng",
        });
      }
    });
    return () => {
      controller.abort();
    };
  };
  //Đang sử lý
  // const handleReloadShowCTPNtab3 = useCallback(() => {
  //   const controller = new AbortController();
  //   // console.log("tab3");
  //   axios
  //     .get(`/api/kho/getAllPN-new?page=${page}`)
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         const listData = res.data.pns.data;
  //         console.log(listData[listData.length - 1].pnct);
  //         setDataShowPN(listData);
  //         // setViewPn(listData[listData.length - 1].pnct);
  //         // if (viewPn) {
  //         //   var test = [];
  //         //   viewPn.pnct.map((item) => {
  //         //     listData.filter((e) => e.id == item.id);
  //         //   });
  //         //   setViewPn(test);
  //         // }
  //         // console.log();
  //         // setViewPn(res.data.pns.data)
  //         // handleView(res.data.pns.data[0].pnct)
  //       }
  //     })

  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  //   return () => {
  //     controller.abort();
  //   };
  // });
  // console.log();
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
            soLuong={soLuong}
            gia={gia}
            listProduct={listProduct}
            tenSP={nameProduct}
            handleOnSearchSp={handleOnSearchSp}
            handleOnSelectSp={handleOnSelectSp}
            formatResult={formatResult}
            showModal={handleCloseUpdateCtPN}
            test={test}
            dataShowPN={dataShowPN}
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
                            onClear={handleOnNCClear}
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
                          className="rounded-0  me-1 mb-3 "
                          variant="outline-primary"
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
                      {check == 2 && status == 400 ? checkLoi : null}
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
                          <th style={{ width: "15%" }}>
                            Thao tác
                            <BiReset
                              onClick={handleReloadCTPN}
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="làm mới"
                              className="fs-4 customborder ms-3"
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody className="align-middle">
                        {pnCt.map((item, index) => {
                          // console.log(item);
                          return (
                            <>
                              <tr key={index}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">
                                  {item.product.tenSP}
                                </td>
                                <td className="align-middle">{item.soluong}</td>
                                <td className="align-middle">{formatMoney(item.gia)}</td>

                                <td className="align-middle fs-5 text-primary">
                                  <FiTool
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Sửa chi tiết phiếu nhập"
                                    style={{ marginRight: "15px" }}
                                    onClick={() => handleShowUpdateCtPN(item)}
                                  />
                                  <MdDeleteForever
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Xóa chi tiết phiếu nhập"
                                    onClick={() =>
                                      handleDelete(item.pn_id, item.product_id)
                                    }
                                  />
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </B.Table>
                    <h5 className="text-right mt-2 text-primary">
                      Tổng tiền: {formatMoney(tongTien)}
                    </h5>
                  </B.Form>
                )}
              </B.Tab>

              <B.Tab
                eventKey={2}
                title="Xem danh sách phiếu nhập"
                className=" border border-top-0 py-3 px-3"
              >
                <B.Form style={{ marginBottom: "40px" }}>
                  <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
                    <B.FormSelect
                      className="rounded-0 shadow-none"
                      style={{ width: "200px" }}
                      onChange={(e) => SortMoney(e.target.value)}
                    >
                      <option>Sắp xếp</option>
                      <option value={"inc"}>Tổng tiền tăng dần </option>
                      <option value={"dec"}>Tổng tiền giảm dần </option>
                    </B.FormSelect>

                    <B.Button onClick={handleReload}>làm mới</B.Button>
                  </B.FormGroup>
                  <B.Table className="table-borderless border border-secondary text-center mb-0">
                    <thead
                      className="text-dark"
                      style={{ backgroundColor: "#edf1ff" }}
                    >
                      <tr>
                        <th>STT</th>
                        <th>Tên nhà cung cấp</th>
                        <th>Tổng tiền</th>
                        <th>Ngày tạo</th>
                        <th>Tình trạng</th>

                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      {dataShowPN.map((item, index) => {
                        // let chuoi = item.created_at;
                        // let tachChuoi = chuoi.slice(0, 10);

                        return (
                          <>
                            <tr>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">
                                {item?.ncc?.tenNCC}
                              </td>
                              <td className="align-middle">{item.tongTien}</td>
                              <td className="align-middle">1255252</td>
                              <td className="align-middle">
                                {item.status == 1 ? (
                                  <B.Button
                                    disabled
                                    style={{
                                      backgroundColor: "green",
                                      border: "none",
                                      color: "white",
                                    }}
                                    onClick={() => changeStatus(item)}
                                  >
                                    {CheckStatus(item.status)}
                                  </B.Button>
                                ) : (
                                  <B.Button
                                    style={{
                                      backgroundColor: "red",
                                      border: "none",
                                    }}
                                    onClick={() => changeStatus(item)}
                                  >
                                    {CheckStatus(item.status)}
                                  </B.Button>
                                )}
                              </td>

                              <td className="align-middle fs-5 text-primary">
                                <AiFillEye
                                  type="button"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Xem chi tiết phiếu nhập"
                                  style={{ marginRight: "15px" }}
                                  onClick={() => handleView(item)}
                                />

                                <MdDeleteForever
                                  type="button"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Xóa chi tiết phiếu nhập"
                                  onClick={() => handleDeletePN(item.id)}
                                />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </B.Table>
                </B.Form>
                <Pagination
                  currentPage={currentPage}
                  totalPage={pageNumbers}
                  handlePerPage={handlePerPage}
                />
              </B.Tab>
              {showTab && (
                <B.Tab
                  eventKey={3}
                  title="Xem chi tiết phiếu nhập"
                  className=" border border-top-0 py-3 px-3"
                >
                  <Ctpn
                    tongTienPN={tongTienPN}
                    handleDelete={handleDelete}
                    handleShowUpdateCtPN={handleShowUpdateCtPN}
                    viewPn={viewPn}
                    handleCloseTab={handleCloseTab}

                    // handleReloadShowCTPNtab3={handleReloadShowCTPNtab3}
                  ></Ctpn>
                  {/* <B.Row className="px-xl-3 mb-3">
                    <B.Col lg={8} xs={8}>
                      <h5 className="text-primary mb-3">Chi tiết phiếu nhập</h5>
                    </B.Col>
                    <B.Col lg={4} xs={4} className="text-end">
                      <BiReset
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="làm mới"
                        className="fs-3 customborder"
                        onClick={handleReloadShowCTPNtab3}
                      />

                      <FaTimes
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Đóng"
                        className="fs-3 customborder"
                        onClick={handleCloseTab}
                      />
                    </B.Col>
                  </B.Row>
                  <B.Form>
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
                        {viewPn.pnct.map((item1, index) => {
                          console.log(item1);
                          return (
                            <>
                              <tr key={index}>
                                <td className="align-middle">{index + 1}</td>
                                <td className="align-middle">
                                  {item1.product.tenSP}
                                </td>
                                <td className="align-middle">
                                  {item1.soluong}
                                </td>
                                <td className="align-middle">{item1.gia}</td>

                                <td className="align-middle fs-5 text-primary">
                                  <FiTool
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Sửa chi tiết phiếu nhập"
                                    style={{ marginRight: "15px" }}
                                    onClick={() => handleShowUpdateCtPN(item1)}
                                  />
                                  <MdDeleteForever
                                    type="button"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title="Xóa chi tiết phiếu nhập"
                                    onClick={() =>
                                      handleDelete(
                                        item1.pn_id,
                                        item1.product_id
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </B.Table>
                    <h5 className="text-right mt-2 text-primary">
                      Tổng tiền: {tongTienPN} VNĐ
                    </h5>
                  </B.Form> */}
                </B.Tab>
              )}
              <B.Tab eventKey={4} title="Lịch sử nhập hàng">
                <LichSuNhapHang />
              </B.Tab>
            </B.Tabs>
          </B.Col>
        </B.Row>
      </B.Container>
    </>
  );
};

export default PhieuNhap;
