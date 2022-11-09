import React, { useState, useEffect } from "react";
import * as B from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { FaUserEdit, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import Cookies from "universal-cookie";
import ViewAccount from "./viewAccount";
import swal from "sweetalert";
const Account = () => {
  const cookies = new Cookies();
  const [user, setUser] = useState([]);
  const [viewAcc, setViewAcc] = useState();


  const [show, setShow] = useState(false);
  const handleClose = () => setShow((prev) => !prev);
  const handleShow = (item) => {
    // console.log(item);
    setViewAcc(item)
    setShow(true);
  };
  const [addAccount, setAddAccount] = useState({
    username: "",
    email: "",
    password: "",
    role_id: "",
  });

  //   hiển thị ds user

  useEffect(() => {
    // const controller = new AbortController();
    if (cookies.get("role_id") == 2) {
      axios
        .get("/api/admin/manageUser")
        .then((res) => {
          // console.log(res.data.users.data);
          setUser(res.data.users.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      // return () => controller.abort();
    } else {
      axios
        .get("/api/nhanvien/manageUser")
        .then((res) => {
          // console.log(res.data.users.data);
          setUser(res.data.users.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, []);

  const handleDeleteAccount = (item) => {
    console.log(item);
    const id = item.id;
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
          .delete(`/api/admin/manageUser/${id}`)
          .then((res) => {
            // console.log(res.data.product.data);
            if (res.data.status === 200) {
              // setDataSPganhet(res.data.product.data);
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

  var htmlRole;
  return (
    <>
    <B.Modal show={show} onHide={handleClose}>
        <B.ModalHeader closeButton className="bg-secondary">
          <B.ModalTitle>Thêm nhà cung cấp</B.ModalTitle>
        </B.ModalHeader>
        <B.ModalBody>
          <ViewAccount viewAcc={viewAcc} showModal={handleClose} />
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
          <B.Col lg={4}>
            <h1 className="fw-bold text-primary mb-4 text-capitalize">
              QUẢN LÝ TÀI KHOẢN
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
                  label="Theo username"
                />
                <B.FormCheck
                  type="checkbox"
                  className="rounded-0"
                  label="Theo email"
                />
                <B.FormSelect className="w-25 rounded-0 shadow-none">
                  <option>Administrator</option>
                  <option>Thủ kho</option>
                  <option>Nhân viên</option>
                </B.FormSelect>
              </B.FormGroup>
            </B.Form>
          </B.Col>
        </B.Row>

        {/* table hien thi tai khoan */}
        <B.Row className="pe-xl-5">
          <B.Col lg className="d-grd gap-2 mx-auto table-responsive mb-5">
            <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
              <B.FormSelect
                className="rounded-0 shadow-none"
                style={{ width: "200px" }}
              >
                <option>Sắp xếp</option>
                <option>Từ A-Z</option>
                <option>Theo ID</option>
                <option>Theo quyền</option>
              </B.FormSelect>
            </B.FormGroup>
            <B.Table className="table-borderless border border-secondary text-center mb-0">
              <thead
                className="text-dark"
                style={{ backgroundColor: "#edf1ff" }}
              >
                <tr>
                  
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>

                  <th>Quyền</th>
                  <th>Hoạt động</th>

                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {user.map((item, index) => {
                  //   console.log(item);

                  if (item.role_id == 1) {
                    htmlRole = (
                      <>
                        <td className="align-middle fw-semibold">User</td>
                      </>
                    );
                  } else if (item.role_id == 2) {
                    htmlRole = (
                      <td className="align-middle fw-semibold text-danger">
                        Administrator
                      </td>
                    );
                  } else if (item.role_id == 3) {
                    htmlRole = (
                      <td className="align-middle fw-semibold text-info">
                        Thủ kho
                      </td>
                    );
                  } else if (item.role_id == 4) {
                    htmlRole = (
                      <td className="align-middle fw-semibold text-warning">
                        Nhân viên
                      </td>
                    );
                  }
                  return (
                    <tr key={index}>
                      
                      <td className="align-middle">{item.id}</td>
                      <td className="align-middle">{item.username}</td>
                      <td className="align-middle">{item.email}</td>

                      {htmlRole}
                      <td
                        className="align-middle fw-bold"
                        style={{ color: "#379237" }}
                      >
                        ON
                      </td>
                      {/* <td className="align-middle fw-bold" style={{color:"#cecece"}}>OFF</td> */}

                      <td className="align-middle fs-5 text-primary">
                        <AiFillEye
                          type="button"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Xem chi tiết "
                          style={{ marginRight: "15px" }}
                          onClick={() => handleShow(item)}
                        />
                        
                        <MdDeleteForever
                          type="button"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Xóa tài khoản"

                          
                          onClick={() => handleDeleteAccount(item)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </B.Table>
          </B.Col>
        </B.Row>
      </B.Container>
    </>
  );
};

export default Account;
