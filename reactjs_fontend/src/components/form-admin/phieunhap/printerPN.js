import * as B from "react-bootstrap";

const PrinterPN = ({componentRef,formatMoney,viewPn}) => {
    console.log(viewPn);
    let date = new Date().toLocaleString("vi-VN", { day: '2-digit' });
    let month = new Date().toLocaleString("vi-VN", { month: "long" });
    let year = new Date().getFullYear();
  return (
    <>
      <div ref={componentRef}>
        <B.ModalHeader>
          <B.ModalTitle>
            <div className="text-primary fw-bold">
              L3M
              <span className="text-dark">SHOP</span>
              <p className="fs-6 text-dark fw-semibold">Mã phiếu nhập: {viewPn.id}</p>
            </div>
          </B.ModalTitle>
          <B.ModalTitle>
            <div>
              Hóa đơn phiếu nhập
              <p className="fs-6">
                Ngày {date} {month} Năm {year}
              </p>
            </div>
          </B.ModalTitle>
        </B.ModalHeader>
        <B.Row className="px-3 mt-2">
          <div className="fs-6">Công ty TNHH thương mại L3M</div>
          <div className="fs-6">
            Địa chỉ: 273 An D. Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh
          </div>
          <div className="fst-italic fs-6">
            Hotline: 0123498765
            <span className="ms-5">Email: l3mstore@gmail.com</span>
          </div>
        </B.Row>
        <hr />
        <B.ModalBody>
          <B.Row>
            <B.FormGroup className="d-flex justify-content-between">
              <B.FormLabel className="fs-6">Nhà cung cấp:</B.FormLabel>
              <B.FormLabel className="fs-6 ms-2 mb-3 text-success">
                {viewPn.ncc.tenNCC}
              </B.FormLabel>
            </B.FormGroup>
            <B.FormGroup className="d-flex justify-content-between">
              <B.FormLabel className="fs-6">Số điện thoại:</B.FormLabel>
              <B.FormLabel className="fs-6 ms-2 mb-3 text-success">
              {viewPn.ncc.sdt}

              </B.FormLabel>
            </B.FormGroup>
            <B.FormGroup className="d-flex justify-content-between">
              <B.FormLabel className="fs-6">Địa chỉ:</B.FormLabel>
              <B.FormLabel className="fs-6 ms-2 mb-3 text-success text-end">
              {viewPn.ncc.diaChi}

              </B.FormLabel>
            </B.FormGroup>
          </B.Row>
          <hr />
          <B.Row>
            <B.Table
              responsive="sm"
              className="table-borderless border border-muted mb-0"
            >
              <thead
                className="text-dark"
                style={{ backgroundColor: "#edf1ff" }}
              >
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {viewPn.pnct.map((item1, index) => {
              return (
                <>
                  <tr key={item1.pn_id}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{item1.product.tenSP}</td>
                    <td className="align-middle">{item1.soluong}</td>
                    <td className="align-middle">{formatMoney(item1.gia)}</td>
                  </tr>
                </>
              );
            })}
              </tbody>
              <tfoot className="border-top">
                <tr>
                  <td></td>
                  <td></td>
                  <td className="fw-semibold">Tổng tiền: </td>
                  <td>{formatMoney(viewPn.tongTien)}</td>
                </tr>
              </tfoot>
            </B.Table>
          </B.Row>
          <B.Row className="px-3 mt-2">
            <B.Row className="mb-5">
              <B.Col></B.Col>
              <B.Col sm={3} className="text-right">
                <div className="pe-5">
                  <span className="font-weight-bold">Thủ kho</span>
                  <p className="fst-italic me-2">Ký tên</p>
                </div>
              </B.Col>
            </B.Row>
            <div className="fst-italic mt-5">
              Vui lòng giữ lại hóa đơn trong vòng 1 tháng sau khi nhập hàng
            </div>
          </B.Row>
        </B.ModalBody>
      </div>
    </>
  );
};
export default PrinterPN;
