import React, { useEffect, useState, useRef } from 'react'
import * as Bt from 'react-bootstrap'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'


function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id = setInterval(() => {
            savedCallback.current();
        }, delay);
        return () => clearInterval(id);
    }, [delay]);
}

export default function Paymentreturn() {
    const [countDown, setCountDown] = useState(10);
    const navigate = useNavigate();

    useInterval(() => {
        if (countDown > 0) {
            setCountDown(countDown - 1);
        } else navigate('/');
    }, 1000);

    return (
        <>
            <Bt.Container fluid className='bg-secondary mb-5'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '300px' }}>
                    <h1 className='fw-semibold text-uppercase mb-3'>Cảm ơn</h1>
                    <div className='d-inline-flex'>
                        <p className='m-0'><a href='' className='text-decoration-none' variant='primary'>Home</a></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0'><a href='' className='text-decoration-none' variant='primary'>Thanh toán</a></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0 text-muted'>Thanh toán thành công</p>
                    </div>
                </div>
            </Bt.Container>

            <Bt.Container fluid pt={5} className='mb-5'>
                <Bt.Row className='px-xl-5 py-5 text-center'>
                    <h1>Cảm ơn bạn đã mua hàng</h1>
                    <div className='d-flex justify-content-center'>
                        <p className='me-3'>Trở về trang chủ trong <Link to='/' className='text-decoration-none'>{countDown}</Link></p>
                        <span>Kiểm tra đơn hàng <Link to='/myorder' className='text-decoration-none'>tại đây</Link></span>
                    </div>
                </Bt.Row>
            </Bt.Container>
        </>
    )
}
