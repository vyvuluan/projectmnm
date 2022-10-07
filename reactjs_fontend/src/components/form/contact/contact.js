import React from 'react'
import * as Bt from 'react-bootstrap'

export default function contact() {
    return (
        <>
            <Bt.Container fluid className='bg-secondary mb-5'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '300px' }}>
                    <h1 className='fw-semibold text-uppercase mb-3'>Liên hệ với chúng tôi</h1>
                    <div className='d-inline-flex'>
                        <p className='m-0'><a href='' className='text-decoration-none' variant='primary'>Home</a></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0 text-muted'>Liên hệ</p>
                    </div>
                </div>
            </Bt.Container>

            <Bt.Container fluid pt={5}>
                <div className='text-center mb-4'>
                    <h2 className='section-title px-5'><span className='px-2'>「 Liên hệ nếu có thắc mắc nào 」</span></h2>
                </div>

                <Bt.Row className='px-xl-5'>
                    <Bt.Col lg={7} mb={5}>
                        <Bt.FormGroup className='mb-3' controlId='formContactName'>
                            <Bt.FormControl type='text' placeholder='Họ và tên của bạn' className='rounded-0'></Bt.FormControl>
                        </Bt.FormGroup>
                        <Bt.FormGroup className='mb-3' controlId='formContactEmail'>
                            <Bt.FormControl type='text' placeholder='Email của bạn' className='rounded-0'></Bt.FormControl>
                        </Bt.FormGroup>
                        <Bt.FormGroup className='mb-3' controlId='formContactSubject'>
                            <Bt.FormControl type='text' placeholder='Tiêu đề' className='rounded-0'></Bt.FormControl>
                        </Bt.FormGroup>
                        <Bt.FormGroup className='mb-3' controlId='formContactMessage'>
                            <Bt.FormControl as='textarea' rows='6' placeholder='Lời nhắn' className='rounded-0'></Bt.FormControl>
                        </Bt.FormGroup>
                        <Bt.Button variant='primary' className='rounded-0 mb-3'>Gửi lời nhắn</Bt.Button>
                    </Bt.Col>

                    <Bt.Col lg={5} mb={5}>
                        <h5 className='fw-semibold mb-2'>Thông tin liên hệ</h5>
                        <p className='text-muted'>Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat clita ipsum justo sed.</p>

                    </Bt.Col>
                </Bt.Row>
            </Bt.Container>
        </>
    )
}
