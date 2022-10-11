import React from "react";
const ResetPass =() =>{
    return(
        <>
            <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Tạo mật khẩu mới</h3>
          
          
          <div className="form-group mt-3">
            <label>Nhập mật khẩu mới</label>
            <input
              type="password"
              className="form-control mt-1 shadow-sm"
                placeholder="Nhập password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Xác nhận mật khẩu mới</label>
            <input
              type="password"
              className="form-control mt-1 shadow-sm"
              placeholder="Nhập password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary shadow-sm">
                Xác nhận
            </button>
          </div>
        </div>
      </form>
    </div>
        </>
    )
}
export default ResetPass