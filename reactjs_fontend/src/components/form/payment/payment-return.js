import React, { useEffect, useState, useRef } from 'react'
import * as Bt from 'react-bootstrap'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Breadcum from '../breadcum/index'

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
            <Breadcum
                title='Cảm ơn'
                name='Thanh toán thành công'
                BC={1}
            />

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
