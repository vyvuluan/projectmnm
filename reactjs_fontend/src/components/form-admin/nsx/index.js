import React, { useCallback, useEffect, useState } from 'react'
import * as B from 'react-bootstrap'
import { BsPersonPlusFill } from 'react-icons/bs'
import { FaUserEdit, FaSearch } from 'react-icons/fa'
import { AiOutlineUserDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import axios from 'axios'
import swal from 'sweetalert'
import Pagination from '../../form/pagination/index'
import { Nsxedit } from './nsxedit'

function Index() {
    const [nsxinput, setNsxInput] = useState({
        tenNSX: '',
        country: '',
    });
    const [show, setShow] = useState(false);
    const [NSXData, setNSXData] = useState();
    const handleClose = () => {
        setShow(prev => !prev);
        setSubmitting(true);
    }
    const handleShow = (NSX) => {
        setShow(true);
        setNSXData(NSX);
    }

    const [nsxlist, setNsxList] = useState();

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [perPage, setPerPage] = useState();
    const [currentPage, setCurrentPage] = useState();
    const handlePerPage = (page) => {
        console.log(page);
        setPage(page);
    };

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
        pageNumbers.push(i);
    }

    const handleNsxInput = (e) => {
        setNsxInput({ ...nsxinput, [e.target.name]: e.target.value })
    }

    const handleNsxSubmit = (e) => {
        e.preventDefault();

        const data = {
            tenNSX: nsxinput.tenNSX,
            quocGia: nsxinput.country
        }

        axios.post(`/api/kho/nsx`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success')
            }
        })
    }

    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     axios.get(`http://localhost:8000/api/kho/nsx?page=${page}`).then((res) => {
    //         if (isMounted) {
    //             if (res.data.status === 200) {
    //                 setNsxList(res.data.Nsx.data);
    //                 setTotalPage(res.data.Nsx.total);
    //                 setPerPage(res.data.Nsx.per_page);
    //                 setCurrentPage(res.data.Nsx.current_page)
    //             }
    //         }
    //     });

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     };
    // }, [page]);
    const [submitting, setSubmitting] = useState(true)

    const getNsxData = useCallback(async () => {
        const res = await axios.get(`http://localhost:8000/api/kho/nsx?page=${page}`)
        if (res.data.status === 200) {
            setNsxList(res.data.Nsx.data);
            setTotalPage(res.data.Nsx.total);
            setPerPage(res.data.Nsx.per_page);
            setCurrentPage(res.data.Nsx.current_page)
        }
    }, [page])

    useEffect(() => {
        getNsxData().then(() => setSubmitting(false))
        var sec = 15;
        setInterval(getNsxData, sec * 1000)
    }, [submitting, getNsxData])

    return (
        <>

            <B.Modal show={show} onHide={handleClose}>
                <B.ModalHeader closeButton className='bg-secondary'>
                    <B.ModalTitle>Sửa thông tin Nhà Cung Cấp</B.ModalTitle>
                </B.ModalHeader>
                <B.ModalBody>
                    <Nsxedit nsx={NSXData} showModal={handleClose} />
                </B.ModalBody>
                <B.ModalFooter className='bg-secondary'>
                    <B.Button variant='outline-primary' className='mt-2 rounded-0' onClick={handleClose}>Hủy bỏ</B.Button>
                </B.ModalFooter>
            </B.Modal>

            <B.Container fluid>
                <B.Row className='pe-xl-5 mb-4'>
                    <B.Col lg={5}>
                        <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ NHÀ SẢN XUẤT</h1>
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
                    <B.Form onSubmit={handleNsxSubmit} >
                        <B.Row>
                            <B.Col lg={8}>
                                <B.FormGroup>
                                    <B.FormControl type='text' name='tenNSX' onChange={handleNsxInput} value={nsxinput.tenNSX} className='rounded-0 shadow-none mb-3' placeholder='Tên nhà sản xuất'></B.FormControl>
                                </B.FormGroup>
                                <B.FormGroup>
                                    <B.FormControl type='text' name='country' onChange={handleNsxInput} value={nsxinput.country} className='rounded-0 shadow-none mb-3' placeholder='Quốc gia'></B.FormControl>
                                </B.FormGroup>
                            </B.Col>
                            <B.Col lg={4}>
                                <B.Button variant='outline-primary' type='submit' className='rounded-0 py-2 mb-2 w-100' onClick={() => setSubmitting(true)}>
                                    <BsPersonPlusFill className='me-2' />
                                    Thêm nhà sản xuất
                                </B.Button>
                                {/* <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                                    <FaUserEdit className='me-2' />
                                    Sửa nhà sản xuất
                                </B.Button>
                                <B.Button variant='outline-primary' className='rounded-0 py-2 mb-2 w-100'>
                                    <AiOutlineUserDelete className='me-2' />
                                    Xóa nhà sản xuất
                                </B.Button> */}
                            </B.Col>
                        </B.Row>
                    </B.Form>
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
                                    <th>Tên nhà sản xuất</th>
                                    <th>Quốc gia</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>
                                {nsxlist && nsxlist.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className='align-middle'><input type='checkbox' /></td>
                                            <td className='align-middle'>{index + 1}</td>
                                            <td className='align-middle'>{item.tenNSX}</td>
                                            <td className='align-middle'>{item.quocGia}</td>
                                            <td className='align-middle fs-5 text-primary'><BiEdit onClick={() => handleShow(item)} /></td>
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