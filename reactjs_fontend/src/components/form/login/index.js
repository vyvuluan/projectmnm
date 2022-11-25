import React from "react";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button } from "react-bootstrap";
import LoginGoogle from "./loginGoogle.js";
import LoginFaceBook from "./loginFacebook";
import swal from "sweetalert";
import { ButtonLoading } from "../loading";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "react-google-login";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { BsFillHouseFill } from "react-icons/bs";
import axios from "axios";

const Login = () => {
  // const [loading, setLoading] = useState(true);
  const [loginGoogle, setLoginGoogle] = useState();
  const [loginFacebook, setLoginFaceBook] = useState();

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    // console.log(data);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/login", data).then((res) => {
 
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          localStorage.setItem("auth_fullname", res.data.fullname);
          axios.get(`http://localhost:8000/api/cart`).then(resp => {
            localStorage.setItem('count', resp.data.count);
          })
          swal({
            title: "Đăng nhập thành công",
            icon: "success",
            button: "đóng",
          });
          history("/");
        } else if (res.data.status === 401) {
          // console.log(res.data);
          swal({
            title: res.data.error,
            icon: "warning",
            button: "đóng",
          });
        } else if (res.data.status === 400) {
          // console.log(res.data.err);
          swal({
            title: res.data.error,
            icon: "warning",
            button: "đóng",
          });
        } else if (res.data.status === 402) {
          // console.log(res.data.err);
          swal({
            title: res.data.message,
            icon: "warning",
            button: "đóng",
          });
        }
      });
    });
  };

  useEffect(() => {
    const axios = require("axios").default;
    // Make a request for a user with a given ID
    axios
      .get("api/login/google", {
        headers: {
          authorization: "google",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {

        if (response.status === 200) {

          setLoginGoogle(response.data.url);

        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () { });
  }, []);

  useEffect(() => {
    const axios = require("axios").default;
    axios
      .get("api/login/facebook", {
        headers: {
          authorization: "facebook",
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setLoginFaceBook(response.data.url);

        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () { });
  }, []);
  return (
    <>
      <div id="SignIn" className="Auth-form-container">
        <div className="Auth-form">
          <form className="Auth-form-content" onSubmit={loginSubmit}>
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
                placeholder="Nhập email"
                onChange={handleInput}
                value={loginInput.email}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Mật khẩu</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1 shadow-sm shadow-sm"
                placeholder="Nhập mật khẩu"
                onChange={handleInput}
                value={loginInput.password}
                required
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
          </form>
          <div className="loginOption">
            <LoginGoogle loginGG={loginGoogle} />
            <LoginFaceBook loginFB={loginFacebook} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
