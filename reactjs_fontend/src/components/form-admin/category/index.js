import React, { useCallback, useEffect, useState } from 'react'
import * as B from 'react-bootstrap'
import { BsPersonPlusFill } from 'react-icons/bs'
import { FaUserEdit, FaSearch } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import axios from 'axios'
import swal from 'sweetalert'
import Pagination from '../../form/pagination/index'
// import { Nsxedit } from './nsxedit'
import { AiOutlineUserDelete, AiOutlineEdit } from "react-icons/ai";
import { CgExtensionAdd } from "react-icons/cg";

function Index() {
    const [show, setShow] = useState(false);
    const [showAddCate, setShowAddCate] = useState(false);
    const [cateEdit, setCateEdit] = useState();
    const [submitting, setSubmitting] = useState(true)
    const [error, setError] = useState([]);
    const handleClose = () => {
        setShow(prev => !prev);
        setSubmitting(true);
    }
    const handleCloseAddCate = () => {
        setShowAddCate(prev => !prev);
        setSubmitting(true);
    }
    const handleShow = (cate) => {
        setShow(true);
        setCateEdit(cate);
    }
    const handleShowAddCate = () => {
        setShowAddCate(true);
    }

    const [cateList, setCateList] = useState();

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

    const [categoryInput, setCategory] = useState({
        tenLoaiSP: '',
        error_list: [],
    });

    const handleCategoryInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            tenLoai: categoryInput.tenLoaiSP,
        }

        axios.post(`http://localhost:8000/api/kho/loaisp`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setCategory({
                    tenLoai: '',
                    error_list: [],
                });
                setSubmitting(true);
                setShowAddCate(false);
            }
            else if (res.data.status === 400) {
                setCategory({ ...categoryInput, error_list: res.data.error })
            }
        });
    }

    const handleCateChange = (e) => {
        setCateEdit({ ...cateEdit, [e.target.name]: e.target.value })
    }

    const submitChangeCate = (e) => {
        e.preventDefault();

        const data = {
            tenLoai: cateEdit.tenLoai,
        }

        axios.put(`http://localhost:8000/api/kho/loaisp/${cateEdit.id}`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setSubmitting(true);
                setShow(false);
                setError([]);
            }
            else if (res.data.status === 400) {
                setError(res.data.error);
            }
        });
    }

    const getNsxData = useCallback(async () => {
        const res = await axios.get(`http://localhost:8000/api/kho/loaisp?page=${page}`)
        if (res.data.status === 200) {
            setCateList(res.data.Loaisp.data);
            setTotalPage(res.data.Loaisp.total);
            setPerPage(res.data.Loaisp.per_page);
            setCurrentPage(res.data.Loaisp.current_page)
        }
    }, [page])

    useEffect(() => {
        getNsxData().then(() => setSubmitting(false));
    }, [submitting, getNsxData])

    return (
        <>

            <B.Modal centered show={show} onHide={handleClose}>
                <B.ModalHeader closeButton className='bg-secondary'>
                    <B.ModalTitle>Sửa loại sản phẩm</B.ModalTitle>
                </B.ModalHeader>
                <B.ModalBody>
                    <B.Form onSubmit={submitChangeCate}>
                        <B.FormGroup>
                            <B.FormControl type='text' name='tenLoai' className='rounded-0 shadow-none mt-1 mb-2' placeholder='Tên loại sản phẩm'
                                onChange={handleCateChange} value={cateEdit?.tenLoai}></B.FormControl>
                            <small className='text-danger'>{error.tenLoai}</small>
                        </B.FormGroup>
                        <B.Button variant='outline-primary' type='submit' className='rounded-0 py-2 w-50 pull-right'>
                            <AiOutlineEdit />
                            Lưu thay đổi
                        </B.Button>
                    </B.Form>
                </B.ModalBody>
            </B.Modal>

            <B.Modal centered show={showAddCate} onHide={handleCloseAddCate}>
                <B.ModalHeader closeButton className='bg-secondary'>
                    <B.ModalTitle>Thêm loại sản phẩm</B.ModalTitle>
                </B.ModalHeader>
                <B.ModalBody>
                    <B.Form onSubmit={submitCategory}>
                        <B.FormGroup>
                            <B.FormControl type='text' name='tenLoaiSP' className='rounded-0 shadow-none mt-1 mb-2' placeholder='Tên loại sản phẩm'
                                onChange={handleCategoryInput} value={categoryInput.tenLoaiSP}></B.FormControl>
                            <small className='text-danger'>{categoryInput.error_list.tenLoai}</small>
                        </B.FormGroup>
                        <B.Button variant='outline-primary' type='submit' className='rounded-0 py-2 w-50 pull-right'>
                            <CgExtensionAdd className='me-2' />
                            Thêm loại
                        </B.Button>
                    </B.Form>
                </B.ModalBody>
            </B.Modal>

            <B.Container fluid>
                <B.Row className='pe-xl-5 mb-4'>
                    <B.Col lg={5}>
                        <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ LOẠI SẢN PHẨM</h1>
                    </B.Col>
                </B.Row>

                <B.Row className='pe-xl-5 mb-5'>

                </B.Row>

                {/* table hien thi tai khoan */}
                <B.Row className='pe-xl-5'>
                    <B.Col lg className='d-grd gap-2 mx-auto table-responsive mb-5' >
                        <B.FormGroup className='d-flex justify-content-between mb-2'>
                            <B.FormSelect className='rounded-0 shadow-none' style={{ width: '200px' }}>
                                <option>Sắp xếp</option>
                                <option>Từ A-Z</option>
                                <option>Theo ID</option>
                            </B.FormSelect>
                            <B.Button variant='primary' className='rounded-0 py-2' onClick={handleShowAddCate}>
                                <CgExtensionAdd />
                                Thêm loại sản phẩm
                            </B.Button>
                        </B.FormGroup>
                        <B.Table responsive='lg' className='table-borderless border border-secondarymb-0'>
                            <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                <tr>
                                    <th className='text-center' >STT</th>
                                    <th>Tên Loại sản phẩm</th>
                                    <th className='text-center'>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>
                                {cateList && cateList.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className='text-center'>{index + 1}</td>
                                            <td>{item.tenLoai}</td>
                                            <td className='fs-5 text-primary text-center'><BiEdit onClick={() => handleShow(item)} /></td>
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