import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Bt from "react-bootstrap";

import { Link, useSearchParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
const NewPassAdmin = ({ data }) => {
  // console.log(data);
  let id = data.id;
  const [resetPassNV, setResetPassNV] = useState({
    password: "",
    re_password: "",
  });
  const [errorPass, setErrorPass] = useState();
  const [errorREPass, setErrorREPass] = useState();

  const handleInput = (e) => {
    e.persist();
    console.log(e.target.value);
    setResetPassNV({ ...resetPassNV, [e.target.name]: e.target.value });
  };
  const SubmitNewPass = (e) => {
    const data = {
      password: resetPassNV.password,
      re_password: resetPassNV.re_password,
    };
    e.preventDefault();
    axios
      .put(`/api/admin/reset-password/${id}`, data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === 200) {
          swal({
            title: res.data.message,
            icon: "success",
            button: "đóng",
          });
        }
        if (res.data.status === 400) {
          if (res.data.check == 0) {
            setErrorPass(res.data.error.password);
            setErrorREPass(res.data.error.re_password);
          } else if (res.data.check == 1) {
            swal({
              title: res.data.error,
              icon: "error",
              button: "đóng",
            });
          }

          // console.log(res);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <>
      <Bt.Form onSubmit={SubmitNewPass}>
        <Bt.FormGroup className="mb-3" controlId="formName1">
          <Bt.FormLabel className="fw-semibold fs-6">Password </Bt.FormLabel>{" "}
          <span className="text-danger ms-2 ">{errorPass}</span>
          <Bt.FormControl
            type="password"
            name="password"
            // id="password"
            className="form-control mt-1 shadow-sm"
            // placeholder="password"
            onChange={handleInput}
            value={resetPassNV.password}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>
        <Bt.FormGroup className="mb-3" controlId="formName1">
          <Bt.FormLabel className="fw-semibold fs-6">
            Nhập lại Password{" "}
          </Bt.FormLabel>{" "}
          <span className="text-danger ms-2 ">{errorREPass}</span>
          <Bt.FormControl
            type="password"
            name="re_password"
            // id="password"
            className="form-control mt-1 shadow-sm"
            // placeholder="password"
            onChange={handleInput}
            value={resetPassNV.re_password}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>
        <Bt.Button
          variant="primary"
          type="submit"
          className="rounded-0 py-2 mt-3"
          // onClick={() => handleUpdateAccount(viewAcc.id)}
        >
          Thay đổi
        </Bt.Button>
      </Bt.Form>
    </>
  );
};
export default NewPassAdmin;
