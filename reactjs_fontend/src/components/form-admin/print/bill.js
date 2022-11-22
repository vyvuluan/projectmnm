import React from 'react'
import * as B from 'react-bootstrap'

const bill = (props) => {

    function formatMoney(money) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(money);
    }

    let date = new Date().toLocaleString("vi-VN", { day: '2-digit' });
    let month = new Date().toLocaleString("vi-VN", { month: "long" });
    let year = new Date().getFullYear();

    var bill_html = '';
    if (props.tenPhieu === 'px') {
        bill_html =
            <div>
                <B.ModalHeader>
                    <B.ModalTitle>
                        <div className='text-primary fw-bold'>
                            L3M
                            <span className='text-dark'>SHOP</span>
                            <p className='fs-6 text-dark fw-semibold'>Mã hóa đơn: {props.billCode}</p>
                        </div>
                    </B.ModalTitle>
                    <B.ModalTitle>
                        <div>
                            Hóa đơn bán hàng
                            <p className='fs-6'>Ngày {date} {month} Năm {year}</p>
                        </div>
                    </B.ModalTitle>
                </B.ModalHeader>
                <B.Row className='px-3 mt-2'>
                    <div className='fs-6'>Công ty TNHH thương mại L3M</div>
                    <div className='fs-6'>Địa chỉ: 273 An D. Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh</div>
                    <div className='fst-italic fs-6'>Hotline: 0123498765<span className='ms-5'>Email: l3mstore@gmail.com</span></div>
                </B.Row>
                <hr />
                <B.ModalBody>
                    <B.Row>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Họ và tên khách hàng:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{props.tenKH}</B.FormLabel>
                        </B.FormGroup>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Số điện thoại khách hàng:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{props.sdt}</B.FormLabel>
                        </B.FormGroup>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Địa chỉ:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success text-end'>{props.diaChi}</B.FormLabel>
                        </B.FormGroup>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Phương thức thanh toán:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{props.pttt}</B.FormLabel>
                        </B.FormGroup>
                    </B.Row>
                    <hr />
                    <B.Row>
                        <B.Table responsive='sm' className='table-borderless border border-muted mb-0'>
                            <thead className='text-dark'>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Bảo hành</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data && props.data.pxct.map((prod) => {
                                    return (
                                        <>
                                            <tr key={prod.product.id}>
                                                <td>{prod.product.tenSP}</td>
                                                <td>{prod.soluong}</td>
                                                <td>{prod.product.baoHanh} tháng</td>
                                                <td>{formatMoney(prod.product.gia)}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                            <tfoot className='border-top'>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Tạm tính: </td>
                                    <td>{props.discount !== 0 ? formatMoney(props?.tongTien / (1 - props?.discount / 100)) : formatMoney(props?.tongTien)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Giảm giá: </td>
                                    <td>{props.discount}%</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className='fw-semibold'>Tổng tiền: </td>
                                    <td>{formatMoney(props.tongTien)}</td>
                                </tr>
                            </tfoot>
                        </B.Table>
                    </B.Row>
                    <B.Row className='px-3 mt-2'>
                        <B.Row className='mb-5'>
                            <B.Col>
                                <p>Khách hàng
                                    <p className='fst-italic ms-3'>Ký tên</p>
                                </p>
                            </B.Col>
                            <B.Col className='text-end'>
                                <p>Nhân viên bán hàng
                                    <p className='fst-italic me-5'>Ký tên</p></p>
                            </B.Col>
                        </B.Row>
                        <div className='fst-italic mt-5'>Vui lòng giữ lại hóa đơn trong vòng 1 tháng sau khi mua hàng</div>
                    </B.Row>
                </B.ModalBody>
            </div>
    } else if (props.tenPhieu === 'pn') {
        bill_html =
            <div>
                <B.ModalHeader>
                    <B.ModalTitle>
                        <div className='text-primary fw-bold'>
                            L3M
                            <span className='text-dark'>SHOP</span>
                            <p className='fs-6 text-dark fw-semibold'>Mã phiếu nhập: {props.billCode}</p>
                        </div>
                    </B.ModalTitle>
                    <B.ModalTitle>
                        <div>
                            Hóa đơn phiếu nhập
                            <p className='fs-6'>Ngày {date} {month} Năm {year}</p>
                        </div>
                    </B.ModalTitle>
                </B.ModalHeader>
                <B.Row className='px-3 mt-2'>
                    <div className='fs-6'>Công ty TNHH thương mại L3M</div>
                    <div className='fs-6'>Địa chỉ: 273 An D. Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh</div>
                    <div className='fst-italic fs-6'>Hotline: 0123498765<span className='ms-5'>Email: l3mstore@gmail.com</span></div>
                </B.Row>
                <hr />
                <B.ModalBody>
                    <B.Row>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Nhà cung cấp:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{props.tenNCC}</B.FormLabel>
                        </B.FormGroup>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Số điện thoại:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{props.sdt}</B.FormLabel>
                        </B.FormGroup>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Địa chỉ:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success text-end'>{props.diaChi}</B.FormLabel>
                        </B.FormGroup>
                    </B.Row>
                    <hr />
                    <B.Row>
                        <B.Table responsive='sm' className='table-borderless border border-muted mb-0'>
                            <thead className='text-dark'>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data.pnct.map((item1, index) => {
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
                                    <td>{formatMoney(props.tongTien)}</td>
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
    } else if (props.tenPhieu === 'ycxk') {
        bill_html =
            <div>
                <B.ModalHeader>
                    <B.ModalTitle>
                        <div className='text-primary fw-bold'>
                            L3M
                            <span className='text-dark'>SHOP</span>
                            <p className='fs-6 text-dark fw-semibold'>Mã hóa đơn: {props.billCode}</p>
                        </div>
                    </B.ModalTitle>
                    <B.ModalTitle>
                        <div>
                            Phiếu yêu cầu xuất kho
                            <p className='fs-6'>Ngày {date} {month} Năm {year}</p>
                        </div>
                    </B.ModalTitle>
                </B.ModalHeader>
                <B.ModalBody>
                    <B.Row>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Họ và tên khách hàng:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{props.tenKH}</B.FormLabel>
                        </B.FormGroup>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Số điện thoại khách hàng:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{props.sdt}</B.FormLabel>
                        </B.FormGroup>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Địa chỉ:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success text-end'>{props.diaChi}</B.FormLabel>
                        </B.FormGroup>
                        <B.FormGroup className='d-flex justify-content-between'>
                            <B.FormLabel className='fs-6'>Phương thức thanh toán:</B.FormLabel>
                            <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{props.pttt}</B.FormLabel>
                        </B.FormGroup>
                    </B.Row>
                    <hr />
                    <B.Row>
                        <B.Table responsive='sm' className='table-borderless border border-muted mb-0'>
                            <thead className='text-dark'>
                                <tr>
                                    <th>Mã sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data && props.data.pxct.map((prod) => {
                                    return (
                                        <>
                                            <tr key={prod.product.id}>
                                                <td>{prod.product.id}</td>
                                                <td>{prod.product.tenSP}</td>
                                                <td>{prod.soluong}</td>
                                                <td>{formatMoney(prod.product.gia)}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </B.Table>
                    </B.Row>
                    <B.Row className='px-3 mt-2'>
                        <B.Row className='mb-5'>
                            <B.Col>
                                <p>Nhân viên kho
                                    <p className='fst-italic ms-4'>Ký tên</p>
                                </p>
                            </B.Col>
                            <B.Col className='text-end'>
                                <p>Nhân viên bán hàng
                                    <p className='fst-italic me-5'>Ký tên</p></p>
                            </B.Col>
                        </B.Row>
                        <div className='fst-italic mt-5'>Nhân viên kho giữ lại phiếu sau khi xuất kho</div>
                    </B.Row>
                </B.ModalBody>
            </div>
    }

    return (
        <>
            {bill_html}
        </>
    )
}

export default bill