import React from "react";
import { useState } from "react";
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
          // setLoginGoogle(window.location.replace(response.data.url))

          // console.log(response.data.url)
          setLoginGoogle(response.data.url);
          // window.location.replace(response.da  ta.url);
          // console.log(loginGoogle);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {});
  }, []);

  const LoginFaceBookSubmit = (e) => {
    e.preventDefault();
    // const axios = require("axios").default;

    // Make a request for a user with a given ID
    axios
      .get()
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

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
                placeholder="Enter email"
                onChange={handleInput}
                value={loginInput.email}
                required
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
            {/* <a href="https://accounts.google.com/o/oauth2/auth?client_id=461024670660-er4iameomdo83t18khucms5bstnno4it.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Flogin%2Fgoogle%2Fcallback&scope=openid+profile+email&response_type=code">
              login
            </a> */}
            {/* <GoogleLogin
              clientId="1082529749855-m2jvr7o57bsit6a8colcbsv0ro324ac6.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            /> */}
            <LoginFaceBook loginFB={LoginFaceBookSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
