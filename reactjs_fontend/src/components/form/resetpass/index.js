import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ForgotPass =() =>{
  const [resetEmail, setResetEmail] = useState({
    email: "",
  })

  const handleInput = (e) => {
    e.persist();
    setResetEmail({ ...resetEmail, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  const resetPassSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: resetEmail.email,
    };
    // console.log(data);
    
      axios.post("/api/reset-password", data).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          // console.log(res);
          swal({
            title: res.data.message,
            icon: "success",
            button: "đóng",
          });
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
      });
    
  };
    return(
        <>
            <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={resetPassSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Quên mật khẩu</h3>
          
          
          <div className="form-group mt-3">
            <label>Nhập Email</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1 shadow-sm"
              placeholder="example: abc@gmail.com"
              onChange={handleInput}
              value={resetEmail.email}
              required
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