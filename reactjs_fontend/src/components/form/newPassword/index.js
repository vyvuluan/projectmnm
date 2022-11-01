import React from "react";
import { Link } from "react-router-dom";
const NewPass = () => {
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Lấy lại password</h3>

            <div className="form-group mt-3">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                className="form-control mt-1 shadow-sm"
                placeholder="password"
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
