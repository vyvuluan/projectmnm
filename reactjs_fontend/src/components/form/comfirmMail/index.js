import axios from "axios";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ComfirmMail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [code,setCode] = useState()
    const email = searchParams.get("email")

    const handleInput = (e) => {
        setCode(e.target.value)
    }

    const handleComfirmEmail = () => {
        const data = code
        axios.put(`/api/confirm-email/${email}`, data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  return (
    <>
      <div className="Auth-form-container" >
        <form className="Auth-form" onSubmit={handleComfirmEmail}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Xác nhận Email</h3>

            <div className="form-group mt-3">
              <div className="text-center">
                <label style={{ color: "green" }}>
                  Vui lòng kiểm tra email để lấy mã xác nhận
                </label>
              </div>
              <input
                type="number"
                name="comfirmMail"
                className="form-control mt-1 shadow-sm"
                placeholder="Nhập mã xác nhận"
                onChange={handleInput}
                value={code}
                required
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary shadow-sm">
                Xác nhận
              </button>
            </div>
            <div className="text-center text-uppercase mt-3 fw-bold">
              <a href="#">lấy lại mã xác nhận</a>
            </div>
            <p className="text-center mt-2">
              Quay lại <Link to={`/Register`}>đăng nhập</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default ComfirmMail;
