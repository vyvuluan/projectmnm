import React from 'react'
import product1 from '../../../img/product-1.jpg'
import * as Bt from 'react-bootstrap'

export default function Accountinfo() {
    return (
        <>

            <Bt.Container fluid className='bg-secondary mb-5'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '300px' }}>
                    <h1 className='fw-semibold text-uppercase mb-3'>Thông tin tài khoản</h1>
                    <div className='d-inline-flex'>
                        <p className='m-0'><a href='' className='text-decoration-none' variant='primary'>Home</a></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0 text-muted'>Thông tin tài khoản</p>
                    </div>
                </div>
            </Bt.Container>

            {/* Account information start */}
            <Bt.Container fluid pt={5}>
                <Bt.Row className='px-xl-5'>
                    <Bt.Col lg={6} className='py-5 text-end'>
                        <Bt.Image className='thumbnail border rounded-0' width={'auto'} height={'500px'} src={product1}></Bt.Image>
                    </Bt.Col>
                    <Bt.Col lg={6} className='py-5 ps-5 text-start'>
                        <h4 className='text-dark fw-semibold mb-3'>Họ và tên</h4>
                        <h6 className='text-muted mb-3'>Đỗ Đình Mạnh</h6>
                        <h4 className='text-dark fw-semibold mb-3'>Giới tính</h4>
                        <h6 className='text-muted mb-3'>Lưỡng thể</h6>
                        <h4 className='text-dark fw-semibold mb-3'>Địa chỉ</h4>
                        <h6 className='text-muted mb-3'>1234, Ngõ 6, Ngách 7, Hẻm 8, Đường số 9, Khu phố đèn đỏ, Thành phố Hóc Xương</h6>
                        <h4 className='text-dark fw-semibold mb-3'>Số điện thoại</h4>
                        <h6 className='text-muted mb-3'>42069113114</h6>
                        <h4 className='text-dark fw-semibold mb-3'>Email</h4>
                        <h6 className='text-muted mb-3'>manhnaganomato2001@gmail.com</h6>
                        <Bt.Button variant='primary' className='rounded-0 py-2 me-3 mt-3'>Chỉnh sửa thông tin</Bt.Button>
                        <Bt.Button variant='primary' className='rounded-0 py-2 mt-3'>Đổi mật khẩu</Bt.Button>
                    </Bt.Col>
                </Bt.Row>
            </Bt.Container>
            {/* Account information end */}

            {/* Account information-edit start */}
            <Bt.Container fluid pt={5}>
                <Bt.Row className='px-xl-5'>
                    <Bt.Col lg={6} className='py-5 text-end'>
                        <Bt.Image className='thumbnail border rounded-0' width={'auto'} height={'500px'} src={product1}></Bt.Image>
                    </Bt.Col>
                    <Bt.Col lg={4} className='py-5 ps-5 text-start'>
                        <Bt.Form>
                            <Bt.FormGroup className='mb-3' controlId='formName'>
                                <Bt.FormLabel className='fw-semibold fs-4'>Họ và tên</Bt.FormLabel>
                                <Bt.FormControl type='text' placeholder='Nhập vào họ và tên' className='rounded-0'></Bt.FormControl>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formSexual'>
                                <Bt.FormLabel className='fw-semibold fs-4'>Giới tính</Bt.FormLabel>
                                <br></br>
                                <Bt.FormCheck className='form-check-inline'>
                                    <Bt.FormCheck.Input type='radio' id='flexRadio1'></Bt.FormCheck.Input>
                                    <Bt.FormCheck.Label for='flexRadio1'>Nam</Bt.FormCheck.Label>
                                </Bt.FormCheck>
                                <Bt.FormCheck className='form-check-inline'>
                                    <Bt.FormCheck.Input type='radio' id='flexRadio2'></Bt.FormCheck.Input>
                                    <Bt.FormCheck.Label for='flexRadio2'>Nữ</Bt.FormCheck.Label>
                                </Bt.FormCheck>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formAddress'>
                                <Bt.FormLabel className='fw-semibold fs-4'>Địa chỉ</Bt.FormLabel>
                                <Bt.FormControl type='text' placeholder='Nhập địa chỉ' className='rounded-0'></Bt.FormControl>
                            </Bt.FormGroup>
                            <Bt.FormGroup className='mb-3' controlId='formSDT'>
                                <Bt.FormLabel className='fw-semibold fs-4'>Số điện thoại</Bt.FormLabel>
                                <Bt.FormControl type='text' placeholder='Nhập vào số điện thoại' className='rounded-0'></Bt.FormControl>
                            </Bt.FormGroup>
                            <Bt.Button variant='primary' className='rounded-0 py-2 mt-3'>Lưu thay đổi</Bt.Button>
                        </Bt.Form>
                    </Bt.Col>
                </Bt.Row>
            </Bt.Container>
            {/* Account information-edit end */}

            {/* Forgot password start */}
            <Bt.Container fluid pt={5}>
                <Bt.Row className='px-xl-5'>
                    <Bt.Col lg={6} className='py-5 text-end'>
                        <Bt.Image className='thumbnail border rounded-0' width={'auto'} height={'500px'} src={product1}></Bt.Image>
                    </Bt.Col>
                    <Bt.Col lg={4} className='py-5 ps-5 text-start'>
                        <Bt.FormGroup className='mb-3' controlId='formOldpass'>
                            <Bt.FormLabel className='fw-semibold fs-4'>Mật khẩu cũ</Bt.FormLabel>
                            <Bt.FormControl type='password' placeholder='Nhập vào mật khẩu cũ' className='rounded-0'></Bt.FormControl>
                        </Bt.FormGroup>
                        <Bt.FormGroup className='mb-3' controlId='formNewpass'>
                            <Bt.FormLabel className='fw-semibold fs-4'>Mật khẩu mới</Bt.FormLabel>
                            <Bt.FormControl type='password' placeholder='8-12 ký tự gồm chữ vào số' className='rounded-0'></Bt.FormControl>
                        </Bt.FormGroup>
                        <Bt.FormGroup className='mb-3' controlId='formRe-Newpass'>
                            <Bt.FormLabel className='fw-semibold fs-4'>Nhập lại mật khẩu mới</Bt.FormLabel>
                            <Bt.FormControl type='password' placeholder='8-12 ký tự gồm chữ vào số' className='rounded-0'></Bt.FormControl>
                        </Bt.FormGroup>
                        <Bt.Button variant='primary' className='rounded-0 py-2 mt-3'>Lưu thay đổi</Bt.Button>
                    </Bt.Col>
                </Bt.Row>
            </Bt.Container>
            {/* Forgot password end */}
        </>
    )
}
