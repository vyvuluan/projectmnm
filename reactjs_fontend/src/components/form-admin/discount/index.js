import React, { useCallback, useEffect, useState } from 'react'
import * as B from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import axios from 'axios'
import swal from 'sweetalert'
import Pagination from '../../form/pagination/index'
import { BsTrash2 } from "react-icons/bs";
import { CgExtensionAdd } from "react-icons/cg";
import Discedit from './discedit'

function Index() {
    const [show, setShow] = useState(false);
    const [showAddDisc, setShowAddDisc] = useState(false);
    const [discData, setDiscData] = useState();
    const [submitting, setSubmitting] = useState(true)
    const [error, setError] = useState([]);
    const handleClose = () => {
        setShow(prev => !prev);
        setSubmitting(true);
    }
    const handleCloseAddDisc = () => {
        setShowAddDisc(prev => !prev);
        setSubmitting(true);
    }
    const handleShow = (disc) => {
        setShow(true);
        setDiscData(disc);
    }
    const handleShowAddCate = () => {
        setShowAddDisc(true);
    }

    const [discList, setDiscList] = useState();

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

    function formatMoney(money) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(money);
    }

    const [discInput, setDiscInput] = useState({
        discount: '',
        percent: '',
        dieukien: '',
    });

    const handleDiscountInput = (e) => {
        e.persist();
        setDiscInput({ ...discInput, [e.target.name]: e.target.value })
    }

    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    const submitDisc = (e) => {
        e.preventDefault();

        const data = {
            discount_id: discInput.discount.toUpperCase(),
            phantram: discInput.percent,
            start: start,
            end: end,
            dieukien: discInput.dieukien,
        }

        axios.post(`http://localhost:8000/api/nhanvien/discount`, data).then(res => {
            if (res.data.status === 200) {
                swal('Thành công', res.data.message, 'success');
                setDiscInput({
                    discount: '',
                    percent: '',
                    error_list: [],
                });
                setStart();
                setEnd();
                setSubmitting(true);
                setShowAddDisc(false);
            }
            else if (res.data.status === 400) {
                setError(res.data.message);
            }
        });
    }

    const handleDeleteDisc = (id) => {
        swal({
            text: 'Xóa mã khuyến mại sẽ không thể hoàn tác!',
            title: 'Bạn chắc chứ?',
            icon: 'warning',
            buttons: {
                cancel: "Hủy bỏ",
                yes: {
                    text: "Xóa mã",
                    value: "yes",
                },
            }
        }).then((value) => {
            if (value === 'yes') {
                axios.delete(`/api/nhanvien/discount/${id}`).then(res => {
                    if (res.data.status === 200) {
                        swal('Thành công', res.data.message, 'success');
                        setSubmitting(true);
                    }
                })
            }
        })

    }

    const getDiscData = useCallback(async () => {
        const res = await axios.get(`http://localhost:8000/api/nhanvien/discount?page=${page}`)
        if (res.status === 200) {
            setDiscList(res.data.discount.data);
            setTotalPage(res.data.discount.total);
            setPerPage(res.data.discount.per_page);
            setCurrentPage(res.data.discount.current_page)
        }
    }, [page])

    useEffect(() => {
        getDiscData().then(() => setSubmitting(false));
    }, [submitting, getDiscData])

    return (
        <>

            <B.Modal centered show={show} onHide={handleClose}>
                <B.ModalHeader closeButton className='bg-secondary'>
                    <B.ModalTitle>Sửa mã khuyến mại</B.ModalTitle>
                </B.ModalHeader>
                <B.ModalBody>
                    <Discedit disc={discData} showModal={handleClose} />
                </B.ModalBody>
            </B.Modal>

            <B.Modal centered show={showAddDisc} onHide={handleCloseAddDisc}>
                <B.ModalHeader closeButton className='bg-secondary'>
                    <B.ModalTitle>Thêm mã khuyến mại</B.ModalTitle>
                </B.ModalHeader>
                <B.ModalBody>
                    <B.Form onSubmit={submitDisc}>
                        <B.FormGroup>
                            <B.FormControl type='text' name='discount' className='rounded-0 shadow-none mt-1 mb-2' placeholder='Mã giảm giá'
                                onChange={handleDiscountInput} value={discInput.discount}></B.FormControl>
                            <small className='text-danger'>{error?.discount_id}</small>
                        </B.FormGroup>
                        <B.FormGroup>
                            <B.FormControl type='text' name='percent' className='rounded-0 shadow-none mt-1 mb-2' placeholder='Phần trăm giảm'
                                onChange={handleDiscountInput} value={discInput.percent}></B.FormControl>
                            <small className='text-danger'>{error?.percent}</small>
                        </B.FormGroup>
                        <B.FormGroup>
                            <B.FormControl type='text' name='dieukien' className='rounded-0 shadow-none mt-1 mb-2' placeholder='Điều kiện'
                                onChange={handleDiscountInput} value={discInput.dieukien}></B.FormControl>
                            <small className='text-danger'>{error?.dieukien}</small>
                        </B.FormGroup>
                        <B.FormGroup className='d-flex mb-3'>
                            <B.FormLabel className='fs-5'>Từ</B.FormLabel>
                            <B.FormControl type='date' name='start' className='rounded-0 ms-2 me-2' value={start} onChange={(e) => setStart(e.target.value)}></B.FormControl>
                            <B.FormLabel className='fs-5'>Đến</B.FormLabel>
                            <B.FormControl type='date' name='end' className='rounded-0 ms-2' value={end} onChange={(e) => setEnd(e.target.value)}></B.FormControl>
                        </B.FormGroup>
                        <small className='text-danger'>{error?.start}</small>
                        <small className='text-danger'>{error?.end}</small>
                        <B.Button variant='outline-primary' type='submit' className='rounded-0 py-2 w-50 pull-right'>
                            <CgExtensionAdd className='me-2' />
                            Thêm mã
                        </B.Button>
                    </B.Form>
                </B.ModalBody>
            </B.Modal>

            <B.Container fluid>
                <B.Row className='pe-xl-5 mb-4'>
                    <B.Col lg={5}>
                        <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ MÃ KHUYẾN MẠI</h1>
                    </B.Col>
                </B.Row>

                <B.Row className='pe-xl-5 mb-5'>

                </B.Row>

                {/* table hien thi mã khuyến mại */}
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
                                Thêm mã khuyến mại
                            </B.Button>
                        </B.FormGroup>
                        <B.Table responsive='lg' className='table-borderless border border-secondarymb-0'>
                            <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                <tr>
                                    <th className='text-center'>STT</th>
                                    <th>Mã khuyến mại</th>
                                    <th>Phần trăm giảm</th>
                                    <th>Chi tiêu tối thiểu</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th className='text-center'>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className='align-middle'>
                                {discList && discList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center'>{index + 1}</td>
                                            <td>{item.discount_id}</td>
                                            <td>{item.phantram}</td>
                                            <td>{formatMoney(item.dieukien)}</td>
                                            <td>{item.start}</td>
                                            <td>{item.end}</td>
                                            <td className='fs-5 text-primary text-center'>
                                                <BiEdit className='me-2' onClick={() => handleShow(item)} />
                                                <BsTrash2 onClick={() => handleDeleteDisc(item.discount_id)} />
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