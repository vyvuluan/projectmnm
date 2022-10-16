import React from 'react'
import * as B from 'react-bootstrap'
import { BsPersonPlusFill } from 'react-icons/bs'
import { FaUserEdit, FaSearch } from 'react-icons/fa'
import { AiOutlineUserDelete, AiOutlineEdit } from 'react-icons/ai'
import { CgExtensionAdd } from 'react-icons/cg'
import { BiEdit } from 'react-icons/bi'

function index() {
    return (
        <>
            <B.Container fluid>
                <B.Row className='px-xl-5 mb-4'>
                    <B.Col lg={4}>
                        <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ PHIẾU NHẬP</h1>
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
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo NCC' />
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo NSX' />
                            </B.FormGroup>
                        </B.Form>
                    </B.Col>

                </B.Row>

                <B.Row className='px-xl-5 mb-5'>
                    <B.Col lg={8}>
                        <B.Form >
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Tên phiếu nhập'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Tên sản phẩm'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup className='d-flex d-inline-block justify-content-between'>
                                <B.FormSelect className='rounded-0 shadow-none me-1 mb-3 text-muted w-50'>
                                    <option>Nhà cung cấp</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </B.FormSelect>
                                <B.FormSelect className='rounded-0 shadow-none ms-1 mb-3 text-muted w-50'>
                                    <option>Nhà sản xuất</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </B.FormSelect>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Số lượng'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Giá nhập'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Ngày nhập'></B.FormControl>
                            </B.FormGroup>
                        </B.Form>
                    </B.Col>
                    <B.Col lg={4}>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                            <BsPersonPlusFill className='me-2' />
                            Thêm phiếu nhập
                        </B.Button>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                            <FaUserEdit className='me-2' />
                            Sửa phiếu nhập
                        </B.Button>
                        <B.Button variant='outline-primary' className='rounded-0 py-2 mb-1 w-100'>
                            <AiOutlineUserDelete className='me-2' />
                            Xóa phiếu nhập
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
                                <option>Theo NCC</option>
                                <option>Theo NSX</option>
                                <option>Theo ngày nhập</option>
                            </B.FormSelect>
                        </B.FormGroup>
                        <B.Table className='table-borderless border border-secondary text-center mb-0'>
                            <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                <tr>
                                    <th><input type='checkbox' /></th>
                                    <th>ID</th>
                                    <th>Tên phiếu nhập</th>
                                    <th>Tên sản phẩm</th>
                                    <th>NCC/NSX</th>
                                    <th>Số lượng</th>
                                    <th>Giá nhập</th>
                                    <th>Ngày nhập</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>1</td>
                                    <td className='align-middle'>Nhập 50 laptop ASUS đợt 1</td>
                                    <td className='align-middle'>Laptop ASUS TUF A15</td>
                                    <td className='align-middle'>GearVN/ASUS</td>
                                    <td className='align-middle'>50</td>
                                    <td className='align-middle'>2,500,000,000</td>
                                    <td className='align-middle'>20/8/2021</td>
                                    <td className='align-middle fs-5 text-primary'><BiEdit /></td>
                                </tr>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>2</td>
                                    <td className='align-middle'>Nhập 50 laptop ASUS đợt 2</td>
                                    <td className='align-middle'>Laptop ASUS ROG G14</td>
                                    <td className='align-middle'>GearVN/ASUS</td>
                                    <td className='align-middle'>50</td>
                                    <td className='align-middle'>3,500,000,000</td>
                                    <td className='align-middle'>7/12/2021</td>
                                    <td className='align-middle fs-5 text-primary'><BiEdit /></td>
                                </tr>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>3</td>
                                    <td className='align-middle'>Nhập 10 laptop Lenovo</td>
                                    <td className='align-middle'>Laptop Lenovo Legion</td>
                                    <td className='align-middle'>StarComP/Lenovo</td>
                                    <td className='align-middle'>10</td>
                                    <td className='align-middle'>300,000,000</td>
                                    <td className='align-middle'>2/2/2022</td>
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