import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Bt from "react-bootstrap";
import swal from "sweetalert";

const ChangePassAccount = ({ data, showModal }) => {
  // const id = ncc.id;
  // const [tenNccData, setTenNccData] = useState(ncc.tenNCC);
  // const [sdtNcc, setSdtNcc] = useState(ncc.sdt);
  // const [diachiNcc, setDiachiNcc] = useState(ncc.diaChi);

  // const handleUpdate = (e) => {
  //     e.preventDefault();

  //     const data = {
  //         tenNCC: tenNccData,
  //         sdt: sdtNcc,
  //         diaChi: diachiNcc,
  //     }

  //     axios.put(`/api/kho/ncc/${id}`, data).then(res => {
  //         if (res.data.status === 200) {
  //             swal('Success', res.data.message, 'success')
  //         } else if (res.data.status === 404) {
  //             swal('Error', res.data.message, 'error')
  //         }
  //     })
  // }

  return (
    <>
      <Bt.Form>
        <Bt.FormGroup className="mb-3" controlId="formOldpass">
          <Bt.FormLabel className="fw-semibold fs-4">Mật khẩu cũ</Bt.FormLabel>
          <Bt.FormControl
            type="password"
            placeholder="Nhập vào mật khẩu cũ"
            className="rounded-0"
          ></Bt.FormControl>
        </Bt.FormGroup>
        <Bt.FormGroup className="mb-3" controlId="formNewpass">
          <Bt.FormLabel className="fw-semibold fs-4">Mật khẩu mới</Bt.FormLabel>
          <Bt.FormControl
            type="password"
            placeholder="8-12 ký tự gồm chữ vào số"
            className="rounded-0"
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
          ></Bt.FormControl>
        </Bt.FormGroup>
        <Bt.Button variant="primary" className="rounded-0 py-2 mt-3" onClick={showModal}>
          Lưu thay đổi
        </Bt.Button>
      </Bt.Form>
    </>
  );
};

export default ChangePassAccount;
