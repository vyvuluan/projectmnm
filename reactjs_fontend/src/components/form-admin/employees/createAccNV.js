import swal from "sweetalert";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateAccNV = ({createAcc}) => {
    const id = createAcc.id
    const [registerInput, setRegister] = useState({
        email: "",
        username: "",
        password: "",
        re_password: "",
      });

      const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
      };
    
      const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
         
          username: registerInput.name,
          email: registerInput.email,
          password: registerInput.pass,
          re_password: registerInput.repass,
        };
        // console.log(data);
        axios.get("/sanctum/csrf-cookie").then((response) => {
          axios.post(`api/manageEmployee/createUser/${id}`, data).then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              
              // console.log("thanh cong");
              swal({
                title: "Đăng ký thành công",
                icon: "success",
                button: "đóng",
              });
    
           
            } else if (res.data.status === 401) {
            //   setErrorPass(res.data.error);
            } else if (res.data.status === 400) {
              console.log(res.data.error);
            //   setErrorTrung(res.data.error);
              // console.log(errorTrung.username);
            }
            
          });
          
        });
      };
  return (
    <>
      <form onSubmit={registerSubmit}>
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>UserName</label>
            {/* <span className="error1 ms-2">{errorTrung?.username}</span> */}
            <input
              name="username"
              type="text"
              className="form-control mt-1 shadow-sm"
              placeholder="example: abc"
              onChange={handleInput}
              value={registerInput?.username}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            {/* <span className="error1 ms-2">{errorTrung?.email}</span> */}
            <input
              type="email"
              name="email"
              className="form-control mt-1 shadow-sm"
              placeholder="example: abc@gmail.com"
              onChange={handleInput}
              value={registerInput?.email}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            {/* <span className="error1 ms-2">{errorTrung?.password}</span> */}
            <input
              type="password"
              name="password"
              className="form-control mt-1 shadow-sm"
              placeholder="Nhập password"
              onChange={handleInput}
              value={registerInput?.password}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Xác nhận mật khẩu</label>
            {/* <span className="error1 ms-2">{errorTrung?.re_password}</span> */}
            <input
              type="password"
              name="re_password"
              className="form-control mt-1 shadow-sm"
              placeholder="Xác nhận password"
              onChange={handleInput}
              value={registerInput?.re_password}
              required
            />
          </div>

          {/* <span className="error1">{errorPass}</span> */}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary shadow-sm">
              Tạo tài khoản
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default CreateAccNV;
