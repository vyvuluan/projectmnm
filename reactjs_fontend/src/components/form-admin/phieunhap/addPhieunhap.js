import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Bt from "react-bootstrap";
import swal from "sweetalert";
import DatePicker from "react-date-picker";
const AddPhieuNhap = ({ accountData, showModal }) => {
  const [NCC, setNCC] = useState({
    tenNCC: "",
    diaChi: "",
    sdt: "",
  });
  const handleInput = (e) => {
    e.persist();
    console.log(e.target.value);
    setNCC({ ...NCC, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    // console.log("adsada");
    e.preventDefault();

    const data = {
      tenNCC: NCC.tenNCC,
      diaChi: NCC.diaChi,
      sdt: NCC.sdt,
    };
    // console.log(e.target.value);
    // console.log(ngaySinh);
    axios
      .post(`api/kho/ncc`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          swal({
            title: "Thêm thành công",
            icon: "success",
            button: "đóng",
          });
          showModal(false);
        }
        if (res.data.status == 400) {
          swal({
            title: res.data.error.sdt,
            icon: "warning",
            button: "đóng",
          });
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <>
      <Bt.Form onSubmit={handleAdd}>
        <Bt.FormGroup className="mb-3" controlId="formName">
          <Bt.FormLabel className="fw-semibold fs-4">Nhà cung cấp</Bt.FormLabel>
          <Bt.FormControl
            type="text"
            name="tenNCC"
            placeholder="tên nhà cung cấp "
            className="rounded-0"
            value={NCC.tenNCC}
            onChange={handleInput}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>

        <Bt.FormGroup className="mb-3" controlId="formAddress">
          <Bt.FormLabel className="fw-semibold fs-4">Địa chỉ</Bt.FormLabel>
          <Bt.FormControl
            type="text"
            placeholder="Nhập địa chỉ"
            className="rounded-0"
            name="diaChi"
            value={NCC.diaChi}
            onChange={handleInput}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>
        <Bt.FormGroup className="mb-3" controlId="formSDT">
          <Bt.FormLabel className="fw-semibold fs-4">
            Số điện thoại
          </Bt.FormLabel>
          <Bt.FormControl
            type="text"
            placeholder="Nhập vào số điện thoại"
            className="rounded-0"
            name="sdt"
            value={NCC.sdt}
            onChange={handleInput}
            required
          ></Bt.FormControl>
          {/* <span className="text-danger">{errorSdt}</span> */}
        </Bt.FormGroup>
        <Bt.Button
          variant="primary"
          type="submit"
          className="rounded-0 py-2 mt-3"
          //   onClick={showModal}
        >
          Thêm nhà cung cấp
        </Bt.Button>
      </Bt.Form>
    </>
  );
};

export default AddPhieuNhap;
