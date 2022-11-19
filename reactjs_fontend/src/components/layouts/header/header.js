import React, { useCallback, useEffect, useState } from "react";
import * as Bt from "react-bootstrap";
import "./styles.css";
import * as Icon from "react-bootstrap-icons";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  Link,
  Navigate,
  NavLink,
  Route,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomePage from "../../pages/home";
import { Category, DropDownMenu, Slideshow } from "../../form";

export default function Header() {
  const [count, setCount] = useState();
  const location = useLocation();
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const [nameUser, setNameUser] = useState(null);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState();
  const [search, setSearch] = useState("");
  const [none, setNone] = useState("d-none");

  useEffect(() => {
    if (localStorage.getItem("auth_fullname")) {
      setNameUser(localStorage.getItem("auth_fullname"));
    }
  }, []);

  const getCount = useCallback(async () => {
    await setCount(localStorage.getItem("count"));
  }, []);

  useEffect(() => {
    getCount();
    setInterval(getCount, 1000);
  }, [getCount]);

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/logout").then((res) => {
        if (res.data.status === 200) {
          // console.log(res);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_name");
          localStorage.removeItem("auth_fullname");
          localStorage.removeItem("count");
          swal({
            title: res.data.message,
            icon: "success",
            button: "đóng",
          });
          history("/");
        }
      });
    });
  };

  let AuthButton = "";

  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <Bt.NavLink className="fs-5 fw-normal  text-end mt-2">
        <Link className="text-decoration-none aEffect" to="/login">
          Login
        </Link>
      </Bt.NavLink>
    );
  } else {
    // console.log(localStorage.getItem("auth_name"));
    AuthButton = (
      <>
        {/* <div className="row ">
          <div className="col-sm-9 text-center m-auto badge text-wrap">
            <span className="text-danger">Chào, {nameUser}</span>
          </div>
          <div className="col-3 btn  rounded-0  " style={{ width: "51px" }}>
            <DropDownMenu logout={logoutSubmit} />
          </div>
        </div> */}
        <div className="row">
          <div className="col-lg-9 d-none d-md-block text-center m-auto badge text-wrap">
            <span className="text-danger">
              {nameUser ? `Chào, ${nameUser}` : null}
            </span>
          </div>
          <div className="col-lg-3 btn rounded-0" style={{ width: "51px" }}>
            <DropDownMenu logout={logoutSubmit} />
          </div>
        </div>
      </>
    );
  }

  // useEffect(() => {
  //   let isMounted = true;

  //   axios.get(`http://localhost:8000/api/products-search`).then(res => {
  //     if (isMounted) {
  //       if (res.data.status === 200) {
  //         setCart(res.data.cart);
  //         setLoading(false);
  //       }
  //       else if (res.data.status === 401) {
  //         navaigate.push('/');
  //         swal('Warning', res.data.message, 'error');
  //       }
  //     }
  //   });

  //   return () => {
  //     isMounted = false
  //   }
  // })

  const getValueSearch = (e) => {
    setSearch(e.target.value);
  };

  const OnSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);

    if (params.has("search")) {
      params.delete("search");
      history(`?search=${search}`);
    } else {
      history(`/pageproducts?search=${search}`);
    }
  };

  return (
    <>
      <Bt.Container fluid>
        {/* TopBar-start */}
        <Bt.Row className="py-2 px-xl-5" style={{ backgroundColor: "#edf1ff" }}>
          <Bt.Col lg={6} className="d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <Link to="/" className="text-dark text-decoration-none">
                Chính sách
              </Link>
              <span className="text-muted px-2">|</span>
              <Link to="/warranty" className="text-dark text-decoration-none">
                Kiểm tra bảo hành
              </Link>
              <span className="text-muted px-2">|</span>
              <Link to="/contact" className="text-dark text-decoration-none">
                hotrol3m@gmail.com
              </Link>
            </div>
          </Bt.Col>
          <Bt.Col lg={6} className="text-end text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a
                className="text-dark px-2"
                href={"https://www.facebook.com/profile.php?id=100007156123173"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon.Facebook></Icon.Facebook>
              </a>
              <a
                className="text-dark px-2"
                href={"https://www.instagram.com/sontungmtp/"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon.Instagram></Icon.Instagram>
              </a>
              <a
                className="text-dark px-2"
                href={
                  "https://www.youtube.com/results?search_query=eunji+pyoapple"
                }
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon.Youtube></Icon.Youtube>
              </a>
            </div>
          </Bt.Col>
        </Bt.Row>
        <Bt.Row className="py-3 px-xl-5">
          <Bt.Col lg={3} className="d-none d-lg-block">
            <Link to={"/"} className="text-decoration-none">
              <h1 className="text-dark m-0 display-5 fw-semibold">
                <span className="font-weight-bold border px-3 me-1 text-primary">
                  L3M
                </span>
                Shop
              </h1>
            </Link>
          </Bt.Col>
          <Bt.Col className="col-lg-6 col-6 text-start">
            <Bt.Form onSubmit={OnSearch}>
              <Bt.Form.Group>
                <Bt.InputGroup>
                  <Bt.Form.Control
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    onChange={getValueSearch}
                    className="rounded-0 shadow-none focus-outline-none fw-semibold"
                  ></Bt.Form.Control>
                  <Bt.InputGroup.Text className="bg-transparent text-primary rounded-0">
                    {/* <Link to={query}> */}
                    <FaSearch
                      variant="primary"
                      style={{ cursor: "pointer" }}
                      onClick={OnSearch}
                    />
                    {/* </Link> */}
                  </Bt.InputGroup.Text>
                </Bt.InputGroup>
              </Bt.Form.Group>
            </Bt.Form>
          </Bt.Col>
          <Bt.Col className="col-lg-3 col-6">
            <Bt.Row>
              <Bt.Col className="col-md-9 col-6">{AuthButton}</Bt.Col>
              <Bt.Col className="col-md-3 col-6">
                <Link to={`/Cart`} className="btn rounded-0">
                  <FaShoppingCart
                    style={{ width: "auto", height: "25px" }}
                    className="text-primary"
                  />
                  <Bt.Badge
                    bg="secondary"
                    text="danger"
                    style={{
                      position: "absolute",
                      marginTop: "-1px",
                      borderRadius: "50%",
                    }}
                  >
                    {count}
                  </Bt.Badge>
                </Link>
              </Bt.Col>
            </Bt.Row>
          </Bt.Col>
        </Bt.Row>
        {/* TopBar-end */}
      </Bt.Container>

      <Bt.Container fluid mb={5}>
        <Bt.Row className="border-top border-bottom border-secondary px-xl-5">
          <Bt.Col
            lg={3}
            className="d-none d-lg-block"
            style={{ position: "relative", zIndex: "10" }}
          >
            <div
              style={{
                position: "absolute",

                width: "100%",
              }}
            >
              <Bt.Button
                onMouseEnter={() => setOpen(!open)}
                variant="primary"
                aria-controls="collapse-categories"
                aria-expanded={open}
                className="rounded-0 w-100 fw-semibold fs-5 shadow-none text-start "
                style={{ height: "63px", marginTop: "-1px", padding: "0 25px" }}
              >
                Danh mục
                <MdOutlineKeyboardArrowDown className="pull-right mt-2" />
              </Bt.Button>
              <div
                onMouseLeave={() => setOpen(false)}
                style={{
                  position: "absolute",
                  backgroundColor: "#fff",
                  width: "100%",
                }}
              >
                <Bt.Collapse in={open} className={`w-100`}>
                  <div id="collapse-categories">
                    <Category />
                  </div>
                </Bt.Collapse>
              </div>
            </div>
          </Bt.Col>
          <Bt.Col className="">
            <Bt.Navbar
              collapseOnSelect
              expand="lg"
              className="py-3 py-lg-0 px-0"
            >
              <Bt.NavbarBrand className="d-block d-lg-none">
                <Link to="/" className="text-decoration-none">
                  <h1 className="text-dark m-0 display-5 fw-semibold">
                    <span className="fw-bold border px-3 me-1 text-primary">
                      L3M
                    </span>
                    Shop
                  </h1>
                </Link>
              </Bt.NavbarBrand>
              <Bt.Navbar.Toggle
                className="text-primary rounded-0"
                aria-controls="responsive-navbar-nav"
              />
              <Bt.Navbar.Collapse
                className="d-flex justify-content-between"
                id="responsive-navbar-nav"
              >
                <Bt.Nav
                  className="me-auto py-2 ms-md-5 ms-2"
                  activeKey={location.pathname}
                >
                  <Bt.NavItem>
                    <Bt.NavLink
                      eventKey={"/"}
                      className="fs-5 fw-normal me-2 effect-box"
                    >
                      <Link className="text-decoration-none aEffect " to="/">
                        Trang chủ
                      </Link>
                    </Bt.NavLink>
                  </Bt.NavItem>
                  <Bt.NavItem>
                    <Bt.NavLink
                      className="fs-5 fw-normal me-2 "
                      eventKey={"/pageproducts"}
                    >
                      <Link
                        className="text-decoration-none aEffect"
                        to="/pageproducts"
                      >
                        Sản phẩm
                      </Link>
                    </Bt.NavLink>
                  </Bt.NavItem>
                  <Bt.NavItem>
                    <Bt.NavLink
                      className="fs-5 fw-normal me-2 "
                      eventKey={"/contact"}
                    >
                      <Link
                        className="text-decoration-none aEffect"
                        to="/contact"
                      >
                        Liên hệ
                      </Link>
                    </Bt.NavLink>
                  </Bt.NavItem>
                </Bt.Nav>

                {/* <Bt.Nav className="ms-auto py-2">
                  <Bt.NavLink className="fs-5 fw-normal me-2">
                    <Link className="text-decoration-none" to="/login">
                      Login
                    </Link>
                  </Bt.NavLink>
                  <Bt.NavLink className="fs-5 fw-normal me-2">
                  <Link className="text-decoration-none" to="/login">
                  Logout
                  </Link>
                  </Bt.NavLink>

                  <Bt.NavLink href="#" className="fs-5 fw-normal me-2">
                    Register
                  </Bt.NavLink>
                  <Bt.NavLink>xin chào, user</Bt.NavLink>
                  {AuthButton}
                </Bt.Nav> */}
              </Bt.Navbar.Collapse>
            </Bt.Navbar>
            {/* <Slideshow /> */}
          </Bt.Col>
        </Bt.Row>
      </Bt.Container>
    </>
  );
}
