import React, { useState, useEffect } from 'react'
import axios from 'axios';
import swal from 'sweetalert'
import { Link, useNavigate } from 'react-router-dom'
import { MdPayments } from 'react-icons/md'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { BiEdit } from 'react-icons/bi'
import * as B from 'react-bootstrap'

function Checkout() {

    const navaigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [checkoutInput, setCheckoutInput] = useState({
        fullname: '',
        phonenumber: '',
        email: '',
        address: '',
        state: '',
        city: '',
        zipcode: '',
    });

    const [error, setError] = useState([]);

    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;



    // if(!localStorage.getItem('auth_token')){
    //     navaigate.push('/');
    //     swal('Warning','Vui lòng login để mua hàng','error');
    // }

    function formatMoney(money) {
        return (
            new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(money)
        )
    }

    useEffect(() => {

        let isMounted = true;

        axios.get(`http://localhost:8000/api/cart`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    navaigate.push('/');
                    swal('Warning', res.data.message, 'error');
                }
            }
        });

        return () => {
            isMounted = false
        }

    }, [navaigate]);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
            fullname: checkoutInput.fullname,
            phonenumber: checkoutInput.phonenumber,
            email: checkoutInput.email,
            address: checkoutInput.address,
            state: checkoutInput.state,
            city: checkoutInput.city,
            zipcode: checkoutInput.zipcode,
        }

        axios.post(`http://localhost:8000/api/dathang`, data).then(res => {
            if (res.data.status === 200) {
                swal('Đặt hàng thành công', res.data.message, 'success');
                setError([]);
                navaigate.push('/thank-you');
            }
            else if (res.data.status === 422) {
                swal('Vui lòng điều đầy đủ vào các mục', '', 'error');
                setError(res.data.errors);
            }
        });
    }

    if (loading) {
        return <h4>Loading...</h4>
    }

    var checkout_HTML = '';
    if (cart.length > 0) {
        checkout_HTML =
            <div>
                <B.Row className='px-xl-5'>
                    <B.Col md={7}>
                        <B.Card className='border-secondary rounded-0' mb={5}>
                            <B.Card.Header className='bg-secondary border-0 rounded-0'>
                                <h3 className='fw-semibold m-0'>Thông tin thanh toán</h3>
                            </B.Card.Header>
                            <B.Card.Body>
                                <B.Row>
                                    <B.Col md={12}>
                                        <B.FormGroup className='mb-3'>
                                            <B.FormLabel>Họ và tên</B.FormLabel>
                                            <B.FormControl type='text' name='fullname' onChange={handleInput} value={checkoutInput.fullname}
                                                className='rounded-0 shadow-none'></B.FormControl>
                                            <small className='text-danger'>{error.fullname}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col md={6}>
                                        <B.FormGroup className='mb-3'>
                                            <B.FormLabel>Số điện thoại</B.FormLabel>
                                            <B.FormControl type='text' name='phonenumber' onChange={handleInput} value={checkoutInput.phonenumber}
                                                className='rounded-0 shadow-none'></B.FormControl>
                                            <small className='text-danger'>{error.phonenumber}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col md={6}>
                                        <B.FormGroup className='mb-3'>
                                            <B.FormLabel>Email</B.FormLabel>
                                            <B.FormControl type='email' name='email' onChange={handleInput} value={checkoutInput.email}
                                                className='rounded-0 shadow-none'></B.FormControl>
                                            <small className='text-danger'>{error.email}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col md={12}>
                                        <B.FormGroup className='mb-3'>
                                            <B.FormLabel>Địa chỉ</B.FormLabel>
                                            <B.FormControl as='textarea' rows={4} name='address' onChange={handleInput} value={checkoutInput.address}
                                                className='rounded-0 shadow-none'></B.FormControl>
                                            <small className='text-danger'>{error.address}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col md={4}>
                                        <B.FormGroup className='mb-3'>
                                            <B.FormLabel>Quận/Huyện</B.FormLabel>
                                            <B.FormControl type='text' name='state' onChange={handleInput} value={checkoutInput.state}
                                                className='rounded-0 shadow-none'></B.FormControl>
                                            <small className='text-danger'>{error.state}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col md={4}>
                                        <B.FormGroup className='mb-3'>
                                            <B.FormLabel>Thành phố</B.FormLabel>
                                            <B.FormControl type='text' name='city' onChange={handleInput} value={checkoutInput.city}
                                                className='rounded-0 shadow-none'></B.FormControl>
                                            <small className='text-danger'>{error.city}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col md={4}>
                                        <B.FormGroup className='mb-3'>
                                            <B.FormLabel>Zip code</B.FormLabel>
                                            <B.FormControl type='text' name='zipcode' onChange={handleInput} value={checkoutInput.zipcode}
                                                className='rounded-0 shadow-none'></B.FormControl>
                                            <small className='text-danger'>{error.zipcode}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                </B.Row>
                            </B.Card.Body>
                            <B.Card.Footer className='border-secondary bg-transparent text-end'>
                                <B.Button className='rounded-0 my-3 py-2 fw-semibold' variant='primary'
                                    onClick={submitOrder}>
                                    <BsFillBagCheckFill className='me-2 fs-4' />Đặt hàng
                                </B.Button>
                            </B.Card.Footer>
                        </B.Card>
                    </B.Col>

                    <B.Col md={5} className='d-grd gap-2 mx-auto table-responsive mb-5' >
                        <B.Table className='table-bordered border border-secondary text-center mb-0'>
                            <thead className='text-dark fs-5' style={{ backgroundColor: '#edf1ff' }}>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>
                                {cart.map((item, index) => {
                                    totalCartPrice += item.product.gia * item.soLuongSP;
                                    return (
                                        <tr key={index}>
                                            <td className='align-middle'>{item.product.tenSP}</td>
                                            <td className='align-middle'>{formatMoney(item.product.gia)}</td>
                                            <td className='align-middle'>{item.soLuongSP}</td>
                                            <td className='align-middle'>{formatMoney(item.product.gia * item.soLuongSP)}</td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td colSpan={2} className='text-end fw-semibold fs-5'>Thuế</td>
                                    <td colSpan={2} className='text-end fw-semibold fs-5'>10%</td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className='text-end fw-semibold fs-4'>Tổng tiền</td>
                                    <td colSpan={2} className='text-end fw-semibold fs-5'>{formatMoney(totalCartPrice * 1.1)}</td>
                                </tr>
                            </tbody>
                        </B.Table>
                    </B.Col>
                </B.Row>
            </div>
    }
    else {
        checkout_HTML = <div>
            <div className='card card-body py-5 text-center shadow-sm rounded-0'>
                <h4>Giỏ hàng trống</h4>
            </div>
        </div>
    }

    return (
        <>
            <B.Container fluid className='bg-secondary mb-5'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '300px' }}>
                    <h1 className='fw-semibold text-uppercase mb-3'>Thanh toán</h1>
                    <div className='d-inline-flex'>
                        <p className='m-0'><a href='' className='text-decoration-none' variant='primary'>Home</a></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0'><a href='' className='text-decoration-none' variant='primary'>Giỏ hàng</a></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0 text-muted'>Thanh toán</p>
                    </div>
                </div>
            </B.Container>

            <B.Container fluid pt={5}>
                <B.Form>
                    {checkout_HTML}
                </B.Form>
            </B.Container>
        </>
    )
}

export default Checkout;