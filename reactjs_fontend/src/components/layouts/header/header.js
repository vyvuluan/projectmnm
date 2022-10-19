import React, { useEffect, useState } from "react";
import * as Bt from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";
import { Link, NavLink, Route, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomePage from "../../pages/home";
import { DropDownMenu } from "../../form";

export default function Header() {

  const history = useNavigate();
  const [nameUser, setNameUser] = useState(null);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('pageproducts?search=' + search);


  useEffect(() => {
    if (localStorage.getItem("auth_name")) {
      setNameUser(localStorage.getItem("auth_name"));
    }
  }, []);

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/logout").then((res) => {
        if (res.data.status === 200) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_name");
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
        <Link className="text-decoration-none" to="/login">
          Login
        </Link>
      </Bt.NavLink>
    );
  } else {
    // console.log(localStorage.getItem("auth_name"));
    AuthButton = (
      <>
        <div className="row ">
          <div className="col-sm-9 text-center m-auto badge text-wrap">
            
            <span className="text-danger  ">Chào, {nameUser}</span>
          </div>
          <div className="col-3 btn  rounded-0 border " style={{width:"51px"}}>
            <DropDownMenu logout={logoutSubmit} />
          </div>
          {/* <Bt.NavLink  className="fs-5 fw-normal me-2"> */}
          {/* <Link className="text-decoration-none" to="/login"> */}
          {/* Logout */}
          {/* </Link> */}

          {/* </Bt.NavLink> */}
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
    setQuery('pageproducts?search=' + search);
  }

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }


  return (
    <>
      <Bt.Container fluid>
        {/* TopBar-start */}
        <Bt.Row className="py-2 px-xl-5" style={{ backgroundColor: "#edf1ff" }}>
          <Bt.Col lg={6} className="d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark text-decoration-none">FAQS</a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark text-decoration-none">Help</a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark text-decoration-none">Support</a>
            </div>
          </Bt.Col>
          <Bt.Col lg={6} className="text-end text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark px-2" href={"#"}>
                <Icon.Facebook></Icon.Facebook>
              </a>
              <a className="text-dark px-2" href={"#"}>
                <Icon.Twitter></Icon.Twitter>
              </a>
              <a className="text-dark px-2" href={"#"}>
                <Icon.Linkedin></Icon.Linkedin>
              </a>
              <a className="text-dark px-2" href={"#"}>
                <Icon.Instagram></Icon.Instagram>
              </a>
              <a className="text-dark px-2" href={"#"}>
                <Icon.Youtube></Icon.Youtube>
              </a>
            </div>
          </Bt.Col>
        </Bt.Row>
        <Bt.Row className="align-items-center py-3 px-xl-5">
          <Bt.Col lg={3} className="d-none d-lg-block">
            <a href={"#"} className="text-decoration-none">
              <h1 className="text-dark m-0 display-5 fw-semibold">
                <span className="font-weight-bold border px-3 me-1 text-primary">
                  L3M
                </span>
                Shop
              </h1>
            </a>
          </Bt.Col>
          <Bt.Col lg={6} className="col-6 text-start">
            <Bt.Form>
              <Bt.Form.Group>
                <Bt.InputGroup>
                  <Bt.Form.Control
                    type="text"
                    placeholder="Search"
                    onChange={getValueSearch}
                    className="rounded-0 shadow-none focus-outline-none fw-semibold"
                  ></Bt.Form.Control>
                  <Bt.InputGroup.Text className="bg-transparent text-primary rounded-0">
                    <Link to={query}><FaSearch variant="primary" style={{ cursor: 'pointer' }} /></Link>
                  </Bt.InputGroup.Text>
                </Bt.InputGroup>
              </Bt.Form.Group>
            </Bt.Form>
          </Bt.Col>
          <Bt.Col lg={3} className="col-6">
            <div className="row">
              <div className="col-sm-9">{AuthButton}</div>
              <div className="col-3 text-end">
                <Link to={`/Cart`} className="btn border rounded-0">
                  <FaShoppingCart
                    style={{ width: "auto", height: "25px" }}
                    className="text-primary"
                  />
                </Link>
              </div>
            </div>
          </Bt.Col>
        </Bt.Row>
        {/* TopBar-end */}
      </Bt.Container>

      <Bt.Container fluid mb={5}>
        <Bt.Row className="border-top px-xl-5">
          <Bt.Col lg>
            <Bt.Navbar
              collapseOnSelect
              expand="lg"
              className="py-3 py-lg-0 px-0"
            >
              <Bt.NavbarBrand href={""} className="d-block d-lg-none">
                <h1 className="text-dark m-0 display-5 fw-semibold">
                  <span className="font-weight-bold border px-3 me-1 text-primary">
                    L3M
                  </span>
                  Shop
                </h1>
              </Bt.NavbarBrand>
              <Bt.Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                className="text-primary rounded-0"
              ></Bt.Navbar.Toggle>
              <Bt.Navbar.Collapse
                id="responsive-navbar-nav"
                className="justify-content-between"
              >
                <Bt.Nav className="me-auto py-2">
                  <Bt.NavLink href="#" className="fs-5 fw-normal me-2">
                    <Link className="text-decoration-none" to="/">
                      Home
                    </Link>
                  </Bt.NavLink>
                  <Bt.NavDropdown title="Shop" className="fs-5 fw-normal me-2">
                    <Bt.NavDropdown.Item className="fs-5 fw-light">
                      Laptop
                    </Bt.NavDropdown.Item>
                    <Bt.NavDropdown.Divider></Bt.NavDropdown.Divider>
                    <Bt.NavDropdown.Item className="fs-5 fw-light">
                      Máy tính để bàn
                    </Bt.NavDropdown.Item>
                  </Bt.NavDropdown>
                  {/* <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Shop</Bt.NavLink>
                                    <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Laptop</Bt.NavLink>
                                    <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Máy tính để bàn</Bt.NavLink> */}
                  <Bt.NavLink className="fs-5 fw-normal me-2">
                    <Link className="text-decoration-none" to="/contact">
                      Liên hệ
                    </Link>
                  </Bt.NavLink>
                </Bt.Nav>

                <Bt.Nav className="ms-auto py-2">
                  {/* <Bt.NavLink className="fs-5 fw-normal me-2">
                    <Link className="text-decoration-none" to="/login">
                      Login
                    </Link>
                  </Bt.NavLink> */}
                  {/* <Bt.NavLink className="fs-5 fw-normal me-2"> */}
                  {/* <Link className="text-decoration-none" to="/login"> */}
                  {/* Logout */}
                  {/* </Link> */}
                  {/* </Bt.NavLink> */}

                  {/* <Bt.NavLink href="#" className="fs-5 fw-normal me-2">
                    Register
                  </Bt.NavLink> */}
                  {/* <Bt.NavLink>xin chào, user</Bt.NavLink> */}
                  {/* {AuthButton} */}
                </Bt.Nav>
              </Bt.Navbar.Collapse>
            </Bt.Navbar>
          </Bt.Col>
        </Bt.Row>
      </Bt.Container>
    </>
  );
}
