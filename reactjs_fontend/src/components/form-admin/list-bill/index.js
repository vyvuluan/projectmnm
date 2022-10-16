import React from "react";
import { Table, FormLabel } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const ListBill = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5 mb-4">
          <FormLabel
            style={{ fontSize: "30px" }}
            className="fw-bold text-primary mb-4 text-capitalize"
          >
            Danh sách đơn hàng
          </FormLabel>
          <Table responsive>
            <thead>
              <tr>
                <th>#ID</th>
                <th>ID khách hàng</th>
                <th>ID customer</th>
                <th>Trạng thái</th>
                <th>PT thanh toán</th>
                <th>Địa chỉ</th>

                <th>Tổng tiền</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@md</td>
                <td>1</td>
                <td style={{ wordBreak: "break-word", maxWidth: "250px" }}>
                  ádasdadd
                </td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Link to="/ListBillDetail">
                    <button
                      onClick
                      type="submit"
                      className="border-0 bg-primary rounded "
                    >
                      <AiFillEye className="me-1" />
                      Xem
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default ListBill;
