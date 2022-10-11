import React from 'react'
import * as Bt from 'react-bootstrap'
import { BsFillCheckCircleFill } from 'react-icons/bs'

export default function Paymentreturn() {
    return (
        <>
            <Bt.Container fluid className='bg-secondary mb-5'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '300px' }}>
                    <h1 className='fw-semibold text-uppercase mb-3'>Hóa đơn thanh toán</h1>
                    <div className='d-inline-flex'>
                        <p className='m-0'><a href='' className='text-decoration-none' variant='primary'>Home</a></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0'><a href='' className='text-decoration-none' variant='primary'>Thanh toán</a></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0 text-muted'>Hóa đơn thanh toán</p>
                    </div>
                </div>
            </Bt.Container>

            <Bt.Container fluid pt={5}>
                <Bt.Row className='px-xl-5 py-5'>
                    <Bt.Col className='d-flex justify-content-center'>
                        <Bt.Form className='border rounded-0 py-5 px-5 d-inline-block'>
                            <Bt.FormGroup className='mb-3' controlId='formOrderID'>
                                <Bt.FormLabel className='fw-semibold fs-6'>Mã đơn hàng:</Bt.FormLabel>
                                <Bt.Form.Text className="ms-3">20221007123657</Bt.Form.Text>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formTotal'>
                                <Bt.FormLabel className='fw-semibold fs-6'>Số tiền:</Bt.FormLabel>
                                <Bt.Form.Text className="ms-3 text-end">1.000.000</Bt.Form.Text>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formOrderDes'>
                                <Bt.FormLabel className='fw-semibold fs-6'>Nội dung thanh toán:</Bt.FormLabel>
                                <Bt.Form.Text className="ms-3">Chuyen tien hoc phi</Bt.Form.Text>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formResponCode'>
                                <Bt.FormLabel className='fw-semibold fs-6'>Mã phản hồi:</Bt.FormLabel>
                                <Bt.Form.Text className="ms-3">00</Bt.Form.Text>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formTransID'>
                                <Bt.FormLabel className='fw-semibold fs-6'>Mã giao dịch:</Bt.FormLabel>
                                <Bt.Form.Text className="ms-3">13851816</Bt.Form.Text>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formBankID'>
                                <Bt.FormLabel className='fw-semibold fs-6'>Mã ngân hàng:</Bt.FormLabel>
                                <Bt.Form.Text className="ms-3">NCB</Bt.Form.Text>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formPayTime'>
                                <Bt.FormLabel className='fw-semibold fs-6'>Thời gian thanh toán:</Bt.FormLabel>
                                <Bt.Form.Text className="ms-3">20221007123757</Bt.Form.Text>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formOrderResult'>
                                <Bt.FormLabel className='fw-semibold fs-6'>Kết quả:</Bt.FormLabel>
                                <Bt.Form.Text className="ms-3 text-success fw-bold"><BsFillCheckCircleFill className='me-2' style={{ width: 'auto', height: '20px' }} />GD Thanh cong</Bt.Form.Text>
                            </Bt.FormGroup>
                            <Bt.Button variant='primary' className='rounded-0 px-3 py-2'>Trở lại trang chủ</Bt.Button>
                        </Bt.Form>
                    </Bt.Col>
                </Bt.Row>
            </Bt.Container>
        </>
    )
}
