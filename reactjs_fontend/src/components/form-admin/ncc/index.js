import React, { useCallback, useEffect, useState } from "react";
import * as B from "react-bootstrap";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaUserEdit, FaSearch } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import swal from "sweetalert";
import LoaderIcon from "../../layouts/Loading/index";
import NccEdit from "./nccEdit";
import Pagination from "../../form/pagination/index";

const Ncc = () => {
  const [ncclist, setNcclist] = useState([]);
  const [show, setShow] = useState(false);
  const [NCCData, setNCCData] = useState();
  const [submitting, setSubmitting] = useState(true);
  const handleClose = () => {
    setShow((prev) => !prev);
    setSubmitting(true);
  };
  const handleShow = (NCC) => {
    setShow(true);
    setNCCData(NCC);
  };

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const handlePerPage = (page) => {
    console.log(page);
    setPage(page);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }

  // Thêm NCC (start)
  const [nccInput, setNcc] = useState({
    tenNCC: "",
    sdt: "",
    diachi: "",
  });
  const [errorlist, setError] = useState([]);

  const handleNccInput = (e) => {
    e.persist();
    setNcc({ ...nccInput, [e.target.name]: e.target.value });
  };

  const submitNcc = (e) => {
    e.preventDefault();

    const data = {
      tenNCC: nccInput.tenNCC,
      sdt: nccInput.sdt,
      diaChi: nccInput.diachi,
    };

    axios.post(`http://localhost:8000/api/kho/ncc`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Thành công", res.data.message, "success");
        setNcc({
          tenNCC: "",
          sdt: "",
          diachi: "",
        });
        setSubmitting(true);
        setError([]);
      } else if (res.data.status === 400) {
        swal("Thất bại", res.data.message, "error");
        setError(res.data.errors);
      }
    });
  };
  // Thêm NCC (end)

  const getNccData = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:8000/api/kho/ncc?page=${page}`
    );
    if (res.data.status === 200) {
      setNcclist(res.data.Ncc.data);
      setTotalPage(res.data.Ncc.total);
      setPerPage(res.data.Ncc.per_page);
      setCurrentPage(res.data.Ncc.current_page);
    }
  }, [page]);

  useEffect(() => {
    getNccData().then(() => setSubmitting(false));
  }, [submitting, getNccData]);

  return (
    <>
      <B.Modal show={show} onHide={handleClose}>
        <B.ModalHeader closeButton className="bg-secondary">
          <B.ModalTitle>Sửa thông tin Nhà Cung Cấp</B.ModalTitle>
        </B.ModalHeader>
        <B.ModalBody>
          <NccEdit ncc={NCCData} showModal={handleClose} />
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

      <B.Container fluid>
        <B.Row className="pe-xl-5 mb-4">
          <B.Col lg={5}>
            <h1 className="fw-bold text-primary mb-4 text-capitalize">
              QUẢN LÝ NHÀ CUNG CẤP
            </h1>
          </B.Col>
          <B.Col lg={1}></B.Col>
        </B.Row>
        <B.Row className="pe-xl-5 mb-5">
          <B.Form onSubmit={submitNcc} id="formAddNCC">
            <B.Row>
              <B.Col lg={8}>
                <B.FormGroup>
                  <B.FormControl
                    type="text"
                    name="tenNCC"
                    className="rounded-0 shadow-none mb-3"
                    placeholder="Tên nhà cung cấp"
                    onChange={handleNccInput}
                    value={nccInput.tenNCC}
                  ></B.FormControl>
                  <h6 className="text-danger">{errorlist.tenNCC}</h6>
                </B.FormGroup>
                <B.FormGroup>
                  <B.FormControl
                    type="text"
                    name="sdt"
                    className="rounded-0 shadow-none mb-3"
                    placeholder="Số điện thoại"
                    onChange={handleNccInput}
                    value={nccInput.sdt}
                  ></B.FormControl>
                  <h6 className="text-danger">{errorlist.sdt}</h6>
                </B.FormGroup>
                <B.FormGroup>
                  <B.FormControl
                    as="textarea"
                    rows={4}
                    name="diachi"
                    className="rounded-0 shadow-none mb-3"
                    placeholder="Địa chỉ"
                    onChange={handleNccInput}
                    value={nccInput.diachi}
                  ></B.FormControl>
                  <h6 className="text-danger">{errorlist.diachi}</h6>
                </B.FormGroup>
              </B.Col>
              <B.Col lg={4}>
                <B.Button
                  type="submit"
                  variant="outline-primary"
                  className="rounded-0 py-2 mb-2 w-100"
                >
                  <BsPersonPlusFill className="me-2" />
                  Thêm nhà cung cấp
                </B.Button>
              </B.Col>
            </B.Row>
          </B.Form>
        </B.Row>

        {/* table hien thi tai khoan */}
        <B.Row className="pe-xl-5">
          <B.Col lg className="d-grd gap-2 mx-auto table-responsive mb-5">
            {/* <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
              <B.FormSelect
                className="rounded-0 shadow-none"
                style={{ width: "200px" }}
              >
                <option>Sắp xếp</option>
                <option>Từ A-Z</option>
                <option>Theo ID</option>
              </B.FormSelect>
            </B.FormGroup> */}
            <B.Table className="table-borderless border border-secondary mb-0">
              <thead
                className="text-dark"
                style={{ backgroundColor: "#edf1ff" }}
              >
                <tr>
                  {/* <th>
                    <input type="checkbox" />
                  </th> */}
                  <th>STT</th>
                  <th>Tên nhà cung cấp</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {ncclist.map((NCC, index) => {
                  return (
                    <>
                      <tr key={NCC.id}>
                        {/* <td >
                          <input type="checkbox" />
                        </td> */}
                        <td>{index + 1}</td>
                        <td>{NCC.tenNCC}</td>
                        <td>{NCC.sdt}</td>
                        <td>{NCC.diaChi}</td>
                        <td
                          onClick={() => handleShow(NCC)}
                          className="text-center fs-5 text-primary"
                          style={{ cursor: "pointer" }}
                        >
                          <BiEdit className="me-1" />
                          Sửa
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </B.Table>
          </B.Col>
        </B.Row>
        <Pagination
          currentPage={currentPage}
          totalPage={pageNumbers}
          handlePerPage={handlePerPage}
        />
      </B.Container>
    </>
  );
};

export default Ncc;
