import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

import swal from "sweetalert";

import "react-toastify/dist/ReactToastify.css";

const Resgiter = () => {
  const history = useNavigate();

  const [registerInput, setRegister] = useState({
    fullname: "",
    name: "",
    email: "",
    pass: "",
    repass: "",
  });
  const [errorPass, setErrorPass] = useState();

  const [errorTrung, setErrorTrung] = useState();
  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullname: registerInput.fullname,
      username: registerInput.name,
      email: registerInput.email,
      password: registerInput.pass,
      re_password: registerInput.repass,
    };
    // console.log(data);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/register", data).then((res) => {
        if (res.status === 200) {
          window.location.replace(res.data.url) ;
        }
      });
    });
  };
 
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={registerSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Đăng ký</h3>
            <div className="text-center">
              Bạn đã có tài khoản{" "}
              <Link to="/Login">
                <span className="link-primary">Đăng Nhập</span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Họ và Tên</label>
              <span className="error1 ms-2">{errorTrung?.fullname}</span>
              <input
                name="fullname"
                type="text"
                className="form-control mt-1 shadow-sm"
                placeholder="example: Đỗ Đình Mạnh"
                onChange={handleInput}
                value={registerInput?.fullname}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label>UserName</label>
              <span className="error1 ms-2">{errorTrung?.username}</span>
              <input
                name="name"
                type="text"
                className="form-control mt-1 shadow-sm"
                placeholder="example: abc"
                onChange={handleInput}
                value={registerInput?.name}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label>Email</label>
              <span className="error1 ms-2">{errorTrung?.email}</span>
              <input
                type="email"
                name="email"
                className="form-control mt-1 shadow-sm"
                placeholder="example: abc@gmail.com"
                onChange={handleInput}
                value={registerInput?.email}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <span className="error1 ms-2">{errorTrung?.password}</span>
              <input
                type="password"
                name="pass"
                className="form-control mt-1 shadow-sm"
                placeholder="Nhập password"
                onChange={handleInput}
                value={registerInput?.pass}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label>Xác nhận mật khẩu</label>
              <span className="error1 ms-2">{errorTrung?.re_password}</span>
              <input
                type="password"
                name="repass"
                className="form-control mt-1 shadow-sm"
                placeholder="Xác nhận password"
                onChange={handleInput}
                value={registerInput?.repass}
                required
              />
            </div>

            <span className="error1">{errorPass}</span>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary shadow-sm">
                Đăng Ký
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Resgiter;
