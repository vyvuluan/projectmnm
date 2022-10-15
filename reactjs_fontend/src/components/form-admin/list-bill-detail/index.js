import React from "react";
import { Table, FormLabel, Button } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const ListBillDetail = () => {
  return (
    <>
      <FormLabel style={{ fontSize: "30px" }}>Chi tiết đơn hàng</FormLabel>

      <Table responsive>
        <thead>
          <tr>
            <th>#ID</th>
            <th>ID Sản phẩm</th>
            <th>Số lượng </th>
            <th>Giá</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@md</td>
            <td>1</td>
          </tr>
        </tbody>
      </Table>
      <Link to="/ListBill">
        <Button
          variant="primary"
          className="rounded mr-2"
          type="submit"
          style={{ position: "absolute", top: "0", right: "0" }}
        >
          Quay lại
        </Button>
      </Link>
    </>
  );
};
export default ListBillDetail;
