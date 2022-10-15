import React, { useState } from "react";
import * as B from "react-bootstrap";

const Bill = () => {
  return (
    <>
      <B.FormLabel style={{ fontSize: "30px" }}>Phiếu xuất</B.FormLabel>
      <B.FormGroup>
        <B.FormLabel>ID</B.FormLabel>
        <B.FormControl
          style={{ width: "15%" }}
          disabled
          type="text"
        ></B.FormControl>
      </B.FormGroup>
      <B.FormGroup>
        <B.FormLabel>ID nhân viên</B.FormLabel>
        <B.FormControl style={{ width: "15%" }} type="text"></B.FormControl>
      </B.FormGroup>
      <B.FormGroup>
        <B.FormLabel>ID khách hàng</B.FormLabel>
        <B.FormControl style={{ width: "15%" }} type="text"></B.FormControl>
      </B.FormGroup>
      <B.FormGroup controlId="">
        <B.FormLabel>Trạng thái đơn hàng</B.FormLabel>

        <B.Form.Select
          size="sm"
          style={{ width: "15%" }}
          aria-label="Default select example"
        >
          <option>--Trạng thái--</option>
          <option value="1">Đã hoàn thành</option>
          <option value="2">Chưa hoàn thành</option>
        </B.Form.Select>
      </B.FormGroup>

      <B.FormGroup controlId="">
        <B.FormLabel>Phương thức thanh toán</B.FormLabel>

        <B.Form.Select
          size="sm"
          style={{ width: "15%" }}
          aria-label="Default select example"
        >
          <option>--Chọn phương thức--</option>
          <option value="1">COD</option>
          <option value="2">PayPal</option>
        </B.Form.Select>
      </B.FormGroup>
      <B.FormGroup controlId="">
        <B.FormLabel>Địa chỉ</B.FormLabel>
        <B.FormControl as="textarea" rows={3}></B.FormControl>
      </B.FormGroup>
      <B.FormGroup controlId="">
        <B.FormLabel>Tổng tiền</B.FormLabel>
        <B.FormControl style={{ width: "15%" }} type="text"></B.FormControl>
      </B.FormGroup>

      <B.Button variant="primary" className="rounded mt-3" type="submit">
        Thêm
      </B.Button>
    </>
  );
};
export default Bill;
