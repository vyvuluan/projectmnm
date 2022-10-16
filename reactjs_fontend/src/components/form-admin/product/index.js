import React from 'react'
import * as B from 'react-bootstrap'
import { BsPersonPlusFill } from 'react-icons/bs'
import { FaUserEdit, FaSearch } from 'react-icons/fa'
import { AiOutlineUserDelete, AiOutlineEdit } from 'react-icons/ai'
import { CgExtensionAdd } from 'react-icons/cg'
import { BiEdit } from 'react-icons/bi'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function index() {
    return (
        <>
            <B.Container fluid>
                <B.Row className='px-xl-5 mb-4'>
                    <B.Col lg={4}>
                        <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ SẢN PHẨM</h1>
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
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo loại' />
                                <B.FormSelect className='w-25 rounded-0 shadow-none'>
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
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Tên sản phẩm'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormSelect className='rounded-0 shadow-none mb-3 text-muted'>
                                    <option>Loại sản phẩm</option>
                                    <option>Laptop</option>
                                    <option>Máy tính bàn</option>
                                    <option>Máy tính đồng bộ</option>
                                </B.FormSelect>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mb-3' placeholder='Số lượng'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup>
                                <B.FormControl type='file' className='rounded-0 shadow-none mb-3' placeholder='Hình'></B.FormControl>
                            </B.FormGroup>
                            <CKEditor
                                editor={ClassicEditor}
                                data='<p>Mô tả sản phẩm</p>'
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                }}
                                onBlur={(event, editor) => {
                                }}
                                onFocus={(event, editor) => {
                                }}
                            />
                        </B.Form>
                    </B.Col>
                    <B.Col lg={4}>
                        <B.Form>
                            <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                                <BsPersonPlusFill className='me-2' />
                                Thêm sản phẩm
                            </B.Button>
                            <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                                <FaUserEdit className='me-2' />
                                Sửa sản phẩm
                            </B.Button>
                            <B.Button variant='outline-primary' className='rounded-0 py-2 mb-1 w-100'>
                                <AiOutlineUserDelete className='me-2' />
                                Xóa sản phẩm
                            </B.Button>
                            <hr />
                            <B.FormGroup>
                                <B.FormControl type='text' className='rounded-0 shadow-none mt-1 mb-2' placeholder='Tên loại sản phẩm'></B.FormControl>
                            </B.FormGroup>
                            <div className='d-flex d-inline-block justify-content-between'>
                                <B.Button variant='outline-primary' className='rounded-0 py-2 w-50 me-1'>
                                    <CgExtensionAdd className='me-2' />
                                    Thêm loại
                                </B.Button>
                                <B.Button variant='outline-primary' className='rounded-0 py-2 w-50 ms-1'>
                                    <AiOutlineEdit className='me-2' />
                                    Sửa loại
                                </B.Button>
                            </div>
                        </B.Form>

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
                                <option>Theo loại</option>
                            </B.FormSelect>
                        </B.FormGroup>
                        <B.Table className='table-borderless border border-secondary text-center mb-0'>
                            <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                <tr>
                                    <th><input type='checkbox' /></th>
                                    <th>ID</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Loại</th>
                                    <th>Số lượng</th>
                                    <th>Hình</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>1</td>
                                    <td className='align-middle'>manhchodien</td>
                                    <td className='align-middle'>manhbanhgato@gmail.com</td>
                                    <td className='align-middle'>muaroingoaihien</td>
                                    <td className='align-middle fw-semibold text-danger'>Administrator</td>
                                    <td className='align-middle fs-5 text-primary'><BiEdit /></td>
                                </tr>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>2</td>
                                    <td className='align-middle'>longchodai</td>
                                    <td className='align-middle'>longmtp@gmail.com</td>
                                    <td className='align-middle'>chiyeuminhluan</td>
                                    <td className='align-middle fw-semibold text-success'>Manager</td>
                                    <td className='align-middle fs-5 text-primary'><BiEdit /></td>
                                </tr>
                                <tr>
                                    <td className='align-middle'><input type='checkbox' /></td>
                                    <td className='align-middle'>3</td>
                                    <td className='align-middle'>nhoxluankaka</td>
                                    <td className='align-middle'>tranhoangluan@gmail.com</td>
                                    <td className='align-middle'>danggianlong</td>
                                    <td className='align-middle fw-semibold'>User</td>
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