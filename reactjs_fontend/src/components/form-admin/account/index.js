import React, { useState, useEffect } from "react";
import * as B from "react-bootstrap";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaUserEdit, FaSearch } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import axios from "axios";

const Account = () => {
  const [user, setUser] = useState([]);
  const [addAccount, setAddAccount] = useState({
    username: "",
    email:"",
    password: "",
    role_id:"",
  });
  const handleInput = (e) => {
    e.persist();
    setAddAccount({ ...addAccount, [e.target.name]: e.target.value });
  };

  
//   hiển thị ds user
  useEffect(() => {
    // const controller = new AbortController();

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
  }, []);

  var htmlRole;
  return (
    <>
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
        
        <B.Row className="pe-xl-5 mb-5">
          <B.Col lg={8}>
            <B.Form >
              <B.FormGroup>
                <B.FormControl
                  type="text"
                  className="rounded-0 shadow-none mb-3"
                  placeholder="Username"
                ></B.FormControl>
              </B.FormGroup>
              <B.FormGroup>
                <B.FormControl
                  type="text"
                  className="rounded-0 shadow-none mb-3"
                  placeholder="Email"
                ></B.FormControl>
              </B.FormGroup>
              <B.FormGroup>
                <B.FormControl
                  type="text"
                  className="rounded-0 shadow-none mb-3"
                  placeholder="Mật khẩu"
                ></B.FormControl>
              </B.FormGroup>
              <B.FormGroup>
                <B.FormControl
                  type="text"
                  className="rounded-0 shadow-none mb-3"
                  placeholder="Quyền"
                ></B.FormControl>
              </B.FormGroup>
            </B.Form>
          </B.Col>
          <B.Col lg={4}>
           
            <B.Button
              variant="outline-primary"
              className="rounded-0 py-2 mb-2 w-100"
            >
              <FaUserEdit className="me-2" />
              Sửa tài khoản
            </B.Button>
            <B.Button
              variant="outline-primary"
              className="rounded-0 py-2 mb-2 w-100"
            >
              <AiOutlineUserDelete className="me-2" />
              Xóa tài khoản
            </B.Button>
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
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>

                  <th>Quyền</th>
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
                    <tr>
                      <td className="align-middle">
                        <input type="checkbox" />
                      </td>
                      <td className="align-middle">{item.id}</td>
                      <td className="align-middle">{item.username}</td>
                      <td className="align-middle">{item.email}</td>

                      {htmlRole}
                      <td className="align-middle fs-5 text-primary">
                        <BiEdit />
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
