import React, { useState, useEffect, useCallback } from "react";
import * as Bt from "react-bootstrap";
import emptycart from "../../../img/emptycart.png";

import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import LoaderIcon from "../../layouts/Loading/index";

export default function Cart() {
  const [submitting, setSubmitting] = useState(true);
  const navaigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  var totalCartPrice = 0;

  if (!localStorage.getItem("auth_token")) {
    navaigate("/");
    swal("Warning", "Vui lòng login để mua hàng", "error");
  }

  function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }

  const getCart = useCallback(async () => {
    const res = await axios.get(`http://localhost:8000/api/cart`);
    if (res.data.status === 200) {
      setCart(res.data.cart);
      setLoading(false);
    } else if (res.data.status === 401) {
      navaigate("/");
      swal("Warning", res.data.message, "error");
    }
  }, [])

  useEffect(() => {
    getCart().then(() => setSubmitting(false));
  }, [submitting, getCart]);

  const handleDecrement = (id_cart) => {
    setCart((cart) =>
      cart.map((item) =>
        id_cart === item.id
          ? {
            ...item,
            soLuongSP: item.soLuongSP - (item.soLuongSP > 1 ? 1 : 0),
          }
          : item
      )
    );
    updateCartQuantity(id_cart, "dec");
  };

  const handleIncrement = (id_cart) => {
    setCart((cart) =>
      cart.map((item) =>
        id_cart === item.id
          ? {
            ...item,
            soLuongSP: item.soLuongSP + (item.soLuongSP < 4 ? 1 : 0),
          }
          : item
      )
    );
    updateCartQuantity(id_cart, "inc");
  };

  function updateCartQuantity(id_cart, scope) {
    axios
      .put(`http://localhost:8000/api/cart-updatequantity/${id_cart}/${scope}`)
      .then((res) => {
        if (res.data.status === 400) {
          setCart((cart) =>
            cart.map((item) =>
              id_cart === item.id
                ? {
                  ...item,
                  soLuongSP: item.soLuongSP - 1,
                }
                : item
            )
          );
          updateCartQuantity(id_cart, "dec");
          swal('Thất bại', res.data.message, 'error')
        }
      });
  }

  const deleteCartItem = (e, id_cart) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8000/api/deletecart/${id_cart}`)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          localStorage.setItem("count", localStorage.getItem("count") - 1)
          setSubmitting(true);
        } else if (res.data.status === 404) {
          swal("Error", res.data.message, "error");
        }
      });
  };

  if (loading) {
    return (
      <div>
        <Bt.Container fluid className="bg-secondary mb-5">
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "300px" }}
          >
            <h1 className="fw-semibold text-uppercase mb-3">Giỏ hàng</h1>
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
              <p className="m-0 text-muted">Giỏ hàng</p>
            </div>
          </div>
        </Bt.Container>
        <LoaderIcon />
      </div>
    );
  }

  var cart_HTML = "";
  if (cart.length > 0) {
    cart_HTML = (
      <div>
        <Bt.Row className="px-xl-5">
          <Bt.Col lg={8} className="mb-5">
            <Bt.Table responsive className="table-borderless border border-secondary text-center mb-0">
              <thead
                className="text-dark"
                style={{ backgroundColor: "#edf1ff" }}
              >
                <tr className="text-start">
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số Lượng</th>
                  <th>Tổng tiền</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody className="text-start">
                {cart.map((item, index) => {
                  totalCartPrice += item.product.gia * item.soLuongSP;
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={`http://localhost:8000/uploadhinh/${item.product.hinh}`}
                          className="me-2" alt={item.product.tenSP}
                          style={{ width: "50px" }}
                        />
                        {item.product.tenSP}
                      </td>
                      <td>{formatMoney(item.product.gia)}</td>
                      <td>
                        <Bt.InputGroup className="quantity mx-auto">
                          <Bt.Button
                            className="btn-sm rounded-0 shadow-none btnclick"
                            variant="primary"
                            type="button"
                            onClick={() => handleDecrement(item.id)}
                          >
                            <FaMinus />
                          </Bt.Button>
                          <Bt.InputGroup.Text className="form-control-sm text-center">
                            {item.soLuongSP}
                          </Bt.InputGroup.Text>
                          <Bt.Button
                            className="btn-sm rounded-0 shadow-none btnclick"
                            variant="primary"
                            type="button"
                            onClick={() => handleIncrement(item.id)}
                          >
                            <FaPlus />
                          </Bt.Button>
                        </Bt.InputGroup>
                      </td>
                      <td className="">
                        {formatMoney(item.product.gia * item.soLuongSP)}
                      </td>
                      <td>
                        <Bt.Button
                          className="btn-sm rounded-0"
                          type="button"
                          onClick={(e) => deleteCartItem(e, item.id)}
                        >
                          <FaTimes />
                        </Bt.Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Bt.Table>
          </Bt.Col>
          <Bt.Col lg={4}>
            <Bt.Card className="border-secondary rounded-0" mb={5}>
              <Bt.Card.Header className="bg-secondary border-0 rounded-0">
                <h3 className="fw-semibold m-0">Thông tin giỏ hàng</h3>
              </Bt.Card.Header>
              <Bt.Card.Body>
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="fw-medium">Tạm tính</h6>
                  <h6 className="fw-medium">{formatMoney(totalCartPrice)}</h6>
                </div>
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="fw-medium">Giảm giá</h6>
                  <h6 className="fw-medium">
                    0% (Có thể áp dụng mã tại bước thanh toán)
                  </h6>
                </div>
              </Bt.Card.Body>
              <Bt.Card.Footer className="border-secondary bg-transparent d-grid gap-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="fw-bold">Tổng tiền</h5>
                  <h5 className="fw-bold">
                    {formatMoney(totalCartPrice)}
                  </h5>
                </div>
                <Link to="/checkout">
                  <Bt.Button
                    className="rounded-0 mt-3 py-2 w-100"
                    variant="primary"
                  >
                    <MdPayments className="me-2 fs-4" />
                    Tiến tới thanh toán
                  </Bt.Button>
                </Link>
              </Bt.Card.Footer>
            </Bt.Card>
          </Bt.Col>
        </Bt.Row>
      </div>
    );
  } else {
    cart_HTML = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm rounded-0">
          <div>
            <img
              src={emptycart}
              alt="empty"
              width="42"
              height="42"
              style={{ marginBottom: "10px" }}
            />
          </div>
          <h4>Giỏ hàng trống</h4>

        </div>
      </div>
    );
  }

  return (
    <>
      <Bt.Container fluid className="bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <h1 className="fw-semibold text-uppercase mb-3">Giỏ hàng</h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <Link to={"/"} className="text-decoration-none" variant="primary">
                Home
              </Link>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0 text-muted">Giỏ hàng</p>
          </div>
        </div>
      </Bt.Container>

      <Bt.Container fluid pt={5} className="mb-5">
        <Bt.Form>{cart_HTML}</Bt.Form>
      </Bt.Container>
    </>
  );
}
