import axios from 'axios';
import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as B from 'react-bootstrap'
import Pagination from '../../form/pagination/index'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { FaMinus, FaPlus, FaRegEye, FaTimes } from "react-icons/fa";
import { FcPrint } from 'react-icons/fc'
import { BiEdit, } from 'react-icons/bi'
import { TbTrashX } from 'react-icons/tb'
import swal from 'sweetalert';
import EditPx from './editPx'
import { useReactToPrint } from 'react-to-print';
import { useDownloadExcel } from 'react-export-table-to-excel';
import './style.css'

const checkStatus = [
    { id: 0, name: 'Chờ xác nhận' },
    { id: 4, name: 'Đã xuất kho' },
    { id: 5, name: 'Hủy đơn hàng' },
];


function Index() {
    const [pxlist, setPxlist] = useState();
    const [error, setError] = useState([]);
    const [pxinput, setPxInput] = useState({
        tenKH: '',
        sdtKH: '',
        diachiKH: '',
    });
    const [pxid, setPXid] = useState();
    const [searchList, setSearchlist] = useState();
    const [pxsearchList, setPxSearchlist] = useState([]);
    const [viewPx, setViewPx] = useState();
    const [editPx, setEditPx] = useState();
    const [tabkey, setTabkey] = useState(1)
    const [prodData, setProdData] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [show, setShow] = useState(false);
    const [showPrint, setShowPrint] = useState(false);
    const [showCtpx, setShowCtpx] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showTab, setShowTab] = useState(false);
    const [submitting, setSubmitting] = useState(true);
    const [showSearchTable, setShowSearchTable] = useState(false);
    const tableRef = useRef(null);
    const [showExport, setShowExp] = useState(false);
    const [editProd, setEditProd] = useState();
    const [showEditProd, setShowEProd] = useState(false);
    const [prodQuantity, setProdQuantity] = useState();
    const handleClose = () => {
        setSubmitting(true);
        setShow(prev => !prev)
    };
    const handleShow = (ctpx) => {
        setShow(true);
        setEditPx(ctpx);
    }
    const handleEditProdClose = () => {
        setSubmitting(true);
        setShowEProd(prev => !prev)
    };
    const handleEditProdShow = (prod) => {
        console.log(prod);
        setShowEProd(true);
        setProdQuantity(prod.soluong)
        setEditProd(prod);
    }
    const handleClosePrint = () => setShowPrint(prev => !prev);
    const handleShowPrint = (px) => {
        setShowPrint(true);
        setViewPx(px);
    }

    const componentRef = useRef();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [perPage, setPerPage] = useState();
    const [currentPage, setCurrentPage] = useState();
    const handlePerPage = (page) => {
        setPage(page);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    function formatMoney(money) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(money);
    }

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
        pageNumbers.push(i);
    }

    // Function thêm phiếu xuất/Ct phiếu xuất mới
    const handlePxInput = (e) => {
        setPxInput({ ...pxinput, [e.target.name]: e.target.value });
    }

    const handleSubmitPx = (e) => {
        e.preventDefault();

        const data = {
            tenKH: pxinput.tenKH,
            sdt: pxinput.sdtKH,
            diaChi: pxinput.diachiKH,
            pt_ThanhToan: 'Tại quầy',
        }

        axios.post(`/api/kho/px`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success')
                setPXid(res.data.px_id);
                setShowCtpx(true);
                setSubmitting(true);
                setError([]);
                setPxInput({
                    ...pxinput,
                    tenKH: '',
                    sdtKH: '',
                    diachiKH: '',
                })
            } else if (res.data.status === 400) {
                setError(res.data.error);
            }
        })
    }

    const submitAddCtpx = (e) => {
        e.preventDefault();

        const data = {
            px_id: pxid,
            product_id: prodData.id,
            soluong: quantity,
            gia: prodData.gia * quantity,
        }

        axios.post(`/api/kho/addctpx`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setProdData([]);
                setSubmitting(true);
                setError([]);
                setShowCtpx(false);
                setShowTable(false);
                setQuantity(1);
            } else if (res.data.status === 400) {
                setError(res.data.error);
            } else if (res.data.status === 401) {
                swal('Error', res.data.message, 'error')
            } else if (res.data.status === 402) {
                swal('Warning', res.data.message, 'error')
            } else if (res.data.status === 403) {
                swal('Error', res.data.message, 'error')
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error')
            }
        })

    }
    // End

    // Fetch data phiếu xuất
    const getAllPx = useCallback(async () => {
        const res = await axios.get(`/api/kho/px?page=${page}`)
        if (res.data.status === 200) {
            setPxlist(res.data.data.data);
            setTotalPage(res.data.data.total);
            setPerPage(res.data.data.per_page);
            setCurrentPage(res.data.data.current_page)
        }
    }, [page]);

    useEffect(() => {
        getAllPx().then(() => setSubmitting(false));
    }, [submitting, getAllPx]);

    const handleUpdateStatus = (value, px) => {
        const data = {
            tenKH: px.tenKH,
            diaChi: px.diaChi,
            pt_ThanhToan: px.pt_ThanhToan,
            sdt: px.sdt,
            tongTien: px.tongTien,
            status: value.id,
        }
        if (value.id === 4 && px.status !== 4 && px.status !== 5) {
            swal({
                text: 'Khi xuất kho bạn sẽ không thể thay đổi phiếu xuất!',
                title: 'Bạn chắc chứ?',
                icon: 'warning',
                buttons: {
                    cancel: "Hủy bỏ",
                    yes: {
                        text: "Xuất kho",
                        value: "yes",
                    },
                }
            }).then((value) => {
                if (value === 'yes') {
                    axios.put(`/api/kho/px/${px.id}`, data).then(res => {
                        if (res.data.status === 200) {
                            setSubmitting(true);
                        } else if (res.data.status === 400) {
                            swal('Thất bại', res.data.message, 'warning')
                        }
                    })
                }
            })
        } else if (value.id === 5 && px.status !== 5 && px.status !== 4) {
            swal({
                text: 'Khi hủy đơn bạn sẽ không thể xuất hay thay đổi phiếu!',
                title: 'Bạn chắc chứ?',
                icon: 'warning',
                buttons: {
                    cancel: "Hủy bỏ",
                    yes: {
                        text: "Hủy phiếu",
                        value: "yes",
                    },
                }
            }).then((value) => {
                if (value === 'yes') {
                    axios.put(`/api/kho/px/${px.id}`, data).then(res => {
                        if (res.data.status === 200) {
                            setSubmitting(true);
                        } else if (res.data.status === 400) {
                            swal('Thất bại', res.data.message, 'warning')
                        }
                    })
                }
            })
        } else {
            axios.put(`/api/kho/px/${px.id}`, data).then(res => {
                if (res.data.status === 200) {
                    setSubmitting(true);
                } else if (res.data.status === 400) {
                    swal('Thất bại', res.data.message, 'warning')
                }
            })
        }
    }
    // End

    // Function search và thêm sản phẩm mẫu cho chi tiết phiếu xuất
    const handleOnProdSearch = (key) => {
        axios.get(`http://localhost:8000/api/searchProduct?key=${key}`).then(res => {
            if (res.data.status === 200) {
                setSearchlist(res.data.product)
            }
        })
    };

    const handleOnProdSelect = (value) => {
        setProdData(value);
        setShowTable(true);
    };

    const formatResult = (item) => {
        return (
            <div className="result-wrapper">
                <span className="result-span">
                    <img
                        src={`http://localhost:8000/uploadhinh/${item.hinh}`}
                        style={{ height: '60px' }}
                        alt=''
                    />
                </span>
                <span className="result-span">{item.tenSP}</span>
            </div>
        );
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevCount) => prevCount - 1);
        }
    };

    const handleIncrement = () => {
        if (quantity < 10) {
            setQuantity((prevCount) => prevCount + 1);
        }
    };
    // End

    const handleOnPxSearch = (key) => {
        if (key !== "") {
            axios.get(`http://localhost:8000/api/kho/px-search?key=${key}`).then(res => {
                if (res.status === 200) {
                    setPxSearchlist(res.data.data)
                    // setTotalPage(res.data.total);
                    // setPerPage(res.data.per_page);
                    // setCurrentPage(res.data.current_page)
                    setShowSearchTable(true);
                }
                else {
                    setShowSearchTable(false);
                }
            })
        }
    }

    const handleOnPxClear = () => {
        setShowSearchTable(false);
        setPxSearchlist([]);
    }

    const handleView = (px) => {
        setShowTab(true);
        setTabkey(3);
        setViewPx(px);
    }

    const handleCloseTab = () => {
        setSubmitting(true);
        setShowTab(false);
        setTabkey(1);
    }

    const handleAddCtpxProd = (value) => {
        const data = {
            px_id: viewPx.id,
            product_id: value.id,
            soluong: quantity,
        }

        axios.post(`/api/kho/addctpx`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success');
                setQuantity(1);
                setProdData([]);
                setError([]);
            } else if (res.data.status === 400) {
                swal('Thất bại', res.data.message, 'error')
                setError(res.data.error);
            } else if (res.data.status === 401) {
                swal('Error', res.data.message, 'error')
            } else if (res.data.status === 402) {
                swal('Warning', res.data.message, 'error')
            } else if (res.data.status === 403) {
                swal('Error', res.data.message, 'error')
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error')
            }
        })
    }

    const handleDelete = (value) => {
        const px_id = viewPx.id;
        const product_id = value.product.id;
        swal({
            title: 'Bạn có chắc bạn muốn xóa sản phẩm này?',
            text: 'Bạn sẽ xóa sản phẩm này khỏi phiếu!',
            icon: 'warning',
            buttons: {
                cancel: "Hủy bỏ",
                delete: {
                    text: "Vâng, hãy xóa nó",
                    value: "delete",
                },
            }
        }).then((value) => {
            if (value) {
                axios.delete(`/api/kho/deletectpx/${px_id}/${product_id}`).then(res => {
                    if (res.data.status === 200) {
                        swal('Thành công', res.data.message, 'success');
                    } else if (res.data.status === 400) {
                        swal('Cảnh báo', res.data.message, 'warning');
                    }
                })
            }
        })
    }

    const test = (status) => {
        var x;
        switch (status) {
            case 0: {
                x = 'Chờ xác nhận';
                break;
            }
            case 1: {
                x = 'Đã xác nhận';
                break;
            }
            case 2: {
                x = 'Đang đóng gói';
                break;
            }
            case 3: {
                x = 'Đang vận chuyển';
                break;
            }
            case 4: {
                x = 'Đã xuất kho';
                break;
            }
            case 5: {
                x = 'Đã hủy đơn';
                break;
            }
            default: {
                break;
            }
        }
        return x;
    }

    const variant = (status) => {
        var x;
        switch (status) {
            case 0: {
                x = 'dark';
                break;
            }
            case 1: {
                x = 'primary';
                break;
            }
            case 2: {
                x = 'info';
                break;
            }
            case 3: {
                x = 'warning';
                break;
            }
            case 4: {
                x = 'success';
                break;
            }
            case 5: {
                x = 'danger';
                break;
            }
            default: {
                break;
            }
        }
        return x;
    }

    const SortStt = (e) => {
        var key = '';
        switch (e) {
            case '0': case '1': case '2': case '3': case '4': case '5':
                {
                    key = 1;
                    break;
                }
            case 'COD': case 'PayPal': case 'Tại quầy':
                {
                    key = 2;
                    break;
                }
            case 'h-l':
                {
                    key = 4;
                    break;
                }
            case 'l-h':
                {
                    key = 3;
                    break;
                }
            case '':
                {
                    key = '';
                    break;
                }
            default:
                {
                    break;
                }
        }
        if (key !== '') {
            axios.get(`/api/kho/locpx?key=${key}&value=${e}`).then(res => {
                if (res.data.status === 200) {
                    setPxlist(res.data.data.data);
                    setTotalPage(res.data.data.total);
                    setPerPage(res.data.data.per_page);
                    setCurrentPage(res.data.data.current_page);
                }
            })
        } else if (key === '') {
            setSubmitting(true);
        }
    }

    const [dayStart, setDayStart] = useState();
    const [dayEnd, setDayEnd] = useState();
    const [xemXuat, setXemXuat] = useState([]);

    const xemLichSuXuatHang = (e) => {
        e.preventDefault();

        axios.get(`/api/kho/lichSuXuatHang?dateFrom=${dayStart}&dateTo=${dayEnd}`).then(res => {
            if (res.data.status === 200) {
                setXemXuat(res.data.px.data);
                setShowExp(true);
            }
        });
    }

    const { onDownload } =
        useDownloadExcel({
            currentTableRef: tableRef.current,
            filename: 'Lich su xuat hang',
            sheet: 'Phiếu xuất'
        })

    const handleProdDecrement = () => {
        if (prodQuantity > 1) {
            setProdQuantity((prevCount) => prevCount - 1);
        }
    };

    const handleProdIncrement = () => {
        if (prodQuantity < 10) {
            setProdQuantity((prevCount) => prevCount + 1);
        }
    };

    const UpdateProdCtpx = (e) => {
        e.preventDefault();

        const pxid = editProd.px_id;
        const product_id = editProd.product_id;
        const data = {
            product_id: editProd.product_id,
            soluong: prodQuantity,
        }

        axios.put(`/api/kho/updatectpx/${pxid}/${product_id}`, data).then(res => {
            if (res.data.status === 200) {
                setShowEProd(false);
                setSubmitting(true);
                swal('Thành công', res.data.message, 'success');
            } else if (res.data.status === 400) {
                swal('Thất bại', res.data.error, 'error');
            } else if (res.data.status === 401) {
                swal('Thất bại', res.data.message, 'warning');
            } else if (res.data.status === 402) {
                swal('Thất bại', res.data.message, 'warning');
            } else if (res.data.status === 403) {
                swal('Thất bại', res.data.message, 'warning');
            }
        })
    }


    let date = new Date().toLocaleString("vi-VN", { day: '2-digit' });
    let month = new Date().toLocaleString("vi-VN", { month: "long" });
    let year = new Date().getFullYear();

    return (
        <>
            <B.Container fluid>
                <B.Modal size='lg' show={show} onHide={handleClose}>
                    <B.ModalHeader closeButton className="bg-secondary">
                        <B.ModalTitle>Sửa Phiếu xuất</B.ModalTitle>
                    </B.ModalHeader>
                    <B.ModalBody>
                        <EditPx px={editPx} showModal={handleClose} />
                    </B.ModalBody>
                    <B.ModalFooter className="bg-secondary">
                        <B.Button
                            variant="outline-primary"
                            className="mt-2 rounded-0"
                            onClick={handleClose}
                        >
                            Hủy bỏ
                        </B.Button>
                    </B.ModalFooter>
                </B.Modal>

                <B.Modal size='lg' show={showPrint} onHide={handleClosePrint}>
                    <div ref={componentRef}>
                        <B.ModalHeader>
                            <B.ModalTitle>
                                <div className='text-primary fw-bold'>
                                    L3M
                                    <span className='text-dark'>SHOP</span>
                                    <p className='fs-6 text-dark fw-semibold'>Mã hóa đơn: {viewPx && viewPx.id}</p>
                                </div>
                            </B.ModalTitle>
                            <B.ModalTitle>
                                <div>
                                    Hóa đơn bán hàng
                                    <p className='fs-6'>Ngày {date} {month} Năm {year}</p>
                                </div>
                            </B.ModalTitle>
                        </B.ModalHeader>
                        <B.Row className='px-3 mt-2'>
                            <div className='fs-6'>Công ty TNHH thương mại L3M</div>
                            <div className='fs-6'>Địa chỉ: 273 An D. Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh</div>
                            <div className='fst-italic fs-6'>Hotline: 0123498765<span className='ms-5'>Email: l3mstore@gmail.com</span></div>
                        </B.Row>
                        <hr />
                        <B.ModalBody>
                            <B.Row>
                                <B.FormGroup className='d-flex justify-content-between'>
                                    <B.FormLabel className='fs-6'>Họ và tên khách hàng:</B.FormLabel>
                                    <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewPx && viewPx.tenKH}</B.FormLabel>
                                </B.FormGroup>
                                <B.FormGroup className='d-flex justify-content-between'>
                                    <B.FormLabel className='fs-6'>Số điện thoại khách hàng:</B.FormLabel>
                                    <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewPx && viewPx.sdt}</B.FormLabel>
                                </B.FormGroup>
                                <B.FormGroup className='d-flex justify-content-between'>
                                    <B.FormLabel className='fs-6'>Địa chỉ:</B.FormLabel>
                                    <B.FormLabel className='fs-6 ms-2 mb-3 text-success text-end'>{viewPx && viewPx.diaChi}</B.FormLabel>
                                </B.FormGroup>
                                <B.FormGroup className='d-flex justify-content-between'>
                                    <B.FormLabel className='fs-6'>Phương thức thanh toán:</B.FormLabel>
                                    <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewPx && viewPx.pt_ThanhToan}</B.FormLabel>
                                </B.FormGroup>
                            </B.Row>
                            <hr />
                            <B.Row>
                                <B.Table responsive='sm' className='table-borderless border border-muted mb-0'>
                                    <thead className='text-dark'>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Bảo hành</th>
                                            <th>Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewPx && viewPx.pxct.map((prod) => {
                                            return (
                                                <>
                                                    <tr key={prod.product.id}>
                                                        <td>{prod.product.tenSP}</td>
                                                        <td>{prod.soluong}</td>
                                                        <td>{prod.product.baoHanh} tháng</td>
                                                        <td>{formatMoney(prod.product.gia)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot className='border-top'>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Tạm tính: </td>
                                            <td>{viewPx && viewPx.discount !== 0 ? formatMoney(viewPx?.tongTien / (1 - viewPx?.discount / 100)) : formatMoney(viewPx?.tongTien)}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Giảm giá: </td>
                                            <td>{viewPx && viewPx.discount}%</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td className='fw-semibold'>Tổng tiền: </td>
                                            <td>{formatMoney(viewPx && viewPx.tongTien)}</td>
                                        </tr>
                                    </tfoot>
                                </B.Table>
                            </B.Row>
                            <B.Row className='px-3 mt-2'>
                                <B.Row className='mb-5'>
                                    <B.Col>
                                        <p>Khách hàng
                                            <p className='fst-italic ms-3'>Ký tên</p>
                                        </p>
                                    </B.Col>
                                    <B.Col className='text-end'>
                                        <p>Nhân viên bán hàng
                                            <p className='fst-italic me-5'>Ký tên</p></p>
                                    </B.Col>
                                </B.Row>
                                <div className='fst-italic mt-5'>Vui lòng giữ lại hóa đơn trong vòng 1 tháng sau khi mua hàng</div>
                            </B.Row>
                        </B.ModalBody>
                    </div>
                    <B.ModalFooter>
                        {viewPx && viewPx.status > 0 && viewPx.status < 5 ?
                            <B.Button
                                variant="outline-primary"
                                className="mt-2 me-2 rounded-0"
                                onClick={handlePrint}
                            >
                                In hóa đơn
                            </B.Button> : null}
                        <B.Button
                            variant="outline-primary"
                            className="mt-2 rounded-0"
                            onClick={handleClosePrint}
                        >
                            Hủy bỏ
                        </B.Button>
                    </B.ModalFooter>
                </B.Modal>

                <B.Modal centered show={showEditProd} onHide={handleEditProdClose}>
                    <B.ModalBody>
                        <B.Form>
                            <B.FormGroup className='mb-2'>
                                <B.FormLabel className='fs-5 mb-0'>Tên sản phẩm</B.FormLabel>
                                <B.FormText className='text-success fs-4'>{editProd?.product.tenSP}</B.FormText>
                            </B.FormGroup>
                            <B.FormGroup className='mb-2'>
                                <B.FormLabel className='fs-5'>Số lượng sản phẩm</B.FormLabel>
                                <B.InputGroup className="quantity mx-auto">
                                    <B.Button
                                        className="btn-sm rounded-0 shadow-none btnclick"
                                        variant="primary"
                                        type="button"
                                        onClick={handleProdDecrement}
                                    >
                                        <FaMinus />
                                    </B.Button>
                                    <B.InputGroup.Text className="form-control-sm text-center">
                                        {prodQuantity}
                                    </B.InputGroup.Text>
                                    <B.Button
                                        className="btn-sm rounded-0 shadow-none btnclick"
                                        variant="primary"
                                        type="button"
                                        onClick={handleProdIncrement}
                                    >
                                        <FaPlus />
                                    </B.Button>
                                </B.InputGroup>
                            </B.FormGroup>
                            <B.FormGroup className='mb-2'>
                                <B.FormLabel className='fs-5 mb-0'>Giá</B.FormLabel>
                                <B.FormText className='text-success fs-4'>{formatMoney(editProd?.product.gia)}</B.FormText>
                            </B.FormGroup>
                        </B.Form>
                        <div className='d-flex justify-content-end'>
                            <B.Button
                                variant="outline-primary"
                                className="mt-2 rounded-0 me-2"
                                onClick={UpdateProdCtpx}
                            >
                                Lưu thay đổi
                            </B.Button>
                            <B.Button
                                variant="outline-primary"
                                className="mt-2 rounded-0"
                                onClick={handleEditProdClose}
                            >
                                Hủy bỏ
                            </B.Button>
                        </div>
                    </B.ModalBody >
                </B.Modal >

                <B.Row className='pe-xl-5 mb-4' >
                    <h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ PHIẾU XUẤT</h1>
                </B.Row>

                <B.Tabs activeKey={tabkey}
                    onSelect={(k) => setTabkey(k)}>

                    {/* Hien thi phieu xuat */}
                    <B.Tab eventKey={1} title="Danh sách phiếu xuất" className=" border border-top-0 py-3 px-3">
                        <B.Row className='px-xl-3 mb-3'>
                            <B.Col lg={4}>
                                <ReactSearchAutocomplete
                                    items={pxsearchList}
                                    onSearch={handleOnPxSearch}
                                    onClear={handleOnPxClear}
                                    placeholder='Tìm kiếm phiếu xuất'
                                    maxResults={10}
                                    showNoResults={false}
                                    styling={{
                                        height: "34px",
                                        border: "1px solid lightgray",
                                        borderRadius: "0",
                                        backgroundColor: "white",
                                        boxShadow: "none",
                                        hoverBackgroundColor: "#d19c97",
                                        color: "black",
                                        fontSize: "15px",
                                        iconColor: "black",
                                        lineColor: "#d19c97",
                                        clearIconMargin: "3px 8px 0 0",
                                        zIndex: '2',
                                    }}
                                />
                            </B.Col>
                            <B.Col lg={8}>
                                <B.FormGroup className='mb-2 pull-right'>
                                    <B.FormSelect className='rounded-0 shadow-none' style={{ width: '200px' }} onChange={(e) => SortStt(e.target.value)}>
                                        <option value=''>Sắp xếp</option>
                                        <option value='h-l'>Giá cao-thấp</option>
                                        <option value='l-h'>Giá thấp-cao</option>
                                        <option value='1'>Đã xác nhận</option>
                                        <option value='2'>Đang đóng gói</option>
                                        <option value='3'>Đang vận chuyển</option>
                                        <option value='4'>Giao hàng thành công</option>
                                        <option value='5'>Đơn hàng đã hủy</option>
                                        <option value='COD'>COD</option>
                                        <option value='PayPal'>Paypal</option>
                                        <option value='Tại quầy'>Tại quầy</option>
                                    </B.FormSelect>
                                </B.FormGroup>
                            </B.Col>
                        </B.Row>
                        <B.Row className='px-xl-3'>
                            <B.Col lg className='d-grd gap-2 mx-auto table-responsive mb-5'>
                                <B.Table className='table-borderless border border-secondary mb-0'>
                                    <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên Khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Địa chỉ</th>
                                            <th>Phương thức thanh toán</th>
                                            <th>Giảm giá</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!showSearchTable && (
                                            pxlist && pxlist.map((px, index) => {
                                                return (
                                                    <tr key={px.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{px.tenKH}</td>
                                                        <td>{px.sdt}</td>
                                                        <td>{px.diaChi}</td>
                                                        <td>{px.pt_ThanhToan}</td>
                                                        <td>{px.discount}%</td>
                                                        <td>{formatMoney(px.tongTien)}</td>
                                                        <td>
                                                            <B.DropdownButton variant={variant(px.status)} className='me-2' title={test(px.status)}>
                                                                {checkStatus.map((val) => (
                                                                    <B.Dropdown.Item key={val.id}
                                                                        onClick={() => handleUpdateStatus(val, px)}
                                                                    >{val.name}</B.Dropdown.Item>
                                                                ))}
                                                            </B.DropdownButton>
                                                        </td>
                                                        <td className='d-flex'>
                                                            <FaRegEye className='fs-3 text-info me-3' onClick={() => handleView(px)} />
                                                            <FcPrint className='fs-3' onClick={() => handleShowPrint(px)} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )}

                                        {showSearchTable && (
                                            pxsearchList && pxsearchList.map((px) => {
                                                return (
                                                    <tr key={px.id}>
                                                        <td>{px.id}</td>
                                                        <td>{px.tenKH}</td>
                                                        <td>{px.sdt}</td>
                                                        <td>{px.diaChi}</td>
                                                        <td>{px.pt_ThanhToan}</td>
                                                        <td>{px.discount}%</td>
                                                        <td>{formatMoney(px.tongTien)}</td>
                                                        <td className='text-success fw-semibold'>{test(px.status)}</td>
                                                        <td>
                                                            <B.DropdownButton variant={variant(px.status)} className='me-2' title={test(px.status)}>
                                                                {checkStatus.map((val) => (
                                                                    <B.Dropdown.Item key={val.id}
                                                                        onClick={() => handleUpdateStatus(val, px)}
                                                                    >{val.name}</B.Dropdown.Item>
                                                                ))}
                                                            </B.DropdownButton>
                                                        </td>
                                                        <td className='d-flex'>
                                                            <FaRegEye className='fs-3 text-info me-3' onClick={() => handleView(px)} />
                                                            <FcPrint className='fs-3' onClick={() => handleShowPrint(px)} />
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        )}
                                    </tbody>
                                </B.Table>
                            </B.Col>
                        </B.Row>
                        <Pagination currentPage={currentPage} totalPage={pageNumbers} handlePerPage={handlePerPage} />
                    </B.Tab>
                    {/* Hien thi phieu xuat */}

                    {/* Xem va sua PX */}
                    {showTab && (
                        <B.Tab eventKey={3} title="Xem chi tiết phiếu xuất" className=" border border-top-0 py-3 px-3">
                            <B.Row className='px-xl-3 mb-3'>
                                <B.Col lg={8} xs={8}>
                                    <h5 className='text-primary mb-3'>Chi tiết phiếu xuất</h5>
                                </B.Col>
                                <B.Col lg={4} xs={4} className='text-end'>
                                    {viewPx.status === 0 ?
                                        <BiEdit className='fs-3 customborder' onClick={() => handleShow(viewPx)} />
                                        : null}
                                    <FaTimes className='fs-3 customborder' onClick={handleCloseTab} />
                                </B.Col>
                            </B.Row>
                            <B.Row className='px-xl-3 mb-3'>
                                <B.Col lg={5}>
                                    <B.FormGroup className='d-flex'>
                                        <B.FormLabel className='fs-6'>Họ và tên:</B.FormLabel>
                                        <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewPx.tenKH}</B.FormLabel>
                                    </B.FormGroup>
                                    <B.FormGroup className='d-flex'>
                                        <B.FormLabel className='fs-6'>Số điện thoại:</B.FormLabel>
                                        <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewPx.sdt}</B.FormLabel>
                                    </B.FormGroup>
                                    <B.FormGroup className='d-flex'>
                                        <B.FormLabel className='fs-6'>Địa chỉ:</B.FormLabel>
                                        <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewPx.diaChi}</B.FormLabel>
                                    </B.FormGroup>
                                    <B.FormGroup className='d-flex'>
                                        <B.FormLabel className='fs-6'>Phương thức thanh toán:</B.FormLabel>
                                        <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewPx.pt_ThanhToan}</B.FormLabel>
                                    </B.FormGroup>
                                    <B.FormGroup className='d-flex'>
                                        <B.FormLabel className='fs-6'>Giảm giá:</B.FormLabel>
                                        <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewPx.discount}%</B.FormLabel>
                                    </B.FormGroup>
                                    <B.FormGroup className='d-flex'>
                                        <B.FormLabel className='fs-6'>Đơn giá:</B.FormLabel>
                                        <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{formatMoney(viewPx.tongTien)}</B.FormLabel>
                                    </B.FormGroup>
                                </B.Col>
                                <B.Col lg={7}>
                                    {viewPx.status === 0 ?
                                        <B.Row>
                                            <B.Col lg={6}>
                                                <ReactSearchAutocomplete
                                                    items={searchList}
                                                    onSearch={handleOnProdSearch}
                                                    onSelect={handleOnProdSelect}
                                                    fuseOptions={{ keys: ["id", "tenSP"] }}
                                                    resultStringKeyName="tenSP"
                                                    formatResult={formatResult}
                                                    placeholder='Tìm kiếm sản phẩm'
                                                    maxResults={5}
                                                    styling={{
                                                        height: "36px",
                                                        border: "1px solid lightgray",
                                                        borderRadius: "0",
                                                        backgroundColor: "white",
                                                        boxShadow: "none",
                                                        hoverBackgroundColor: "#d19c97",
                                                        color: "black",
                                                        fontSize: "15px",
                                                        iconColor: "black",
                                                        lineColor: "#d19c97",
                                                        clearIconMargin: "3px 8px 0 0",
                                                        zIndex: '2',
                                                    }}
                                                />
                                                <div className='pull-left mt-1'>
                                                    <small className='text-danger ms-2 d-block'>{error.px_id}</small>
                                                    <small className='text-danger ms-2 d-block'>{error.product_id}</small>
                                                    <small className='text-danger ms-2 d-block'>{error.soluong}</small>
                                                </div>
                                                <B.Button variant='outline-info' className='rounded-0 my-3 pull-right' onClick={() => handleAddCtpxProd(prodData)} >Thêm sản phẩm</B.Button>
                                            </B.Col>
                                            <B.Col lg={6}>
                                                <B.Table className='table-borderless border border-secondary mb-3'>
                                                    <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                                        <tr>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Số lượng</th>
                                                            <th className='text-center'>Giá</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><img
                                                                src={`http://localhost:8000/uploadhinh/${prodData.hinh}`}
                                                                style={{ height: '60px' }}
                                                                alt=''
                                                            /> {prodData.tenSP}</td>
                                                            <td style={{ width: '130px' }}>
                                                                <B.InputGroup className="quantity mx-auto">
                                                                    <B.Button
                                                                        className="btn-sm rounded-0 shadow-none btnclick"
                                                                        variant="primary"
                                                                        type="button"
                                                                        onClick={handleDecrement}
                                                                    >
                                                                        <FaMinus />
                                                                    </B.Button>
                                                                    <B.InputGroup.Text className="form-control-sm text-center">
                                                                        {quantity}
                                                                    </B.InputGroup.Text>
                                                                    <B.Button
                                                                        className="btn-sm rounded-0 shadow-none btnclick"
                                                                        variant="primary"
                                                                        type="button"
                                                                        onClick={handleIncrement}
                                                                    >
                                                                        <FaPlus />
                                                                    </B.Button>
                                                                </B.InputGroup>
                                                            </td>
                                                            <td className='text-center'>{formatMoney(prodData.gia * quantity)}</td>
                                                        </tr>
                                                    </tbody>
                                                </B.Table>
                                            </B.Col>
                                        </B.Row> : null}
                                    <B.Table responsive className='table-borderless border border-secondary mb-0'>
                                        <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                            <tr>
                                                <th>Mã sản phẩm</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Số lượng</th>
                                                <th>Giá</th>
                                                {viewPx.status === 0 ?
                                                    <th className='text-center'>Thao tác</th>
                                                    : null}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {viewPx.pxct.map((prod) => {
                                                return (
                                                    <tr key={prod.product.id}>
                                                        <td>{prod.product.id}</td>
                                                        <td><img
                                                            src={`http://localhost:8000/uploadhinh/${prod.product.hinh}`}
                                                            style={{ height: '60px' }}
                                                            alt=''
                                                        /> {prod.product.tenSP}</td>
                                                        <td>{prod.soluong}</td>
                                                        <td>{formatMoney(prod.product.gia)}</td>
                                                        {viewPx.status === 0 ?
                                                            <td className='d-flex justify-content-center'>
                                                                <BiEdit className='fs-4 text-primary me-2' onClick={() => handleEditProdShow(prod)} />
                                                                <TbTrashX className='fs-4 text-primary' onClick={() => handleDelete(prod)} />
                                                            </td>
                                                            : null}
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </B.Table>
                                </B.Col>
                            </B.Row>
                        </B.Tab>
                    )}
                    {/* Xem va sua PX */}

                    {/* Form them phieu xuat */}
                    <B.Tab eventKey={2} title="Thêm phiếu xuất" className=" border border-top-0 py-3 px-3">
                        <B.Row className='px-xl-3 mb-3'>
                            <B.Form onSubmit={handleSubmitPx}>
                                <h4 className='text-primary mb-3'>Thông tin cơ bản của khách hàng</h4>
                                <B.Row>
                                    <B.Col lg={4}>
                                        <B.FormGroup>
                                            <B.FormLabel className='fs-5'>Họ và tên</B.FormLabel>
                                            <small className='text-danger ms-2'>{error.tenKH}</small>
                                            <B.FormControl type='text' name='tenKH' placeholder='Nhập vào họ và tên' className='rounded-0 shadow-none mb-3'
                                                value={pxinput.tenKH} onChange={handlePxInput}></B.FormControl>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col lg={4}>
                                        <B.FormGroup>
                                            <B.FormLabel className='fs-5'>Số điện thoại</B.FormLabel>
                                            <small className='text-danger ms-2'>{error.sdt}</small>
                                            <B.FormControl type='text' name='sdtKH' placeholder='Nhập vào số điện thoại' className='rounded-0 shadow-none mb-3' maxLength='10'
                                                value={pxinput.sdtKH} onChange={handlePxInput}></B.FormControl>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col lg={4}>
                                        <B.FormGroup>
                                            <B.FormLabel className='fs-5'>Địa chỉ</B.FormLabel>
                                            <small className='text-danger ms-2'>{error.diaChi}</small>
                                            <B.FormControl as='textarea' rows={1} name='diachiKH' placeholder='Nhập vào địa chỉ' className='rounded-0 shadow-none mb-3'
                                                value={pxinput.diachiKH} onChange={handlePxInput}></B.FormControl>
                                        </B.FormGroup>
                                    </B.Col>
                                </B.Row>
                                <B.Button type='submit' variant='primary' className='rounded-0 mb-3'>Thêm phiếu xuất</B.Button>
                            </B.Form>
                        </B.Row>
                        {showCtpx && (
                            <B.Row className='px-xl-3 mb-3'>
                                <B.Form onSubmit={submitAddCtpx}>
                                    <h4 className='text-primary mb-3'>Chi tiết phiếu xuất</h4>
                                    <label className='fs-5'>Thêm sản phẩm</label>
                                    <B.Row className='mt-2' >
                                        <B.Col lg={4}>
                                            <ReactSearchAutocomplete
                                                items={searchList}
                                                onSearch={handleOnProdSearch}
                                                onSelect={handleOnProdSelect}
                                                fuseOptions={{ keys: ["id", "tenSP"] }}
                                                resultStringKeyName="tenSP"
                                                formatResult={formatResult}
                                                placeholder='Tìm kiếm sản phẩm'
                                                maxResults={5}
                                                styling={{
                                                    height: "36px",
                                                    border: "1px solid lightgray",
                                                    borderRadius: "0",
                                                    backgroundColor: "white",
                                                    boxShadow: "none",
                                                    hoverBackgroundColor: "#d19c97",
                                                    color: "black",
                                                    fontSize: "15px",
                                                    iconColor: "black",
                                                    lineColor: "#d19c97",
                                                    clearIconMargin: "3px 8px 0 0",
                                                    zIndex: '2',
                                                }}
                                            />
                                            <B.Button type='submit' variant='primary' className='rounded-0 my-2'>Thêm chi tiết phiếu xuất</B.Button>
                                            <div>
                                                <small className='text-danger ms-2 d-block'>{error.px_id}</small>
                                                <small className='text-danger ms-2 d-block'>{error.product_id}</small>
                                                <small className='text-danger ms-2 d-block'>{error.soluong}</small>
                                            </div>
                                        </B.Col>
                                        <B.Col lg={8} className='mx-auto table-responsive mb-3' style={{ zIndex: '1' }}>
                                            {showTable && (
                                                <B.Table className='table-borderless border border-secondary mb-0'>
                                                    <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                                        <tr>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Số lượng</th>
                                                            <th className='text-center'>Giá</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><img
                                                                src={`http://localhost:8000/uploadhinh/${prodData.hinh}`}
                                                                style={{ height: '60px' }}
                                                                alt=''
                                                            /> {prodData.tenSP}</td>
                                                            <td style={{ width: '130px' }}>
                                                                <B.InputGroup className="quantity mx-auto">
                                                                    <B.Button
                                                                        className="btn-sm rounded-0"
                                                                        variant="primary"
                                                                        type="button"
                                                                        onClick={handleDecrement}
                                                                    >
                                                                        <FaMinus />
                                                                    </B.Button>
                                                                    <B.InputGroup.Text className="form-control-sm text-center">
                                                                        {quantity}
                                                                    </B.InputGroup.Text>
                                                                    <B.Button
                                                                        className="btn-sm rounded-0"
                                                                        variant="primary"
                                                                        type="button"
                                                                        onClick={handleIncrement}
                                                                    >
                                                                        <FaPlus />
                                                                    </B.Button>
                                                                </B.InputGroup>
                                                            </td>
                                                            <td className='text-center'>{formatMoney(prodData.gia * quantity)}</td>
                                                        </tr>
                                                    </tbody>
                                                </B.Table>
                                            )}
                                        </B.Col>
                                    </B.Row>
                                </B.Form>
                            </B.Row>
                        )}
                    </B.Tab>
                    {/* Form them phieu xuat */}

                    <B.Tab eventKey={4} title='Lịch sử xuất hàng' className='border border-top-0 py-3 px-3'>
                        <B.Row className='px-xl-3 mb-3'>
                            <B.Col lg={4}>
                                <B.FormGroup className='d-flex'>
                                    <B.FormLabel className='fs-5'>Từ</B.FormLabel>
                                    <B.FormControl type='date' className='rounded-0 ms-2 mb-2' value={dayStart} onChange={(e) => setDayStart(e.target.value)}></B.FormControl>
                                </B.FormGroup>
                            </B.Col>
                            <B.Col lg={4}>
                                <B.FormGroup className='d-flex'>
                                    <B.FormLabel className='fs-5'>Đến</B.FormLabel>
                                    <B.FormControl type='date' className='rounded-0 ms-2 mb-2' value={dayEnd} onChange={(e) => setDayEnd(e.target.value)}></B.FormControl>
                                </B.FormGroup>
                            </B.Col>
                            <B.Col lg={1}>
                                <B.Button variant='outline-primary' className='rounded-0' onClick={xemLichSuXuatHang}>Xem</B.Button>

                            </B.Col>
                            <B.Col lg={3}>
                                {showExport ? <B.Button variant='outline-success' className='rounded-0 pull-right' onClick={onDownload}>Xuất ra Excel</B.Button> : null}
                            </B.Col>
                        </B.Row>
                        <B.Row className='px-xl-3 mb-3'>
                            <B.Table ref={tableRef} responsive className='table-borderless border border-secondary mb-0'>
                                <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên Khách hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Địa chỉ</th>
                                        <th>Phương thức thanh toán</th>
                                        <th>Tổng tiền</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {xemXuat && xemXuat.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.tenKH}</td>
                                                <td>{item.sdt}</td>
                                                <td>{item.diaChi}</td>
                                                <td>{item.pt_ThanhToan}</td>
                                                <td>{formatMoney(item.tongTien)}</td>
                                                <td>{test(item.status)}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </B.Table>
                        </B.Row>
                    </B.Tab>

                </B.Tabs>
            </B.Container >
        </>
    )
}

export default Index