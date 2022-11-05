import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Bt from "react-bootstrap";
import swal from "sweetalert";
import DatePicker from "react-date-picker";
const ShowCTPN = ({ showModal }) => {
    
  return (
    <>
      <Bt.Form >
        <Bt.FormGroup className="mb-3" controlId="formName">
          <Bt.FormLabel className="fw-semibold fs-4">Xem chi tiết</Bt.FormLabel>
          <Bt.FormControl
            type="text"
            name=""
            placeholder=""
            className="rounded-0"
            // value={NCC.tenNCC}
            // onChange={handleInput}
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
            // value={NCC.diaChi}
            // onChange={handleInput}
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
            // value={NCC.sdt}
            // onChange={handleInput}
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

export default ShowCTPN;
