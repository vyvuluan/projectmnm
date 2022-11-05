import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Bt from "react-bootstrap";
import swal from "sweetalert";
import DatePicker from "react-date-picker";
const UpdateCtPN = ({ idSP,idPN, showModal }) => {
    // console.log(dataCTPN);
    const [CTPN, setCTPN] = useState({
        soluong: "",
        gia: "",
      });
    const handleInput = (e) => {
        e.persist();
        // console.log(e.target.value);
        setCTPN({ ...CTPN, [e.target.name]: e.target.value });
      };
  const handleUpdate = (e) => {
    e.preventDefault();

    const data = {
      soluong: CTPN.soluong,
      gia: CTPN.gia,
      
    };
    // console.log(e.target.value);
    // console.log(ngaySinh);
    
    axios
      .put(`api/kho/updateCtPN/${idPN}/${idSP}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          swal({
            title: "sửa thành công",
            icon: "success",
            button: "đóng",
          });
          showModal(false);
          
        }
        if (res.data.status == 400) {
          swal({
            title: "Nhập sai định dạng",
            icon: "warning",
            button: "đóng",
          });
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
      
  } 
  return (
    <>
      <Bt.Form onSubmit={handleUpdate} >
        <Bt.FormGroup className="mb-3" controlId="formName">
          <Bt.FormLabel className="fw-semibold fs-4">Số lượng</Bt.FormLabel>
          <Bt.FormControl
            type="text"
            name="soluong"
            placeholder="Số lượng"
            className="rounded-0"
            value={CTPN.soluong}
            onChange={handleInput}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>

        <Bt.FormGroup className="mb-3" controlId="formAddress">
          <Bt.FormLabel className="fw-semibold fs-4">Giá</Bt.FormLabel>
          <Bt.FormControl
            type="text"
            placeholder="Giá"
            className="rounded-0"
            name="gia"
            value={CTPN.gia}
            onChange={handleInput}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>
        
          {/* <span className="text-danger">{errorSdt}</span> */}
        <Bt.Button
          variant="primary"
          type="submit"
          className="rounded-0 py-2 mt-3"
          //   onClick={showModal}
        >
          Chỉnh sửa
        </Bt.Button>
      </Bt.Form>
    </>
  );
};

export default UpdateCtPN;
