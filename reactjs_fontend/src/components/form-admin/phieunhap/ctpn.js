import * as B from "react-bootstrap";
import { AiOutlineFileAdd, AiFillEye } from "react-icons/ai";
import { FiTool } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { BiReset, BiEdit } from "react-icons/bi";

const Ctpn = ({
  tongTienPN,
  handleDelete,
  handleShowUpdateCtPN,
  viewPn,
  handleCloseTab,
  handleReloadCTPN,
  // handleReloadShowCTPNtab3,
}) => {
  // console.log(viewPn);
  const status = viewPn.status;
  function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  return (
    <>
      <B.Row className="px-xl-3 mb-3">
        <B.Col lg={8} xs={8}>
          <h5 className="text-primary mb-3">Chi tiết phiếu nhập</h5>
        </B.Col>
        <B.Col lg={4} xs={4} className="text-end">
          <FaTimes
            data-toggle="tooltip"
            data-placement="bottom"
            title="Đóng"
            className="fs-3 customborder"
            onClick={handleCloseTab}
          />
           
        </B.Col>
      </B.Row>
      <B.Form>
        <B.Table className=" text-right table-borderless border border-secondary text-center mb-0">
          <thead className="text-dark" style={{ backgroundColor: "#edf1ff" }}>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              {status == 1 ? null : (
                <>
                  <th>Thao tác</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="align-middle">
            {viewPn.pnct && viewPn.pnct.map((item1, index) => {
              return (
                <>
                  <tr key={item1.pn_id}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{item1.product.tenSP}</td>
                    <td className="align-middle">{item1.soluong}</td>
                    <td className="align-middle">{formatMoney(item1.gia)}</td>

                    {status == 1 ? null : (
                      <>
                        <td className="align-middle fs-5 text-primary">
                          <FiTool
                            type="button"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Sửa chi tiết phiếu nhập"
                            style={{ marginRight: "15px" }}
                            onClick={() => handleShowUpdateCtPN(item1)}
                          />
                          <MdDeleteForever
                            type="button"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Xóa chi tiết phiếu nhập"
                            onClick={() =>
                              handleDelete(item1.pn_id, item1.product_id)
                            }
                          />
                        </td>
                      </>
                    )}
                  </tr>
                </>
              );
            })}
          </tbody>
        </B.Table>
        <h5 className="text-right mt-2 text-primary">
          Tổng tiền: {formatMoney(tongTienPN)}
        </h5>
      </B.Form>
    </>
  );
};
export default Ctpn;
 