import React, { useCallback, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import * as B from 'react-bootstrap'
import imgage from '../../../img/user.jpg'
import axios from 'axios'
import Pagination from '../../form/pagination/index'
import swal from 'sweetalert'
import Breadcum from '../breadcum/index'

function Index() {
    const [orderlist, setOrderlist] = useState([]);
    const [submitting, setSubmitting] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [perPage, setPerPage] = useState();
    const [currentPage, setCurrentPage] = useState();
    const handlePerPage = (page) => {
        setPage(page);
    };

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
        pageNumbers.push(i);
    }

    function formatMoney(money) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(money);
    }

    const getOrderData = useCallback(async () => {
        const res = await axios.get(`/api/danh-sach-don-hang-khach-hang?page=${page}`)
        if (res.status === 200) {
            setOrderlist(res.data.donHang.data);
            setTotalPage(res.data.donHang.total);
            setPerPage(res.data.donHang.per_page);
            setCurrentPage(res.data.donHang.current_page)
        }
    }, [page]);

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

        swal({
            title: 'Hủy đơn hàng sẽ không thể hoàn tác',
            text: 'Bạn chắc chứ?',
            icon: 'warning',
            buttons: {
                cancel: "Hủy bỏ",
                abort: {
                    text: "Hủy đơn hàng",
                    value: "abort",
                },
            }
        }).then((value) => {
            if (value === 'abort') {
                axios.put(`/api/huyDH/${id}`).then(res => {
                    if (res.data.status === 200) {
                        setSubmitting(true);
                        swal('Thành công', res.data.message, 'success')
                    } else if (res.data.status === 400) {
                        swal('Thất bại', res.data.message, 'warning')
                    }
                })
            }
        })
    }

    return (
        <>
            <Breadcum
                title='Đơn hàng của tôi'
                name='Đơn hàng'
                BC={1}
            />

            <B.Container className='px-lg-5 pb-lg-5'>
                <B.Row>
                    <B.Col lg className='d-none d-lg-block'>
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
                                        <span className='text-danger fs-6 mb-1'>{order.status === 0 && (order.pt_ThanhToan === 'VnPay' || order.pt_ThanhToan === 'Paypal') ?
                                            'Thanh toán thất bại'
                                            : checkStatus(order.status)}</span>
                                    </div>
                                    {order.pxct.map((prod) => {
                                        return (
                                            <div className='d-flex border-bottom mb-2'>
                                                <B.Col lg={2}>
                                                    <img src={`http://localhost:8000/uploadhinh/${prod.product.hinh}`} alt='' className='border py-1 px-1 me-2 mb-2' style={{ width: '100%' }}></img>
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
                                        {order.pt_ThanhToan === 'COD' ?
                                            <>
                                                <h6>Giảm giá: <span className='fs-5'>{order.discount}%</span></h6>
                                                <h6>Tổng tiền: <span className='fs-5'>{formatMoney(order.tongTien)}</span></h6>
                                            </>
                                            : order.status === 0 && (order.pt_ThanhToan === 'VnPay' || order.pt_ThanhToan === 'Paypal') ?
                                                <h5 className='text-primary'>Thanh toán thất bại</h5>
                                                : <h5 className='text-primary'>Đã thanh toán</h5>
                                        }
                                    </div>
                                    <div>
                                        {order.status === 0 || order.status === 1 ?
                                            <div>
                                                <B.Button variant='outline-primary' className='rounded-0 pull-right' onClick={() => handleAbortOrder(order.id)}>Hủy đơn hàng</B.Button>
                                                <Link to={`/myorder/checkorder/${order.id}`}><B.Button variant='primary' className='rounded-0 pull-right me-2'>Xem tình trạng</B.Button></Link>
                                            </div>
                                            : <Link to={`/myorder/checkorder/${order.id}`}><B.Button variant='primary' className='rounded-0 pull-right'>Xem tình trạng</B.Button></Link>
                                        }
                                    </div>
                                </B.Row>
                            )
                        })}
                        <div className='mt-5'>
                            <Pagination currentPage={currentPage} totalPage={pageNumbers} handlePerPage={handlePerPage} />
                        </div>
                    </B.Col>
                </B.Row>
            </B.Container>
        </>
    )
}

export default Index;
