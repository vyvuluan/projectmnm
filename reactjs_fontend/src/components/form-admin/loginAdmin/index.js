import React from "react";
import { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";

import swal from "sweetalert";
// import { ButtonLoading } from "../loading";
// import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "react-google-login";
// import { useEffect } from "react";
import { Link } from "react-router-dom";

import { BsFillHouseFill } from "react-icons/bs";
import axios from "axios";

const LoginAdmin = () => {
  const cookies = new Cookies();

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
  });
  // const [idRole,setIdRole] = useState()
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
      axios
        .post("/api/loginAdmin", data)
        .then((res) => {
          if (res.data.status === 200) {
            // console.log(res.data.role_id);

            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_name", res.data.username);
            cookies.set("role_id", res.data.role_id, { path: "/" });
            // setIdRole(res.data.role_id)
            // console.log(cookies.get('role_id'));
            // console.log(res.data.role_id);

            swal({
              title: "Đăng nhập thành công",
              icon: "success",
              button: "đóng",
            });
            history("/PageAdmin");
          } else if (res.data.status === 401) {
            // console.log(res.data);

            swal({
              title: res.data.error,
              icon: "warning",
              button: "đóng",
            });
          } else if (res.data.status === 400) {
            // console.log(res.data);
            swal({
              title: res.data.error,
              icon: "warning",
              button: "đóng",
            });
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
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
            <h3 className="Auth-form-title">Đăng Nhập Admin</h3>
            {/* <p className="text-center mt-2">dđ</p> */}

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
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginAdmin;
