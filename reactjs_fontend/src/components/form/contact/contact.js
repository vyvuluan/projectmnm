import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Bt from 'react-bootstrap'
import { RiMapPinFill } from 'react-icons/ri'
import { HiMail } from 'react-icons/hi'
import { BsTelephoneFill } from 'react-icons/bs'
import axios from 'axios'
import swal from 'sweetalert'

export default function Contact() {
    const [messageInput, setMessage] = useState();
    const [error, setError] = useState([]);

    const submitContact = (e) => {
        e.preventDefault();

        const data = {
            message: messageInput,
        }

        axios.post(`/api/contact`, data).then(res => {
            if (res.data.status === 200) {
                setError([]);
                swal('Đã gửi lời nhắn thành công chúng tôi sẽ phản hồi trong thời gian sớm nhất', '', 'success');
            } else if (res.data.status === 400) {
                setError(res.data.error);
                swal('Không thành công', '', 'warning');
            } else if (res.data.status === 404) {
                swal('', res.data.message, 'error');
            }
        })
    }

    return (
        <>
            <Bt.Container fluid className='bg-secondary mb-5'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '300px' }}>
                    <h1 className='fw-semibold text-uppercase mb-3'>Liên hệ với chúng tôi</h1>
                    <div className='d-inline-flex'>
                        <p className='m-0'><Link to='/' className='text-decoration-none' variant='primary'>Home</Link></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0 text-muted'>Liên hệ</p>
                    </div>
                </div>
            </Bt.Container>

            <Bt.Container pt={5}>
                <div className='text-center mb-5'>
                    <h2 className='section-title px-5'><span className='px-2'>「 Liên hệ nếu có thắc mắc nào 」</span></h2>
                </div>

                <Bt.Row className='px-xl-5'>
                    <Bt.Col lg={7} className='mb-5'>
                        <Bt.Form onSubmit={submitContact}>
                            <Bt.FormGroup className='mb-3'>
                                <Bt.FormControl as='textarea' rows='8' placeholder='Lời nhắn' name='message' value={messageInput} onChange={(e) => setMessage(e.target.value)} className='rounded-0'></Bt.FormControl>
                                <small className='text-danger'>{error.message}</small>
                            </Bt.FormGroup>
                            <Bt.Button variant='primary' type='submit' className='rounded-0'>Gửi lời nhắn</Bt.Button>
                        </Bt.Form>
                    </Bt.Col>

                    <Bt.Col lg={5} mb={5}>
                        <h5 className='fw-semibold mb-2'>Lưu ý</h5>
                        <p className='text-muted'>Chúng tôi sẽ trả lời bằng mail sau khi tiết nhận thông tin quý khách đã gửi từ 3-5 ngày làm việc. Hoặc liên hệ trực tiếp đến số điện thoại bên dưới để được hỗ trợ sớm nhất, xin cảm ơn.</p>
                        <div className='d-flex flex-column mb-3'>
                            <h5 className='fw-semibold mb-3'>Thông tin liên hệ</h5>
                            <p className='mb-2'><RiMapPinFill className='text-primary me-2' style={{ width: 'auto', height: '20px' }} />273 An D. Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh</p>
                            <p className='mb-2'><HiMail className='text-primary me-2' style={{ width: 'auto', height: '20px' }} />hotrol3m@gmail.com</p>
                            <p className='mb-2'><BsTelephoneFill className='text-primary me-2' style={{ width: 'auto', height: '20px' }} />+84 01234 43210</p>
                        </div>
                    </Bt.Col>
                </Bt.Row>
            </Bt.Container>
        </>
    )
}
