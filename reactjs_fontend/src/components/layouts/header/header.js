import React from 'react'
import * as Bt from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { FaSearch, FaShoppingCart, FaUser, FaShoppingBag } from 'react-icons/fa'

export default function Header() {


    return (
        <>
            <Bt.Container fluid>
                {/* TopBar-start */}
                <Bt.Row className='py-2 px-xl-5' style={{ backgroundColor: '#edf1ff', }}>
                    <Bt.Col lg={6} className='d-none d-lg-block'>
                        <div className='d-inline-flex align-items-center'>
                            <a className='text-dark text-decoration-none' href={'#'}>FAQS</a>
                            <span className="text-muted px-2">|</span>
                            <a className='text-dark text-decoration-none' href={'#'}>Help</a>
                            <span className="text-muted px-2">|</span>
                            <a className='text-dark text-decoration-none' href={'#'}>Support</a>
                        </div>
                    </Bt.Col>
                    <Bt.Col lg={6} className='text-end text-lg-right'>
                        <div className='d-inline-flex align-items-center'>
                            <a className='text-dark px-2' href={'#'}><Icon.Facebook></Icon.Facebook></a>
                            <a className='text-dark px-2' href={'#'}><Icon.Twitter></Icon.Twitter></a>
                            <a className='text-dark px-2' href={'#'}><Icon.Linkedin></Icon.Linkedin></a>
                            <a className='text-dark px-2' href={'#'}><Icon.Instagram></Icon.Instagram></a>
                            <a className='text-dark px-2' href={'#'}><Icon.Youtube></Icon.Youtube></a>
                        </div>
                    </Bt.Col>
                </Bt.Row>
                <Bt.Row className='align-items-center py-3 px-xl-5'>
                    <Bt.Col lg={3} className='d-none d-lg-block'>
                        <a href={'#'} className="text-decoration-none">
                            <h1 className="text-dark m-0 display-5 fw-semibold"><span
                                className="font-weight-bold border px-3 me-1 text-primary">L3M</span>Shop</h1>
                        </a>
                    </Bt.Col>
                    <Bt.Col lg={6} className='col-6 text-start'>
                        <Bt.Form>
                            <Bt.Form.Group>
                                <Bt.InputGroup>
                                    <Bt.Form.Control type='text' placeholder='Search' className='rounded-0 shadow-none focus-outline-none fw-semibold'></Bt.Form.Control>
                                    <Bt.InputGroup.Text className='bg-transparent text-primary rounded-0'><FaSearch variant='primary' /></Bt.InputGroup.Text>
                                </Bt.InputGroup>
                            </Bt.Form.Group>
                        </Bt.Form>
                    </Bt.Col>
                    <Bt.Col lg={3} className='col-6 text-end'>
                        <a href={'#'} className='btn border rounded-0 me-3'>
                            <FaShoppingBag className='me-2 text-primary' style={{ width: 'auto', height: '25px' }} />
                            <span className='fw-semibold'>Shop</span>
                        </a>
                        <a href={'#'} className='btn border rounded-0 me-3'>
                            <FaUser style={{ width: 'auto', height: '25px' }} className='text-primary' />
                        </a>
                        <a href={'#'} className='btn border rounded-0'>
                            <FaShoppingCart style={{ width: 'auto', height: '25px' }} className='text-primary' />
                        </a>
                    </Bt.Col>
                </Bt.Row>
                {/* TopBar-end */}
            </Bt.Container>

            <Bt.Container fluid mb={5}>
                <Bt.Row className='border-top px-xl-5'>
                    <Bt.Col lg>
                        <Bt.Navbar collapseOnSelect expand='lg' className='py-3 py-lg-0 px-0'>
                            <Bt.NavbarBrand href={'#'} className='d-block d-lg-none'>
                                <h1 className="text-dark m-0 display-5 fw-semibold"><span
                                    className="font-weight-bold border px-3 me-1 text-primary">L3M</span>Shop</h1>
                            </Bt.NavbarBrand>
                            <Bt.Navbar.Toggle aria-controls='responsive-navbar-nav' className='text-primary rounded-0'></Bt.Navbar.Toggle>
                            <Bt.Navbar.Collapse id='responsive-navbar-nav' className='justify-content-between'>
                                <Bt.Nav className='me-auto py-2'>
                                    <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Home</Bt.NavLink>
                                    <Bt.NavDropdown title='Shop' className='fs-5 fw-normal me-2'>
                                        <Bt.NavDropdown.Item className='fs-5 fw-light'>Laptop</Bt.NavDropdown.Item>
                                        <Bt.NavDropdown.Divider></Bt.NavDropdown.Divider>
                                        <Bt.NavDropdown.Item className='fs-5 fw-light'>Máy tính để bàn</Bt.NavDropdown.Item>
                                    </Bt.NavDropdown>
                                    {/* <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Shop</Bt.NavLink>
                                    <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Laptop</Bt.NavLink>
                                    <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Máy tính để bàn</Bt.NavLink> */}
                                    <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Liên hệ</Bt.NavLink>
                                    <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Về chúng tôi</Bt.NavLink>
                                </Bt.Nav>

                                <Bt.Nav className='ms-auto py-2'>
                                    <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Login</Bt.NavLink>
                                    <Bt.NavLink href="#" className='fs-5 fw-normal me-2'>Register</Bt.NavLink>
                                </Bt.Nav>
                            </Bt.Navbar.Collapse>
                        </Bt.Navbar>
                    </Bt.Col>
                </Bt.Row>
            </Bt.Container>
        </>
    )
}
