import React from 'react'
import * as B from 'react-bootstrap'
import { BsPersonPlusFill } from 'react-icons/bs'
import { FaUserEdit, FaSearch } from 'react-icons/fa'
import { AiOutlineUserDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'

function index() {
    return (
        <>
            <B.Container fluid>
                <B.Row className='pe-xl-5 mb-4'>
                    <B.Col lg={5}>
                        <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ NHÀ CUNG CẤP</h1>
                    </B.Col>
                    <B.Col lg={1}></B.Col>
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
                            </B.FormGroup>
                        </B.Form>
                    </B.Col>

                </B.Row>

                <B.Row className='pe-xl-5 mb-5'>
                    <B.Col lg={8}>
                        <B.Form >
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Tên nhà cung cấp'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Email'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Số điện thoại'></B.FormControl>
                            </B.FormGroup>
                        </B.Form>
                    </B.Col>
                    <B.Col lg={4}>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                            <BsPersonPlusFill className='me-2' />
                            Thêm nhà cung cấp
                        </B.Button>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                            <FaUserEdit className='me-2' />
                            Sửa nhà cung cấp
                        </B.Button>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                            <AiOutlineUserDelete className='me-2' />
                            Xóa nhà cung cấp
                        </B.Button>
                    </B.Col>
                </B.Row>

                {/* table hien thi tai khoan */}
                <B.Row className='pe-xl-5'>
                    <B.Col lg className='d-grd gap-2 mx-auto table-responsive mb-5' >
                        <B.FormGroup className='d-flex d-inline-block justify-content-between mb-2'>
                            <B.FormSelect className='rounded-0 shadow-none' style={{ width: '200px' }}>
                                <option>Sắp xếp</option>
                                <option>Từ A-Z</option>
                                <option>Theo ID</option>
                            </B.FormSelect>
                        </B.FormGroup>
                        <B.Table className='table-borderless border border-secondary text-center mb-0'>
                            <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                <tr>
                                    <th><input type='checkbox' /></th>
                                    <th>ID</th>
                                    <th>Tên nhà cung cấp</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>1</td>
                                    <td className='align-middle'>Tin học ngôi sao</td>
                                    <td className='align-middle'>starcomp@gmail.com</td>
                                    <td className='align-middle'>0123987654</td>
                                    <td className='align-middle fs-5 text-primary'><BiEdit /></td>
                                </tr>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>2</td>
                                    <td className='align-middle'>GearVN</td>
                                    <td className='align-middle'>gearvn@gmail.com</td>
                                    <td className='align-middle'>0123987654</td>
                                    <td className='align-middle fs-5 text-primary'><BiEdit /></td>
                                </tr>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>3</td>
                                    <td className='align-middle'>Phong Vũ</td>
                                    <td className='align-middle'>pv@gmail.com</td>
                                    <td className='align-middle'>0123987654</td>
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