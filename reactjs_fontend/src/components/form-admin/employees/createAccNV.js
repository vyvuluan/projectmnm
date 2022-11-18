import swal from "sweetalert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as B from "react-bootstrap";

const CreateAccNV = ({createAcc,showModal,setSubmitting}) => {
    const id = createAcc.id
    const [valueCV, setValueCV] = useState();
    const [error, setError] = useState();
    



    const handleChangeCV = (e) => {
      // console.log(e.target.value);
      setValueCV(e.target.value);
    };
    const [registerInput, setRegister] = useState({
        email: "",
        username: "",
        password: "",
        re_password: "",
        
      });

      const handleInput = (e) => {
        // console.log(e.target.value);
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
      };
    
      const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
         
          username: registerInput.username,
          email: registerInput.email,
          password: registerInput.password,
          re_password: registerInput.re_password,
          role_id: valueCV
        };
        // console.log(data);
        axios.get("/sanctum/csrf-cookie").then((response) => {
          axios.post(`api/admin/manageEmployee/createUser/${id}`, data).then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              
              // console.log("thanh cong");
              swal({
                title: "Đăng ký thành công",
                icon: "success",
                button: "đóng",
              });
              showModal(false)
              setSubmitting(true)
            } else if (res.data.status === 401) {
              swal({
                title: res.data.error,
                icon: "error",
                button: "đóng",
              });
            } else if (res.data.status === 400) {
              // console.log(res.data.error);
              setError(res.data.error);
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
            <label>UserName</label> <span className="error1 ms-2">{error?.username}</span>
           
            <input
              name="username"
              type="text"
              className="form-control mt-1 shadow-sm"
              placeholder="example: abc"
              onChange={handleInput}
              value={registerInput.username}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            <span className="error1 ms-2">{error?.email}</span>
            <input
              type="email"
              name="email"
              className="form-control mt-1 shadow-sm"
              placeholder="example: abc@gmail.com"
              onChange={handleInput}
              value={registerInput.email}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <span className="error1 ms-2">{error?.password}</span>
            <input
              type="password"
              name="password"
              className="form-control mt-1 shadow-sm"
              placeholder="Nhập password"
              onChange={handleInput}
              value={registerInput.password}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Xác nhận mật khẩu</label>
            <span className="error1 ms-2">{error?.re_password}</span>
            <input
              type="password"
              name="re_password"
              className="form-control mt-1 shadow-sm"
              placeholder="Xác nhận password"
              onChange={handleInput}
              value={registerInput.re_password}
              required
            />
          </div>

          {/* <span className="error1">{errorPass}</span> */}
          <label>Quyền</label>

          <B.FormGroup>

          <B.FormSelect
            name="cv_id"
            // value={}
            required
            onChange={handleChangeCV}
            defaultValue={2}
            className="rounded-0 shadow-none mb-3 text-muted"
          >
         
            <option value={2}>admin</option>
            <option value={3}>kho</option>
            <option value={4}>nhân viên</option>
          </B.FormSelect>
        </B.FormGroup>
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
