import React, { useEffect, useState } from "react";
import * as B from "react-bootstrap";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaUserEdit, FaSearch } from "react-icons/fa";
import { AiOutlineUserDelete, AiOutlineEdit } from "react-icons/ai";
import { RiUserAddFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { BsPersonPlus } from "react-icons/bs";
import swal from "sweetalert";

import axios from "axios";
import Pagination from "../../form/pagination";
import UpdateNV from "./updateNV";
import CreateAccNV from "./createAccNV";
const Employees = () => {
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

  const handleClose = () => setShow((prev) => !prev);
  const handleCloseCreateAcc = () => setShowCreateAcc((prev) => !prev);

  const handleShow = (item) => {
    setUsername(item);

    setShow(true);
  };
  const handleShowCreate = (item) => {
    // setUsername(item)
    setCreateAcc(item)
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
        setUser(res.data.emloyee.data);
        setTotalPage(res.data.emloyee.total);
        setPerPage(res.data.emloyee.per_page);
        setCurrentPage(res.data.emloyee.current_page);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    // return () => controller.abort();
  }, [page]);

  const handleThemNV = () => {
    const data = {
      ten: addNV.ten,
      sdt: addNV.sdt,
      diaChi: addNV.diaChi,
      gioiTinh: valueGT,
      cv_id: valueCV,
    };
    axios
      .post("/api/admin/manageEmployee", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 200) {
          swal("Success", res.data.message, "success");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        swal("Warning", "vui lòng kiểm tra lại thông tin vừa nhập ", "warning");
      });
  };

  return (
    <>
      <B.Modal show={show} onHide={handleClose}>
        <B.ModalHeader closeButton className="bg-secondary">
          <B.ModalTitle>Cập nhật nhân viên</B.ModalTitle>
        </B.ModalHeader>
        <B.ModalBody>
          <UpdateNV username={username} showModal={handleClose} />
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
          <B.Col lg={4}>
            <h1 className="fw-bold text-primary mb-4 text-capitalize">
              QUẢN LÝ NHÂN VIÊN
            </h1>
          </B.Col>
          <B.Col lg={2}></B.Col>
          <B.Col lg={6}>
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
              <B.FormGroup className="d-flex d-inline-block justify-content-between mt-2">
                <B.FormCheck
                  type="checkbox"
                  className="rounded-0"
                  label="Theo id"
                />
                <B.FormCheck
                  type="checkbox"
                  className="rounded-0"
                  label="Theo tên"
                />
                <B.FormCheck
                  type="checkbox"
                  className="rounded-0"
                  label="Theo số điện thoại"
                />
                <B.FormSelect className="w-25 rounded-0 shadow-none">
                  <option>Theo quyền</option>
                  <option>Administrator</option>
                  <option>Thủ kho</option>
                  <option>Nhân viên</option>
                </B.FormSelect>
              </B.FormGroup>
            </B.Form>
          </B.Col>
        </B.Row>

        <B.Form className="mt-2">
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
              <B.FormGroup>
                <B.FormSelect
                  name="gioiTinh"
                  // value={addNV.gioiTinh}
                  onChange={handleChangeGT}
                  className="rounded-0 shadow-none mb-3 text-muted"
                  required
                >
                  <option>Giới tính</option>
                  <option value={1}>Nam</option>
                  <option value={0}>Nữ</option>
                </B.FormSelect>
              </B.FormGroup>
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
                  className="rounded-0 shadow-none mb-3 text-muted"
                >
                  <option>Chức vụ</option>
                  <option value={1}>admin</option>
                  <option value={2}>kho</option>
                  <option value={3}>nhân viên</option>
                </B.FormSelect>
              </B.FormGroup>
              <B.Button
                variant="outline-primary"
                className="rounded-0 py-2 mb-2 w-100"
                onClick={handleThemNV}
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
              {/* <B.FormSelect
                className="rounded-0 shadow-none"
                style={{ width: "200px" }}
              >
                <option>Sắp xếp</option>
                <option>Từ A-Z</option>
                <option>Theo ID</option>
                <option>Theo quyền</option>
              </B.FormSelect> */}
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

                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {user.map((item, index) => {
                  // console.log(item);
                  // if (user_id == null) {
                  // }
                  return (
                    <tr>
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

                      <td className="align-middle fs-5 text-primary  ">
                        <BiEdit onClick={() => handleShow(item)} />
                        {item.user_id == null ? (
                          <BsPersonPlus
                            onClick={() => handleShowCreate(item)}
                            className="ms-4"
                          />
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </B.Table>
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
