import React from 'react'
import * as B from 'react-bootstrap'

const billkho = (props) => {

    function formatMoney(money) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(money);
    }

    let date = new Date().toLocaleString("vi-VN", { day: '2-digit' });
    let month = new Date().toLocaleString("vi-VN", { month: "long" });
    let year = new Date().getFullYear();

    return (
        <>
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
        </>
    )
}

export default billkho