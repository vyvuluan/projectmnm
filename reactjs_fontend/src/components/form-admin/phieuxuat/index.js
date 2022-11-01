import axios from 'axios';
import React, { useState, useEffect } from 'react'
import * as B from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import Pagination from '../../form/pagination/index'

function Index() {
    const [dropdownkey, setDropDownKey] = useState("Action");
    const [pxlist, setPxlist] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(prev => !prev);
    const handleShow = () => setShow(true);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [perPage, setPerPage] = useState();
    const [currentPage, setCurrentPage] = useState();
    const handlePerPage = (page) => {
        setPage(page);
    };

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/kho/px?page=${page}`).then(res => {
            if (isMounted) {
                if (res.status === 200) {
                    setPxlist(res.data.data.data);
                    setTotalPage(res.data.data.total);
                    setPerPage(res.data.data.per_page);
                    setCurrentPage(res.data.data.current_page)
                }
            }
        });

        return () => {
            isMounted = false;
        }
    }, [page])

    return (
        <>
            <B.Modal size='lg' show={show} onHide={handleClose} centered>
                <B.ModalHeader closeButton className='bg-secondary'>
                    <B.ModalTitle>Thêm phiếu xuất</B.ModalTitle>
                </B.ModalHeader>
                <B.ModalBody>
                </B.ModalBody>
                <B.ModalFooter className='bg-secondary'>
                    <B.Button variant='outline-primary' className='mt-2 rounded-0' onClick={handleClose}>Hủy bỏ</B.Button>
                </B.ModalFooter>
            </B.Modal>

            <B.Container fluid>
                <B.Row className='pe-xl-5 mb-4'>
                    <B.Col lg={4}>
                        <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ PHIẾU XUẤT</h1>
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

                {/* <B.Row className='pe-xl-5 mb-5'>
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
                </B.Row> */}

                {/* table hien thi tai khoan */}
                <B.Row className='pe-xl-5'>
                    <B.Col lg className='d-grd gap-2 mx-auto table-responsive mb-5' >
                        <B.FormGroup className='d-flex d-inline-block justify-content-between mb-2 me-2'>
                            <B.FormSelect className='rounded-0 shadow-none' style={{ width: '200px' }}>
                                <option>Sắp xếp</option>
                                <option>Từ A-Z</option>
                                <option>Theo ID</option>
                                <option>Theo NCC</option>
                                <option>Theo NSX</option>
                                <option>Theo ngày nhập</option>
                            </B.FormSelect>
                            <B.Button variant='primary' className='rounded-0 fs-6' onClick={handleShow}>Thêm phiếu xuất</B.Button>
                        </B.FormGroup>
                        <B.Table className='table-borderless border border-secondary mb-0'>
                            <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                <tr>
                                    <th><input type='checkbox' /></th>
                                    <th>ID</th>
                                    <th>Tên Khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Phương thức thanh toán</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pxlist && pxlist.map((px) => {
                                    if (px.status === 0) {
                                        px.status = 'Chưa xử lý'
                                    } else if (px.status === 1) {
                                        px.status = 'Đã xử lý'
                                    }

                                    return (
                                        <tr key={px.id}>
                                            <td><input type='checkbox' /></td>
                                            <td>{px.id}</td>
                                            <td>{px.tenKH}</td>
                                            <td>{px.sdt}</td>
                                            <td>{px.diaChi}</td>
                                            <td>{px.pt_ThanhToan}</td>
                                            <td>{px.tongTien}</td>
                                            <td>{px.status}</td>
                                            <td className='d-flex'>
                                                <B.DropdownButton className='me-2' key={dropdownkey} onSelect={(k) => setDropDownKey(k)} title={dropdownkey}>
                                                    <B.Dropdown.Item eventKey="Action">Action</B.Dropdown.Item>
                                                    <B.Dropdown.Item eventKey="Another action">Another action</B.Dropdown.Item>
                                                    <B.Dropdown.Item eventKey="Something else">Something else</B.Dropdown.Item>
                                                </B.DropdownButton>
                                                <B.Button variant='outline-primary' onClick={window.print}>In hóa đơn</B.Button>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </B.Table>
                    </B.Col>
                </B.Row>
                <Pagination currentPage={currentPage} totalPage={pageNumbers} handlePerPage={handlePerPage} />
            </B.Container>
        </>
    )
}

export default Index