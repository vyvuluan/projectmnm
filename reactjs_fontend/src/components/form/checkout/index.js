import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { MdPayments } from "react-icons/md";
import { BsFillBagCheckFill, BsPaypal } from "react-icons/bs";
import { TiTimesOutline } from "react-icons/ti";
import LoaderIcon from "../../layouts/Loading/index";
import * as B from "react-bootstrap";
import './style.css'

function Checkout() {
    const navigate = useNavigate();
    const [discountInput, setDiscountInput] = useState();
    const [discount, setDiscount] = useState();
    const [loading, setLoading] = useState(true);
    const [checkoutInput, setCheckoutInput] = useState({
        fullname: "",
        phonenumber: "",
        address: "",
        discount: "",
    });
    const [error, setError] = useState([]);
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false);
    var totalCartPrice = 0;

    const handleClose = () => setShow(false);

    const handleGetDiscount = () => {
        axios.get(`/api/check-discount?discount=${discountInput}&tongTien=${totalCartPrice}`).then(res => {
            if (res.data.status === 200) {
                setDiscount(res.data.discount);
            } else if (res.data.status === 400) {
                swal('Thất bại', res.data.message, 'warning');
                setDiscountInput('')
            }
        })
    }

    const handleDeleteDiscount = () => {
        setDiscount();
        setDiscountInput('');
    }

    if (!localStorage.getItem("auth_token")) {
        navigate("/");
        swal("Warning", "Vui lòng login để mua hàng", "error");
    }

    function formatMoney(money) {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(money);
    }

    useEffect(() => {
        let isMounted = true;

        axios.get(`http://localhost:8000/api/cart`).then((res) => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
                } else if (res.data.status === 401) {
                    navigate("/");
                    swal("Warning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    };

    var orderinfo_data = {
        tenKH: checkoutInput.fullname,
        sdt: checkoutInput.phonenumber,
        diaChi: checkoutInput.address,
        discount: discountInput,
        payment_mode: "PayPal",
        payment_id: "",
    };

    const PayPalButton = window.paypal.Buttons.driver("react", {
        React,
        ReactDOM,
    });

    var money = 0;

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: (discount ? totalCartPrice * (1 - discount / 100) / 25000 : totalCartPrice / 25000),
                    },
                },
            ],
        });
    };
    console.log(totalCartPrice);

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            orderinfo_data.payment_id = details.id;

            axios.post(`http://localhost:8000/api/dathang`, orderinfo_data).then((res) => {
                if (res.data.status === 200) {
                    swal("Đặt hàng thành công", res.data.message, "success");
                    setError([]);
                    navigate("/");
                } else if (res.data.status === 422) {
                    swal("Hãy nhập đầy đủ các mục", "", "error");
                    setError(res.data.errors);
                }
            });
        });
    };

    const submitOrder = (e, payment_mode) => {
        e.preventDefault();

        var data = {
            tenKH: checkoutInput.fullname,
            sdt: checkoutInput.phonenumber,
            diaChi: checkoutInput.address,
            discount: discountInput,
            payment_mode: payment_mode,
            payment_id: "",
        };

        switch (payment_mode) {
            case "COD":
                axios.post(`http://localhost:8000/api/validate-order`, data).then((res) => {
                    if (res.data.status === 200) {
                        setError([]);
                        axios.post(`http://localhost:8000/api/dathang`, data).then((resp) => {
                            if (resp.data.status === 200) {
                                swal("Thành công", resp.data.message, "success");
                                navigate("/");
                            } else if (resp.data.status === 401) {
                                swal("Đăng nhập", resp.data.message, "error");
                            } else if (resp.data.status === 400) {
                                swal("Xin lỗi", resp.data.message, "error");
                            }
                        });
                    } else if (res.data.status === 422) {
                        swal("Vui lòng điều đầy đủ vào các mục", "", "error");
                        setError(res.data.errors);
                    }
                });
                break;

            case "payonline":
                axios.post(`http://localhost:8000/api/validate-order`, data).then((res) => {
                    if (res.data.status === 200) {
                        setError([]);
                        setShow(true);
                    } else if (res.data.status === 422) {
                        swal("Vui lòng điều đầy đủ vào các mục", "", "error");
                        setError(res.data.errors);
                    }
                });
                break;

            default:
                break;
        }
    };

    if (loading) {
        return (
            <div>
                <B.Container fluid className="bg-secondary mb-5">
                    <div
                        className="d-flex flex-column align-items-center justify-content-center"
                        style={{ minHeight: "300px" }}
                    >
                        <h1 className="fw-semibold text-uppercase mb-3">Thanh toán</h1>
                        <div className="d-inline-flex">
                            <p className="m-0">
                                <Link
                                    to={"/"}
                                    className="text-decoration-none"
                                    variant="primary"
                                >
                                    Home
                                </Link>
                            </p>
                            <p className="m-0 px-2">-</p>
                            <p className="m-0">
                                <Link
                                    to={"/cart"}
                                    className="text-decoration-none"
                                    variant="primary"
                                >
                                    Giỏ hàng
                                </Link>
                            </p>
                            <p className="m-0 px-2">-</p>
                            <p className="m-0 text-muted">Thanh toán</p>
                        </div>
                    </div>
                </B.Container>

                <LoaderIcon />
            </div>
        );
    }

    var checkout_HTML = "";
    if (cart.length > 0) {
        checkout_HTML = (
            <div>
                <B.Row className="px-xl-5">
                    <B.Col md={7}>
                        <B.Card className="border-secondary rounded-0" mb={5}>
                            <B.Card.Header className="bg-secondary border-0 rounded-0">
                                <h3 className="fw-semibold m-0">Thông tin thanh toán</h3>
                            </B.Card.Header>
                            <B.Card.Body>
                                <B.Row>
                                    <B.Col md={6}>
                                        <B.FormGroup className="mb-3">
                                            <B.FormLabel>Họ và tên</B.FormLabel>
                                            <B.FormControl
                                                type="text"
                                                name="fullname"
                                                onChange={handleInput}
                                                value={checkoutInput.fullname}
                                                className="rounded-0 shadow-none"
                                            ></B.FormControl>
                                            <small className="text-danger">{error.tenKH}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col md={6}>
                                        <B.FormGroup className="mb-3">
                                            <B.FormLabel>Số điện thoại</B.FormLabel>
                                            <B.FormControl
                                                type="text"
                                                name="phonenumber"
                                                onChange={handleInput}
                                                value={checkoutInput.phonenumber}
                                                className="rounded-0 shadow-none"
                                            ></B.FormControl>
                                            <small className="text-danger">{error.sdt}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                    <B.Col md={12}>
                                        <B.FormGroup className="mb-3">
                                            <B.FormLabel>Địa chỉ</B.FormLabel>
                                            <B.FormControl
                                                as="textarea"
                                                rows={4}
                                                name="address"
                                                onChange={handleInput}
                                                value={checkoutInput.address}
                                                className="rounded-0 shadow-none"
                                            ></B.FormControl>
                                            <small className="text-danger">{error.diaChi}</small>
                                        </B.FormGroup>
                                    </B.Col>
                                </B.Row>
                            </B.Card.Body>
                            <B.Card.Footer className="border-secondary bg-transparent text-end">
                                <B.FormGroup>
                                    <B.Button
                                        className="rounded-0 my-3 me-2 py-2"
                                        variant="primary"
                                        onClick={(e) => submitOrder(e, "COD")}
                                    >
                                        <BsFillBagCheckFill className="me-2 fs-4" />
                                        Thanh toán COD
                                    </B.Button>
                                    <B.Button
                                        className="rounded-0 py-2 me-2 text-lightgray"
                                        variant="primary"
                                        onClick={(e) => submitOrder(e, "payonline")}
                                    >
                                        <BsPaypal className="me-2 fs-4" />
                                        Thanh toán qua Paypal
                                    </B.Button>
                                </B.FormGroup>
                            </B.Card.Footer>
                        </B.Card>
                    </B.Col>
                    <B.Col md={5} className="mx-auto mb-5">
                        <B.Row>
                            <B.Col className="col-10">
                                <B.FormGroup className="mb-3">
                                    <B.FormControl
                                        type="text"
                                        onChange={(e) => setDiscountInput(e.target.value)}
                                        value={discountInput}
                                        className="rounded-0 shadow-none"
                                        placeholder="Thêm mã giảm giá"
                                    ></B.FormControl>
                                    <small className="text-danger">{error.discount}</small>
                                </B.FormGroup>
                            </B.Col>
                            <B.Col className="col-2">
                                <B.Button variant="primary" className="rounded-0 w-100" onClick={handleGetDiscount}>Thêm mã</B.Button>
                            </B.Col>
                        </B.Row>
                        <B.Table responsive className="table-bordered border border-secondary text-center mb-0">
                            <thead
                                className="text-dark fs-5"
                                style={{ backgroundColor: "#edf1ff" }}
                            >
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {cart.map((item, index) => {
                                    totalCartPrice += item.product.gia * item.soLuongSP;
                                    return (
                                        <tr key={index}>
                                            <td className="align-middle">{item.product.tenSP}</td>
                                            <td className="align-middle">
                                                {formatMoney(item.product.gia)}
                                            </td>
                                            <td className="align-middle">{item.soLuongSP}</td>
                                            <td className="align-middle">
                                                {formatMoney(item.product.gia * item.soLuongSP)}
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr>
                                    <td colSpan={2} className="text-end fs-5">
                                        Tạm tính
                                    </td>
                                    <td colSpan={2} className="text-end fw-semibold fs-5">
                                        {formatMoney(totalCartPrice)}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="text-end fs-5">
                                        Mã giảm giá
                                    </td>
                                    <td colSpan={2} className="text-end fw-semibold fs-5">
                                        {discount && discount !== null ? discount : '0'}%<TiTimesOutline className="ms-4 fs-4 customclosebtn" onClick={handleDeleteDiscount} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="text-end fw-semibold fs-4">
                                        Tổng tiền
                                    </td>
                                    <td colSpan={2} className="text-end fw-semibold fs-5">
                                        {discount ? formatMoney(totalCartPrice * (1 - discount / 100)) : formatMoney(totalCartPrice)}
                                    </td>
                                </tr>
                            </tbody>
                        </B.Table>
                    </B.Col>
                </B.Row>
            </div>
        );
    } else {
        checkout_HTML = (
            <div>
                <div className="card card-body py-5 text-center shadow-sm rounded-0">
                    <h4>Giỏ hàng trống</h4>
                </div>
            </div>
        );
    }

    return (
        <>
            <B.Modal show={show} onHide={handleClose}>
                <B.ModalHeader closeButton>
                    <B.ModalTitle>Thanh toán qua PayPal</B.ModalTitle>
                </B.ModalHeader>
                <B.ModalBody>
                    <PayPalButton
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                    />
                </B.ModalBody>
            </B.Modal>

            <B.Container fluid className="bg-secondary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: "300px" }}
                >
                    <h1 className="fw-semibold text-uppercase mb-3">Thanh toán</h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <Link to={"/"} className="text-decoration-none" variant="primary">
                                Home
                            </Link>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">
                            <Link
                                to={"/cart"}
                                className="text-decoration-none"
                                variant="primary"
                            >
                                Giỏ hàng
                            </Link>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0 text-muted">Thanh toán</p>
                    </div>
                </div>
            </B.Container>

            <B.Container fluid pt={5} className="mb-5">
                <B.Form>{checkout_HTML}</B.Form>
            </B.Container>
        </>
    );
}

export default Checkout;
