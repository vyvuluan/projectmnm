import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button } from "react-bootstrap";
import LoginGoogle from "./loginGoogle.js";
import swal from "sweetalert";

import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { BsFillHouseFill } from "react-icons/bs";
import axios from "axios";

const Login = () => {

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: [e.target.value] });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
    axios.post("/api/login", data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username)
          swal({
            title: "Đăng nhập thành công",
            icon: "success",
            button: "đóng",
          });

          history("/");
        }else if (res.data.status === 401) {
          swal({
            title: "Không đúng tài khoản hoặc mật khẩu",
            icon: "warning",
            button: "đóng",
          });
        }
        else 
        {
          // setLogin({...loginInput})
        }
    });
  });
}
  return (
    <>
      <div id="SignIn" className="Auth-form-container">
        <form className="Auth-form" onSubmit={loginSubmit}>
          <div className="Auth-form-content">
            <Link style={{ marginTop: "-20px", position: "absolute" }} to={`/`}>
              <BsFillHouseFill />
            </Link>
            <h3 className="Auth-form-title">Đăng Nhập</h3>
            <p className="text-center mt-2"></p>

            <div className="text-center">
              Chưa có tài khoản?{" "}
              <Link to="/Register">
                {" "}
                <span className="link-primary">Đăng ký</span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Nhập email</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1 shadow-sm shadow-sm"
                placeholder="Enter email"
                onChange={handleInput}
                value={loginInput.email}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1 shadow-sm shadow-sm"
                placeholder="Enter password"
                onChange={handleInput}
                value={loginInput.password}
              />
            </div>
            <div className="d-grid gap-2 mt-3 ">
              <button type="submit" className="btn btn-primary shadow-sm">
                Đăng Nhập
              </button>
            </div>
            <p className="text-center mt-2">
              Quên <Link to="/forgotpass">mật khẩu?</Link>
            </p>
            <div className="loginOption">
              <LoginGoogle />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="p-1 border m-1 btnCus shadow-sm "

                //   onClick={handleGoogleLogin}
              >
                <img
                  width="20px"
                  style={{ marginBottom: "3px", marginRight: "5px" }}
                  alt="Google sign-in"
                  src="https://img.icons8.com/fluency/48/000000/facebook-new.png"
                />
                Login with Facebook
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
