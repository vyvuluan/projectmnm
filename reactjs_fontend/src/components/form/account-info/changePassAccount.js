import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Bt from "react-bootstrap";
import swal from "sweetalert";

const ChangePassAccount = ({ showModal }) => {
  const [passOld, setPassOld] = useState();
  const [rePass, setRePass] = useState();
  const [comfirmPass, setComfirmPass] = useState();

  const handleUpdatePass = (e) => {
    e.preventDefault();
    const data = {
      password_old: passOld,
      password: rePass,
      re_password: comfirmPass,
    };
    axios
      .put(`/api/changePass`, data)
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        } else if (res.data.status === 401) {
          swal("Error", res.data.message, "error");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <>
      <Bt.Form onSubmit={handleUpdatePass}>
        <Bt.FormGroup className="mb-3" controlId="formOldpass">
          <Bt.FormLabel className="fw-semibold fs-4">Mật khẩu cũ</Bt.FormLabel>
          <Bt.FormControl
            type="password"
            placeholder="Nhập vào mật khẩu cũ"
            className="rounded-0"
            value={passOld}
            onChange={(e) => setPassOld(e.target.value)}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>
        <Bt.FormGroup className="mb-3" controlId="formNewpass">
          <Bt.FormLabel className="fw-semibold fs-4">Mật khẩu mới</Bt.FormLabel>
          <Bt.FormControl
            type="password"
            placeholder="8-12 ký tự gồm chữ vào số"
            className="rounded-0"
            value={rePass}
            onChange={(e) => setRePass(e.target.value)}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>
        <Bt.FormGroup className="mb-3" controlId="formRe-Newpass">
          <Bt.FormLabel className="fw-semibold fs-4">
            Nhập lại mật khẩu mới
          </Bt.FormLabel>
          <Bt.FormControl
            type="password"
            placeholder="8-12 ký tự gồm chữ vào số"
            className="rounded-0"
            value={comfirmPass}
            onChange={(e) => setComfirmPass(e.target.value)}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>
        <Bt.Button
          type="submit"
          variant="primary"
          className="rounded-0 py-2 mt-3"
          // onClick={()=> handleShow()}
        >
          Lưu thay đổi
        </Bt.Button>
      </Bt.Form>
    </>
  );
};

export default ChangePassAccount;
