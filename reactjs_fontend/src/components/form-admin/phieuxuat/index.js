import axios from 'axios';
import React, { useState, useEffect } from 'react'
import * as B from 'react-bootstrap'
import Pagination from '../../form/pagination/index'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { FaSearch, FaMinus, FaPlus, FaRegEye } from "react-icons/fa";
import { FcPrint } from 'react-icons/fc'
import { BiEdit } from 'react-icons/bi'
import { TbTrashX } from 'react-icons/tb'
import swal from 'sweetalert';
import './style.css'

const checkStatus = [
    { id: 0, name: 'Chờ xác nhận' },
    { id: 1, name: 'Đã xác nhận' },
    { id: 2, name: 'Đang đóng gói' },
    { id: 3, name: 'Đang vận chuyển' },
    { id: 4, name: 'Giao hàng thành công' },
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
    const [ekey, setEkey] = useState();
    const [searchList, setSearchlist] = useState();
    const [tabkey, setTabkey] = useState(1)
    const [prodData, setProdData] = useState([]);
    const [quantity, setQuantity] = useState(1);
    // const [show, setShow] = useState(false);
    const [showCtpx, setShowCtpx] = useState(false);
    const [showTable, setShowTable] = useState(false);
    // const handleClose = () => setShow(prev => !prev);
    // const handleShow = () => setShow(true);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [perPage, setPerPage] = useState();
    const [currentPage, setCurrentPage] = useState();
    const handlePerPage = (page) => {
        setPage(page);
    };

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

    const handleUpdateStatus = (value, px) => {
        const data = {
            tenKH: px.tenKH,
            diaChi: px.diaChi,
            pt_ThanhToan: px.pt_ThanhToan,
            sdt: ` 0${px.sdt} `,
            tongTien: px.tongTien,
            status: value.id,
        }
        axios.put(`/api/kho/px/${px.id}`, data).then(res => {
            if (res.status === 200) {
                // setPxlist(res.data.data.data);
                // setEkey()
            }
        })
    }
    // End

    // Function search và thêm sản phẩm mẫu cho chi tiết phiếu xuất
    const handleOnSearch = (key) => {
        axios.get(`http://localhost:8000/api/searchProduct?key=${key}`).then(res => {
            if (res.data.status === 200) {
                setSearchlist(res.data.product)
            }
        })
    };

    const handleOnSelect = (value) => {
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
                x = 'Giao hàng thành công';
                break;
            }
            default: {
                break;
            }
        }
        return x;
    }

    // hàm này sau này có thể sẽ dùng

    // const handleOnSelect = (value) => {
    //     var checkProductExist = prodData.filter((val) => {
    //         return val.id == value.id ? true : false
    //     });

    //     if (checkProductExist.length > 0) {
    //         checkProductExist[0].soLuongSP += 1;
    //     } else {
    //         value.soLuongSP = 1;
    //         setProdData((prev) => [...prev, value]);
    //     }
    //     setShowTable(!showTable)
    // };


    return (
        <>
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

                <B.Tabs activeKey={tabkey}
                    onSelect={(k) => setTabkey(k)}>

                    {/* Hien thi phieu xuat */}
                    <B.Tab eventKey={1} title="Danh sách phiếu xuất" className=" border border-top-0 py-3 px-3">
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
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pxlist && pxlist.map((px) => {
                                            return (
                                                <tr key={px.id}>
                                                    <td>{px.id}</td>
                                                    <td>{px.tenKH}</td>
                                                    <td>{px.sdt}</td>
                                                    <td>{px.diaChi}</td>
                                                    <td>{px.pt_ThanhToan}</td>
                                                    <td>{px.tongTien}</td>
                                                    <td>
                                                        <B.DropdownButton variant='success' className='me-2' title={test(px.status)}>
                                                            {checkStatus.map((val) => (
                                                                <B.Dropdown.Item key={val.id}
                                                                    onClick={() => handleUpdateStatus(val, px)}
                                                                    eventKey={ekey}>{val.name}</B.Dropdown.Item>
                                                            ))}
                                                        </B.DropdownButton>

                                                    </td>
                                                    <td className='d-flex'>
                                                        <FaRegEye className='fs-3 text-info me-3' />
                                                        <FcPrint className='fs-3' onClick={window.print} />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </B.Table>
                            </B.Col>
                        </B.Row>
                        <Pagination currentPage={currentPage} totalPage={pageNumbers} handlePerPage={handlePerPage} />
                    </B.Tab>
                    {/* Hien thi phieu xuat */}

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
                                                onSearch={handleOnSearch}
                                                onSelect={handleOnSelect}
                                                fuseOptions={{ keys: ["id", "tenSP"] }}
                                                resultStringKeyName="tenSP"
                                                formatResult={formatResult}
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
                                                    // fontFamily: "Courier",
                                                    iconColor: "black",
                                                    lineColor: "#d19c97",
                                                    // placeholderColor: "black",
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

                </B.Tabs>
            </B.Container>
        </>
    )
}

export default Index