import React, { useCallback, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import * as B from 'react-bootstrap'
import imgage from '../../../img/user.jpg'
import axios from 'axios'
import swal from 'sweetalert'

function Index() {
    const [orderlist, setOrderlist] = useState([]);
    const [submitting, setSubmitting] = useState(true);

    function formatMoney(money) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(money);
    }

    const getOrderData = useCallback(async () => {
        const res = await axios.get(`/api/danh-sach-don-hang-khach-hang`)
        if (res.status === 200) {
            setOrderlist(res.data.donHang.data);
        }
    }, []);

    useEffect(() => {
        getOrderData().then(() => setSubmitting(false))
    }, [submitting, getOrderData]);

    const checkStatus = (status) => {
        var x;
        switch (status) {
            case 0: {
                x = 'Chờ xác nhận';
                break;
            }
            case 1: {
                x = 'Đã xác nhận';
                break;
            }
            case 2: {
                x = 'Đang đóng gói';
                break;
            }
            case 3: {
                x = 'Đang vận chuyển';
                break;
            }
            case 4: {
                x = 'Giao hàng thành công';
                break;
            }
            case 5: {
                x = 'Hủy đơn hàng';
                break;
            }
            default: {
                break;
            }
        }
        return x;
    }

    const handleAbortOrder = (data) => {
        const id = data;
        axios.put(`/api/huyDH/${id}`).then(res => {
            if (res.data.status === 200) {
                setSubmitting(true);
                swal('Thành công', res.data.message, 'success')
            } else if (res.data.status === 400) {
                swal('Thất bại', res.data.message, 'warning')
            }
        })
    }

    return (
        <>
            <B.Container fluid className="bg-secondary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: "300px" }}
                >
                    <h1 className="fw-semibold text-uppercase mb-3">Đơn hàng của tôi</h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <Link to={"/"} className="text-decoration-none" variant="primary">
                                Home
                            </Link>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0 text-muted">Đơn hàng</p>
                    </div>
                </div>
            </B.Container>

            <B.Container className='px-lg-5 pb-lg-5'>
                <B.Row>
                    <B.Col lg className='d-none d-lg-block'>
                        <label className='fs-5'>Đơn hàng của bạn</label>
                        <label className='fs-5'>Hỗ trợ 24/7 các ngày trong tuần</label>
                        <label className='fs-5'>Nếu không thể hủy đơn hàng liên hệ bên dưới</label>
                        <label className='fs-5 fst-italic fw-normal'>Hotline: 0123498765</label>
                        <label className='fs-5 fst-italic fw-normal'>Email: hotrol3m@gmail.com</label>
                    </B.Col>
                    <B.Col lg={8}>
                        {orderlist && orderlist.map((order) => {
                            return (
                                <B.Row className='bg-secondary px-3 py-3 mb-3' key={order.id}>
                                    <div className='d-flex justify-content-between border-bottom border-muted mb-2'>
                                        <div><span className='fs-6'>Đơn hàng số: {order.id}</span><span className='mx-2'>|</span><span>{order.pt_ThanhToan}</span></div>
                                        <span className='text-danger fs-6 mb-1'>{checkStatus(order.status)}</span>
                                    </div>
                                    {order.pxct.map((prod) => {
                                        return (
                                            <div className='d-flex border-bottom mb-2'>
                                                <B.Col lg={2}>
                                                    <img src={imgage} alt='' className='border py-1 px-1 me-2 mb-2'></img>
                                                </B.Col>
                                                <B.Col lg={6}>
                                                    <h4>{prod.product.tenSP}</h4>
                                                    <span>Số lượng: {prod.soluong}</span>
                                                </B.Col>
                                                <B.Col lg={4} className='text-end'>
                                                    <h5 className='mt-5 text-primary'>{formatMoney(prod.gia)}</h5>
                                                </B.Col>
                                            </div>
                                        )
                                    })}
                                    <div className='text-end mb-2'>
                                        {order.pt_ThanhToan === 'COD' ? <h6>Tổng tiền: <span className='fs-5'>{formatMoney(order.tongTien)}</span></h6>
                                            : <h5 className='text-primary'>Đã thanh toán</h5>
                                        }
                                    </div>
                                    <div>
                                        {order.status === 5 ? <Link to={`/myorder/checkorder/${order.id}`}><B.Button variant='primary' className='rounded-0 pull-right me-2'>Xem chi tiết đơn hàng</B.Button></Link>
                                            : <div>
                                                <B.Button variant='outline-primary' className='rounded-0 pull-right' onClick={() => handleAbortOrder(order.id)}>Hủy đơn hàng</B.Button>
                                                <Link to={`/myorder/checkorder/${order.id}`}><B.Button variant='primary' className='rounded-0 pull-right me-2'>Xem chi tiết đơn hàng</B.Button></Link>
                                            </div>
                                        }
                                    </div>
                                </B.Row>
                            )
                        })}
                    </B.Col>
                </B.Row>
            </B.Container>
        </>
    )
}

export default Index;
