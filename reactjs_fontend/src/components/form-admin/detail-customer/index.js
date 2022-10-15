import React, { useState } from "react";
import * as B from "react-bootstrap";

const DetailCustomer = () => {
  return (
    <>
      <B.FormLabel style={{ fontSize: "30px" }}>
        Thông tin khách hàng
      </B.FormLabel>
      <B.FormGroup>
        <B.FormLabel>ID</B.FormLabel>
        <B.FormControl
          style={{ width: "15%" }}
          disabled
          type="text"
        ></B.FormControl>
      </B.FormGroup>
      <B.FormGroup>
        <B.FormLabel>Họ tên</B.FormLabel>
        <B.FormControl type="text"></B.FormControl>
      </B.FormGroup>
      <B.FormGroup controlId="">
        <B.FormLabel>Ngày sinh</B.FormLabel>
        <B.FormControl type="text"></B.FormControl>
      </B.FormGroup>
      <B.FormGroup controlId="">
        <B.FormLabel>Địa chỉ</B.FormLabel>
        <B.FormControl as="textarea" rows={3}></B.FormControl>
      </B.FormGroup>
      <B.FormGroup controlId="">
        <B.FormLabel>Số điện thoại</B.FormLabel>
        <B.FormControl></B.FormControl>
      </B.FormGroup>
      <B.FormLabel>Giới tính</B.FormLabel>

      <B.Form.Select
        size="sm"
        style={{ width: "15%" }}
        aria-label="Default select example"
      >
        <option>--Chọn giới tính--</option>
        <option value="1">Nữ</option>
        <option value="2">Nam</option>
      </B.Form.Select>

      <B.Button variant="primary" className="rounded mt-3" type="submit">
        Chỉnh sửa
      </B.Button>
    </>
  );
};
export default DetailCustomer;
