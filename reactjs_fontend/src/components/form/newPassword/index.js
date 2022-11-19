import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";
const NewPass = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const token = searchParam.get("token");
  const history = useNavigate();
  const [resetPass, setResetPass] = useState({
    password: "",
  });
  const handleInput = (e) => {
    e.persist();
    setResetPass({ ...resetPass, [e.target.name]: e.target.value });
  };
  const SubmitNewPass = (e) => {
    const data = {
      password: resetPass.password,
    };
    e.preventDefault();
    axios
      .put(`/api/reset-password/${token}`, data)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          // console.log(res);
          swal({
            title: "Thay đổi thành công",
            icon: "success",
            button: "đóng",
          });
        }
        history("/login");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={SubmitNewPass}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Lấy lại password</h3>

            <div className="form-group mt-3">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1 shadow-sm"
                placeholder="password"
                onChange={handleInput}
                value={resetPass.password}
                required
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary shadow-sm">
                Xác nhận
              </button>
            </div>
            <p className="text-center mt-2">
              Quay lại <Link to={`/Login`}>đăng nhập</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default NewPass;
