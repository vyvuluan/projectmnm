import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Bt from "react-bootstrap";
import swal from "sweetalert";
import DatePicker from "react-date-picker";
const AccountEdit = ({ accountData, showModal }) => {
  //   console.log(accountData);
  const history = useNavigate();
  //   const [value, onChange] = useState(new Date());
  const [ten, setTen] = useState(accountData?.username);
  const [gioiTinh, setGioiTinh] = useState(accountData?.customer?.gioiTinh);
  const [diaChi, setDiachi] = useState(accountData?.customer?.diaChi);
  const [sdt, setSdt] = useState(accountData?.customer?.sdt);
  const [ngaySinh, setNgaySinh] = useState(accountData?.customer?.ngaySinh);
  const [errorSdt, setErrorSdt] = useState();
  const [errorBird, setErrorBird] = useState();
  // console.log(accountData?.customer?.gioiTinh);
  const [gender, setGender] = useState(accountData?.customer?.gioiTinh);
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleUpdate = (e) => {
    // console.log("adsada");
    e.preventDefault();

    const data = {
      ten: ten,
      ngaySinh: ngaySinh,
      diaChi: diaChi,
      sdt: sdt,
      gioiTinh: gioiTinh,
    };
    // console.log(e.target.value);
    // console.log(ngaySinh);
    axios
      .put(`api/detailUser`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          window.location.reload(false);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        } else if (res.data.status === 400) {
          setErrorSdt(res.data.message.sdt);
          // console.log(res.data.message.sdt);
        }
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
        if (error) {
          setErrorBird("Định dạng ngày sinh d/m/y ex: 1/1/2001");
        }
      });
  };

  return (
    <>
      <Bt.Form onSubmit={handleUpdate}>
        <Bt.FormGroup className="mb-3" controlId="formName">
          <Bt.FormLabel className="fw-semibold fs-4">Họ và tên</Bt.FormLabel>
          <Bt.FormControl
            type="text"
            name="ten"
            placeholder="Nhập vào họ và tên"
            className="rounded-0"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          ></Bt.FormControl>
        </Bt.FormGroup>
        <Bt.FormGroup className="mb-3" controlId="formName">
          <Bt.FormLabel className="fw-semibold fs-4">Ngày sinh</Bt.FormLabel>
          {/* <DatePicker  onChange={() =>  { console.log(value); return onChange}} value={value} /> */}
          <Bt.FormControl
            type="date"
            name="ngaySinh"
            placeholder="ngày sinh"
            className="rounded-0"
            value={ngaySinh}
            onChange={(e) => setNgaySinh(e.target.value)}
          ></Bt.FormControl>
          <span className="text-danger">{errorBird}</span>
        </Bt.FormGroup>
        <Bt.FormGroup
          className="mb-3"
          controlId="formSexual"
          onChange={(e) => {
            // console.log(e.target.value);
            return setGioiTinh(e.target.value);
          }}
        >
          <Bt.FormLabel className="fw-semibold fs-4">Giới tính</Bt.FormLabel>
          <br></br>
          <Bt.FormCheck className="form-check-inline">
            <Bt.FormCheck.Input
              type="radio"
              id="flexRadio1"
              value="0"
              checked={gender == "0"}
              onChange={handleChange}
            ></Bt.FormCheck.Input>
            <Bt.FormCheck.Label htmlFor="flexRadio1">Nam</Bt.FormCheck.Label>
          </Bt.FormCheck>
          <Bt.FormCheck className="form-check-inline">
            <Bt.FormCheck.Input
              type="radio"
              id="flexRadio2"
              value="1"
              checked={gender == "1"}
              onChange={handleChange}
            ></Bt.FormCheck.Input>
            <Bt.FormCheck.Label htmlFor="flexRadio2">Nữ</Bt.FormCheck.Label>
          </Bt.FormCheck>
        </Bt.FormGroup>
        <Bt.FormGroup className="mb-3" controlId="formAddress">
          <Bt.FormLabel className="fw-semibold fs-4">Địa chỉ</Bt.FormLabel>
          <Bt.FormControl
            type="text"
            placeholder="Nhập địa chỉ"
            className="rounded-0"
            name="diaChi"
            value={diaChi}
            onChange={(e) => setDiachi(e.target.value)}
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
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
          ></Bt.FormControl>
          <span className="text-danger">{errorSdt}</span>
        </Bt.FormGroup>
        <Bt.Button
          variant="primary"
          type="submit"
          className="rounded-0 py-2 mt-3"
          // onClick={showModal}
        >
          Lưu thay đổi
        </Bt.Button>
      </Bt.Form>
    </>
  );
};

export default AccountEdit;
