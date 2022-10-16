import React from 'react'
import * as B from 'react-bootstrap'
import { BsPersonPlusFill } from 'react-icons/bs'
import { FaUserEdit, FaSearch } from 'react-icons/fa'
import { AiOutlineUserDelete, AiOutlineEdit } from 'react-icons/ai'
import { RiUserAddFill } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'

function index() {
    return (
        <>
            <B.Container fluid>
                <B.Row className='px-xl-5 mb-4'>
                    <B.Col lg={4}>
                        <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ NHÂN VIÊN</h1>
                    </B.Col>
                    <B.Col lg={2}></B.Col>
                    <B.Col lg={6}>
                        <B.Form>
                            <B.FormGroup>
                                <B.InputGroup>
                                    <B.FormControl
                                        type="text"
                                        placeholder="Tìm kiếm"
                                        className="rounded-0 shadow-none focus-outline-none fw-semibold"
                                    ></B.FormControl>
                                    <B.InputGroup.Text className="bg-transparent text-primary rounded-0">
                                        <FaSearch variant="primary" />
                                    </B.InputGroup.Text>
                                </B.InputGroup>
                            </B.FormGroup>
                            <B.FormGroup className='d-flex d-inline-block justify-content-between mt-2'>
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo id' />
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo tên' />
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo số điện thoại' />
                                <B.FormSelect className='w-25 rounded-0 shadow-none'>
                                    <option>Theo quyền</option>
                                    <option>Administrator</option>
                                    <option>Manager</option>
                                    <option>User</option>
                                </B.FormSelect>
                            </B.FormGroup>
                        </B.Form>
                    </B.Col>

                </B.Row>

                <B.Row className='px-xl-5 mb-5'>
                    <B.Col lg={8}>
                        <B.Form >
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Họ và tên nhân viên'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Email'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormSelect className='rounded-0 shadow-none mb-3 text-muted'>
                                    <option>Giới tính</option>
                                    <option>Nam</option>
                                    <option>Nữ</option>
                                    <option>Lưỡng long nhất thể</option>
                                </B.FormSelect>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Địa chỉ'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Số điện thoại'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='file' className='rounded-0 shadow-none mb-3'></B.FormControl>
                            </B.FormGroup>
                        </B.Form>
                    </B.Col>
                    <B.Col lg={4}>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                            <BsPersonPlusFill className='me-2' />
                            Thêm nhân viên
                        </B.Button>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                            <FaUserEdit className='me-2' />
                            Sửa nhân viên
                        </B.Button>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 mb-1 w-100'>
                            <AiOutlineUserDelete className='me-2' />
                            Xóa nhân viên
                        </B.Button>
                        <hr />

                        <B.FormGroup className='d-flex d-inline-block justify-content-between'>
                            <B.FormControl type='text' className='rounded-0 shadow-none mb-1 w-75' placeholder='Username'></B.FormControl>
                            <B.FormSelect className='rounded-0 shadow-none ms-2 mb-2 text-muted w-25'>
                                <option>Quyền</option>
                                <option>Administrator</option>
                                <option>Manager</option>
                                <option>Nhân viên</option>
                            </B.FormSelect>
                        </B.FormGroup>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 w-50'>
                            <RiUserAddFill className='me-2' />
                            Cấp tài khoản
                        </B.Button>
                    </B.Col>
                </B.Row>

                {/* table hien thi tai khoan */}
                <B.Row className='px-xl-5'>
                    <B.Col lg className='d-grd gap-2 mx-auto table-responsive mb-5' >
                        <B.FormGroup className='d-flex d-inline-block justify-content-between mb-2'>
                            <B.FormSelect className='rounded-0 shadow-none' style={{ width: '200px' }}>
                                <option>Sắp xếp</option>
                                <option>Từ A-Z</option>
                                <option>Theo ID</option>
                                <option>Theo quyền</option>
                            </B.FormSelect>
                        </B.FormGroup>
                        <B.Table className='table-borderless border border-secondary text-center mb-0'>
                            <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                <tr>
                                    <th><input type='checkbox' /></th>
                                    <th>ID</th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Giới tính</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th>Hình</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>1</td>
                                    <td className='align-middle'>Đỗ Đình Mạnh</td>
                                    <td className='align-middle'>manhbanhgato@gmail.com</td>
                                    <td className='align-middle'>Lưỡng thể</td>
                                    <td className='align-middle'>363 Phố hàng trống</td>
                                    <td className='align-middle'>0654676532</td>
                                    <td className='align-middle'>Hình</td>
                                    <td className='align-middle fs-5 text-primary'><BiEdit /></td>
                                </tr>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>2</td>
                                    <td className='align-middle'>Trần Hoàng Long</td>
                                    <td className='align-middle'>longlon@gmail.com</td>
                                    <td className='align-middle'>Nữ</td>
                                    <td className='align-middle'>363 Phố hàng trống</td>
                                    <td className='align-middle'>0654676532</td>
                                    <td className='align-middle'>Hình</td>
                                    <td className='align-middle fs-5 text-primary'><BiEdit /></td>
                                </tr>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>3</td>
                                    <td className='align-middle'>Vy Vũ Luân</td>
                                    <td className='align-middle'>vuvu@gmail.com</td>
                                    <td className='align-middle'>Bí mật</td>
                                    <td className='align-middle'>363 Phố hàng trống</td>
                                    <td className='align-middle'>0654676532</td>
                                    <td className='align-middle'>Hình</td>
                                    <td className='align-middle fs-5 text-primary'><BiEdit /></td>
                                </tr>
                            </tbody>
                        </B.Table>
                    </B.Col>
                </B.Row>
            </B.Container>
        </>
    )
}

export default index