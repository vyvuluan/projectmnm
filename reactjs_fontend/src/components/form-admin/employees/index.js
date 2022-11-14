import React, { useEffect, useState, useCallback } from "react";
import * as B from "react-bootstrap";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaUserEdit, FaSearch } from "react-icons/fa";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { BsPersonPlus } from "react-icons/bs";
import swal from "sweetalert";
import { MdDeleteForever } from "react-icons/md";

import axios from "axios";
import Pagination from "../../form/pagination";
import UpdateNV from "./updateNV";
import CreateAccNV from "./createAccNV";
import LoadingPage from "../../layouts/Loading";
const Employees = () => {
  const [submitting, setSubmitting] = useState(true);

  const [user, setUser] = useState([]);
  const [username, setUsername] = useState();
  const [valueGT, setValueGT] = useState();
  const [valueCV, setValueCV] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [show, setShow] = useState(false);
  const [showCreateAcc, setShowCreateAcc] = useState(false);
  const [createAcc, setCreateAcc] = useState();
  const [listNV, setListNV] = useState([]);
  const [NVData, setNVData] = useState();
  const [viewSearchNV, setViewSearchNV] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow((prev) => !prev);
  const handleCloseCreateAcc = () => setShowCreateAcc((prev) => !prev);

  const handleShow = (item) => {
    setUsername(item);
    setShow(true);
  };
  const handleShowCreate = (item) => {
    // setUsername(item)
    setCreateAcc(item);
    setShowCreateAcc(true);
  };
  const handlePerPage = (page) => {
    // console.log(page);
    setPage(page);
  };
  const handleChangeGT = (e) => {
    // console.log(e.target.value);
    setValueGT(e.target.value);
  };
  const handleChangeCV = (e) => {
    // console.log(e.target.value);
    setValueCV(e.target.value);
  };
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }

  const [addNV, setAddNV] = useState({
    ten: "",
    sdt: "",
    ngaySinh: "",
    diaChi: "",
    gioiTinh: "",
    cv_id: "",
  });
  // const [showPass, setShowPass] = useState(false);

  // const handleClosePass = () => setShowPass((prev) => !prev);

  // const handleShowChangePass = () => {
  //   setShowPass(true);
  // };

  const handleInput = (e) => {
    e.persist();

    setAddNV({ ...addNV, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // const controller = new AbortController();

    axios
      .get(`/api/admin/manageEmployee?page=${page}`)
      .then((res) => {
        // console.log(res);
        setUser(res.data.emloyee.data);
        setTotalPage(res.data.emloyee.total);
        setPerPage(res.data.emloyee.per_page);
        setCurrentPage(res.data.emloyee.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    // return () => controller.abort();
  }, [page]);

  const handleThemNV = (e) => {
    e.preventDefault();
    const data = {
      ten: addNV.ten,
      sdt: addNV.sdt,
      ngaySinh: addNV.ngaySinh,
      diaChi: addNV.diaChi,
      gioiTinh: valueGT,
      cv_id: valueCV,
    };
    axios
      .post("/api/admin/manageEmployee", data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status == 200) {
          swal("Success", res.data.message, "success");
          setSubmitting(true);
        }
        if (res.data.status == 400) {
          swal("Warning", res.data.message, "error");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        swal("Warning", "vui lòng kiểm tra lại thông tin vừa nhập ", "warning");
      });
  };
  const handleDeleteNV = (id) => {
    // console.log(id);
    // e.preventDefault();
    Swal.fire({
      title: "Xóa?",
      text: "Bạn có muốn thực hiện thao tác này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Chấp nhận",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/manageEmployee/${id}`)
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
      }
    });
    // swal("Chắc chắn xóa", {
    //   buttons: {
    //     catch: {
    //       text: "Chắc",
    //       value: "catch",
    //     },
    //     no: {
    //       text: "Chưa",
    //       value: "no",
    //     },
    //   },
    // }).then((value) => {
    //   switch (value) {
    //     case "catch":
    //       axios
    //         .delete(`/api/admin/manageEmployee/${id}`)
    //         .then((res) => {
    //           console.log(res);
    //           if (res.data.status == 200) {
    //             setSubmitting(true);

    //             swal({
    //               title: res.data.message,
    //               icon: "success",
    //               button: "đóng",
    //             });
    //           } else if (res.status == 200) {
    //             swal({
    //               title: res.data.message,
    //               icon: "warning",
    //               button: "đóng",
    //             });
    //           }
    //         })
    //         .catch(function (error) {
    //           // handle error
    //           console.log(error);
    //         });
    //       break;
    //   }
    // });
  };
  const handleOnSearch = (key) => {
    axios.get(`/api/admin/manageEmployee?key=${key}`).then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.emloyee);
        setListNV(res.data.emloyee.data);
      }
    });
  };
  var array = [];
  const handleOnSelect = (value) => {
    array = [value];
    setViewSearchNV(value);
    setUser(array);
    setNVData(value.id);
  };
  const formatResult = (item) => {
    return (
      <div className="result-wrapper">
        <B.Row>
          <B.Col>
            <span className="result-span p-0  ms-3">Họ tên: {item.ten}</span>
          </B.Col>
          <B.Col>
            <span className="result-span p-0  ms-3">Sđt: {item.sdt}</span>
          </B.Col>
          <B.Col>
            <span className="result-span p-0 ms-3">Địa chỉ: {item.diaChi}</span>
          </B.Col>
        </B.Row>
      </div>
    );
  };
  const handleOnNVclear = () => {
    setSubmitting(true);
  };
  const refreshNV = useCallback(async () => {
    const res = await axios.get(`/api/admin/manageEmployee?page=${page}`);
    setUser(res.data.emloyee.data);
    setTotalPage(res.data.emloyee.total);
    setPerPage(res.data.emloyee.per_page);
    setCurrentPage(res.data.emloyee.current_page);
  }, [page]);
  useEffect(() => {
    refreshNV().then(() => setSubmitting(false));
  }, [submitting, refreshNV]);

  const handleChange = (event) => {
    // console.log(event.target.value);

    if (event.target.value == 1) {
      axios
        .get("/api/locTenNvAZ")
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            setUser(res.data.emp.data);
            setTotalPage(res.data.emp.total);
            setPerPage(res.data.emp.per_page);
            setCurrentPage(res.data.emp.current_page);

            // swal("Success", res.data.message, "success");
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          // swal("Warning", "vui lòng kiểm tra lại thông tin vừa nhập ", "warning");
        });
    } else if (event.target.value == 2) {
      axios
        .get("/api/locTenNvZA")
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            setUser(res.data.emp.data);
            setTotalPage(res.data.emp.total);
            setPerPage(res.data.emp.per_page);
            setCurrentPage(res.data.emp.current_page);

            // swal("Success", res.data.message, "success");
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          // swal("Warning", "vui lòng kiểm tra lại thông tin vừa nhập ", "warning");
        });
    }
  };

  var employee_HTML = "";
  if (user.length > 0) {
    employee_HTML = (
      <>
        {user &&
          user.map((item, index) => {
            // console.log(item);
            // if (user_id == null) {
            // }
            return (
              <tr key={item.id}>
                <td className="align-middle">{item.id}</td>
                <td className="align-middle">{item.ten}</td>
                {/* <td className="align-middle">{item.email}</td> */}
                <td className="align-middle">
                  {item.gioiTinh == 1 ? "Nam" : "Nữ"}
                </td>
                <td
                  className="align-middle"
                  style={{ wordBreak: "break-word", width: "400px" }}
                >
                  {item.diaChi}
                </td>
                <td className="align-middle">{item.sdt}</td>

                <td className="fs-5 text-primary text-left  ">
                  <BiEdit onClick={() => handleShow(item)} />
                  <MdDeleteForever
                    className="ms-3"
                    onClick={() => handleDeleteNV(item.id)}
                  />
                  {item.user_id == null ? (
                    <BsPersonPlus
                      onClick={() => handleShowCreate(item)}
                      className="ms-3"
                    />
                  ) : null}
                </td>
              </tr>
            );
          })}
      </>
    );
  }

  return (
    <>
      <B.Modal show={show} onHide={handleClose}>
        <B.ModalHeader closeButton className="bg-secondary">
          <B.ModalTitle>Cập nhật nhân viên</B.ModalTitle>
        </B.ModalHeader>
        <B.ModalBody>
          <UpdateNV
            username={username}
            showModal={handleClose}
            setSubmitting={setSubmitting}
          />
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
      <B.Modal show={showCreateAcc} onHide={handleCloseCreateAcc}>
        <B.ModalHeader closeButton className="bg-secondary">
          <B.ModalTitle>Tạo tài khoản nhân viên</B.ModalTitle>
        </B.ModalHeader>
        <B.ModalBody>
          <CreateAccNV createAcc={createAcc} showModal={handleCloseCreateAcc} />
        </B.ModalBody>
        <B.ModalFooter className="bg-secondary">
          <B.Button
            variant="outline-primary"
            className="mt-2 rounded-0"
            onClick={handleCloseCreateAcc}
          >
            Hủy bỏ
          </B.Button>
        </B.ModalFooter>
      </B.Modal>
      <B.Container fluid>
        <B.Row className="pe-xl-5 mb-4">
          <B.Col lg={5}>
            <h1 className="fw-bold text-primary mb-4 text-capitalize">
              QUẢN LÝ NHÂN VIÊN
            </h1>
          </B.Col>
          <B.Col lg={1}></B.Col>
          <B.Col lg={6}>
            <B.Form>
              <B.FormGroup>
                <div
                  className="w-100 me-2 "
                  style={{ position: "relative", zIndex: "3" }}
                >
                  <ReactSearchAutocomplete
                    placeholder="Tìm kiếm nhân viên"
                    items={listNV}
                    onSearch={handleOnSearch}
                    onClear={handleOnNVclear}
                    onSelect={handleOnSelect}
                    fuseOptions={{ keys: ["id", "ten"] }}
                    resultStringKeyName="ten"
                    // showIcon={false}
                    formatResult={formatResult}
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
              </B.FormGroup>
            </B.Form>
          </B.Col>
        </B.Row>

        <B.Form className="mt-2" onSubmit={handleThemNV}>
          <B.Row className="pe-xl-5 mb-5">
            <B.Col lg={6}>
              <B.FormGroup>
                <B.FormControl
                  type="text"
                  name="ten"
                  className="rounded-0 shadow-none mb-3"
                  placeholder="Họ và tên nhân viên"
                  onChange={handleInput}
                  value={addNV.ten}
                  required
                ></B.FormControl>
              </B.FormGroup>
              <B.Row>
                <B.Col>
                  <B.FormGroup>
                    <B.FormSelect
                      name="gioiTinh"
                      // value={addNV.gioiTinh}
                      onChange={handleChangeGT}
                      className="rounded-0 shadow-none mb-3 text-muted"
                      required
                    >
                      <option selected disabled>
                        Giới tính
                      </option>
                      <option value={1}>Nam</option>
                      <option value={0}>Nữ</option>
                    </B.FormSelect>
                  </B.FormGroup>
                </B.Col>
                <B.Col>
                  <B.FormGroup>
                    <B.FormControl
                      type="date"
                      name="ngaySinh"
                      className="rounded-0 shadow-none mb-3"
                      onChange={handleInput}
                      value={addNV.ngaySinh}
                      required
                    ></B.FormControl>
                  </B.FormGroup>
                </B.Col>
              </B.Row>
              <B.FormGroup>
                <B.FormControl
                  name="diaChi"
                  type="textarea"
                  className="rounded-0 shadow-none mb-3"
                  placeholder="Địa chỉ"
                  onChange={handleInput}
                  value={addNV.diaChi}
                  required
                ></B.FormControl>
              </B.FormGroup>
            </B.Col>
            <B.Col lg={6}>
              <B.FormGroup>
                <B.FormControl
                  name="sdt"
                  type="text"
                  className="rounded-0 shadow-none mb-3"
                  placeholder="Số điện thoại"
                  onChange={handleInput}
                  value={addNV.sdt}
                  required
                ></B.FormControl>
              </B.FormGroup>
              <B.FormGroup>
                <B.FormSelect
                  name="cv_id"
                  // value={addNV.cv_id}

                  required
                  onChange={handleChangeCV}
                  className="form-select rounded-0 shadow-none mb-3 text-muted"
                >
                  <option selected disabled>
                    Chức vụ
                  </option>
                  <option value={1}>admin</option>
                  <option value={2}>kho</option>
                  <option value={3}>nhân viên</option>
                </B.FormSelect>
              </B.FormGroup>
              <B.Button
                type="submit"
                variant="outline-primary"
                className="rounded-0 py-2 mb-2 w-100"
                // onClick={handleThemNV}
              >
                <BsPersonPlusFill className="me-2" />
                Thêm nhân viên
              </B.Button>
            </B.Col>
          </B.Row>
        </B.Form>

        {/* table hien thi tai khoan */}
        <B.Row className="pe-xl-5">
          <B.Col lg className="d-grd gap-2 mx-auto table-responsive mb-5">
            <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
              <B.FormSelect
                onChange={handleChange}
                className="rounded-0 shadow-none"
                style={{ width: "200px" }}
              >
                <option disabled selected>
                  Sắp xếp
                </option>
                <option value={1}>Từ A-Z</option>
                <option value={2}>Từ Z-A</option>
              </B.FormSelect>
            </B.FormGroup>
            <B.Table className="table-borderless border border-secondary text-center mb-0">
              <thead
                className="text-dark"
                style={{ backgroundColor: "#edf1ff" }}
              >
                <tr>
                  <th>ID</th>
                  <th>Họ và tên</th>
                  {/* <th>Email</th> */}
                  <th>Giới tính</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>

                  <th style={{ width: "120px" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {employee_HTML}

                {/* {user &&
                  user.map((item, index) => {
                    
                    return (
                      <tr key={item.id}>
                        <td className="align-middle">{item.id}</td>
                        <td className="align-middle">{item.ten}</td>
                        
                        <td className="align-middle">
                          {item.gioiTinh == 1 ? "Nam" : "Nữ"}
                        </td>
                        <td
                          className="align-middle"
                          style={{ wordBreak: "break-word", width: "400px" }}
                        >
                          {item.diaChi}
                        </td>
                        <td className="align-middle">{item.sdt}</td>

                        <td className="fs-5 text-primary text-left  ">
                          <BiEdit onClick={() => handleShow(item)} />
                          <MdDeleteForever
                            className="ms-3"
                            onClick={() => handleDeleteNV(item.id)}
                          />
                          {item.user_id == null ? (
                            <BsPersonPlus
                              onClick={() => handleShowCreate(item)}
                              className="ms-3"
                            />
                          ) : null}
                        </td>
                      </tr>
                    );
                  })} */}
              </tbody>
            </B.Table>
            {loading ? <LoadingPage /> : null}
          </B.Col>

          <Pagination
            currentPage={currentPage}
            totalPage={pageNumbers}
            handlePerPage={handlePerPage}
          />
        </B.Row>
      </B.Container>
    </>
  );
};

export default Employees;
