import React from "react";
import { Link } from "react-router-dom";
const ForgotPass =() =>{
    return(
        <>
            <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Quên mật khẩu</h3>
          
          
          <div className="form-group mt-3">
            <label>Nhập Email</label>
            <input
              type="email"
              className="form-control mt-1 shadow-sm"
              placeholder="example: abc@gmail.com"
            />
          </div>
          
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary shadow-sm">
                Lấy lại mật khẩu
            </button>
          </div>
          <p className="text-center mt-2">
          Quay lại <Link to={`/Login`}>đăng nhập</Link>  
        </p>
        </div>
      </form>
    </div>
        </>
    )
}
export default ForgotPass