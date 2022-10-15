import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
// import { Toast } from "../toast";
import swal from "sweetalert";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Resgiter = () => {
  // const [check, setCheck] = useState(true);
  const history = useNavigate();

  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [pass, setPass] = useState();
  const [repass, setRePass] = useState();

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const registerSubmit = (e) => {
    // setCheck(false);

    e.preventDefault();
    const data = {
      username: registerInput.name,
      email: registerInput.email,
      password: registerInput.pass,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("http://localhost:8000/api/register", data).then((res) => {
        // console.log(res);
        const mess = res.data.message;
        // console.log(mess);
        if (res.data.status == 200) {
          //setCheck(true)
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          console.log("thanh cong");
          swal({
            title: "Đăng ký thành công",
            icon: "success",
            button: "đóng",
          });

          history("/");
        } else {
          console.log("khong dc");
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
              <label>Họ Tên</label>
              <input
                name="name"
                type="text"
                className="form-control mt-1 shadow-sm"
                placeholder="example: Đỗ Đình Mạnh"
                onChange={handleInput}
                value={registerInput?.name}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1 shadow-sm"
                placeholder="example: abc@gmail.com"
                onChange={handleInput}
                value={registerInput?.email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="pass"
                className="form-control mt-1 shadow-sm"
                placeholder="Nhập password"
                onChange={handleInput}
                value={registerInput?.pass}
              />
            </div>
            <div className="form-group mt-3">
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                name="repass"
                className="form-control mt-1 shadow-sm"
                placeholder="Xác nhận password"
                onChange={handleInput}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary shadow-sm">
                Đăng Ký
              </button>
              {/* {!check ? (
                <>
                  <CheckToast mess="waiting...." />
                </>
              ) : null} */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Resgiter;
