import React from "react";
import { useState } from "react";
import "./style.css";
import { Button } from "react-bootstrap";
import LoginGoogle from "./loginGoogle.js";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { BsFillHouseFill } from "react-icons/bs";
const Login = (props) => {
  const handleCallbackResponse = (response) => {
    console.log("ID token : " + response.credential);
  };
  // useEffect(()=>{
  //   google.accounts.id.initialize({
  //     client_id:"1082529749855-m2jvr7o57bsit6a8colcbsv0ro324ac6.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   })
  //   google.accounts.id.renderButton(
  //     document.getElementById("SignIn"),

  //   )
  // }, [])

  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <>
        <div id="SignIn" className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <Link
                style={{ marginTop: "-20px", position: "absolute" }}
                to={`/`}
              >
                <BsFillHouseFill />
              </Link> 
              <h3 className="Auth-form-title">Đăng Nhập</h3>
              <p className="text-center mt-2"></p>

              <div className="text-center">
                Chưa có tài khoản?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Đăng ký
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Nhập email</label>
                <input
                  type="email"
                  className="form-control mt-1 shadow-sm shadow-sm"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1 shadow-sm shadow-sm"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3 ">
                <button type="submit" className="btn btn-primary shadow-sm">
                  Đăng Nhập
                </button>
              </div>
              <p className="text-center mt-2">
                Quên <a href="#">mật khẩu?</a>
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
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Đăng ký</h3>
          <div className="text-center">
            Bạn đã có tài khoản{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Đăng Nhập
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Họ Tên</label>
            <input
              type="email"
              className="form-control mt-1 shadow-sm"
              placeholder="example: Đỗ Đình Mạnh"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1 shadow-sm"
              placeholder="example: abc@gmail.com"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1 shadow-sm"
              placeholder="Nhập password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              className="form-control mt-1 shadow-sm"
              placeholder="Xác nhận password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary shadow-sm">
              Đăng Ký
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
