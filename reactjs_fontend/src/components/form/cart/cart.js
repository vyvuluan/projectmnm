import React from 'react'
import product1 from '../../../img/product-1.jpg'
import * as Bt from 'react-bootstrap'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

export default function Cart() {

    const [isActive, setIsActive] = useState(false);

    const handleActiveClick = () => {
        setIsActive(current => !current)
    }


    return (
        <>
            <Bt.Container fluid className='bg-secondary mb-5'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '300px' }}>
                    <h1 className='fw-semibold text-uppercase mb-3'>Giỏ hàng</h1>
                    <div className='d-inline-flex'>
                        <p className='m-0'><a href='' className='text-decoration-none' variant='primary'>Home</a></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0 text-muted'>Giỏ hàng</p>
                    </div>
                </div>
            </Bt.Container>

            <Bt.Container fluid pt={5}>
                <Bt.Form>
                    <Bt.Row className='px-xl-5'>
                        <Bt.Col lg={8} className='table-responsive mb-5' >
                            <Bt.Table className='table-borderred text-center mb-0'>
                                <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số Lượng</th>
                                        <th>Tổng tiền</th>
                                        <th>Loại bỏ</th>
                                    </tr>
                                </thead>
                                <tbody className='align-middle'>
                                    <tr>
                                        <td className='align-middle'><img src={product1} alt='' style={{ width: '50px' }} /> Colorful
                                            Stylish Shirt</td>
                                        <td className='align-middle'>$150</td>
                                        <td className='align-middle'>
                                            <Bt.InputGroup className='quantity mx-auto' style={{ width: '100px' }}>
                                                <Bt.Button className='btn-sm rounded-0' variant='primary'>
                                                    <FaMinus />
                                                </Bt.Button>
                                                <Bt.InputGroup.Text className='form-control-sm text-center' defaultValue={'1'}>1</Bt.InputGroup.Text>
                                                <Bt.Button className='btn-sm rounded-0' variant='primary'>
                                                    <FaPlus />
                                                </Bt.Button>
                                            </Bt.InputGroup>
                                        </td>
                                        <td className='align-middle'>$150</td>
                                        <td className='align-middle'>
                                            <Bt.Button className='btn-sm rounded-0 '>
                                                <FaTimes />
                                            </Bt.Button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='align-middle'><img src={product1} alt='' style={{ width: '50px' }} /> Colorful
                                            Stylish Shirt</td>
                                        <td className='align-middle'>$150</td>
                                        <td className='align-middle'>
                                            <Bt.InputGroup className='quantity mx-auto' style={{ width: '100px' }}>
                                                <Bt.Button className='btn-sm rounded-0' variant='primary'>
                                                    <FaMinus />
                                                </Bt.Button>
                                                <Bt.InputGroup.Text className='form-control-sm text-center' defaultValue={'1'}>1</Bt.InputGroup.Text>
                                                <Bt.Button className='btn-sm rounded-0' variant='primary'>
                                                    <FaPlus />
                                                </Bt.Button>
                                            </Bt.InputGroup>
                                        </td>
                                        <td className='align-middle'>$150</td>
                                        <td className='align-middle'>
                                            <Bt.Button className='btn-sm rounded-0 '>
                                                <FaTimes />
                                            </Bt.Button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='align-middle'><img src={product1} alt='' style={{ width: '50px' }} /> Colorful
                                            Stylish Shirt</td>
                                        <td className='align-middle'>$150</td>
                                        <td className='align-middle'>
                                            <Bt.InputGroup className='quantity mx-auto' style={{ width: '100px' }}>
                                                <Bt.Button className='btn-sm rounded-0' variant='primary'>
                                                    <FaMinus />
                                                </Bt.Button>
                                                <Bt.InputGroup.Text className='form-control-sm text-center' defaultValue={'1'}>1</Bt.InputGroup.Text>
                                                <Bt.Button className='btn-sm rounded-0' variant='primary'>
                                                    <FaPlus />
                                                </Bt.Button>
                                            </Bt.InputGroup>
                                        </td>
                                        <td className='align-middle'>$150</td>
                                        <td className='align-middle'>
                                            <Bt.Button className='btn-sm rounded-0 '>
                                                <FaTimes />
                                            </Bt.Button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className='align-middle'><img src={product1} alt='' style={{ width: '50px' }} /> Colorful
                                            Stylish Shirt</td>
                                        <td className='align-middle'>$150</td>
                                        <td className='align-middle'>
                                            <Bt.InputGroup className='quantity mx-auto' style={{ width: '100px' }}>
                                                <Bt.Button className='btn-sm rounded-0' variant='primary'>
                                                    <FaMinus />
                                                </Bt.Button>
                                                <Bt.InputGroup.Text className='form-control-sm text-center' defaultValue={'1'}>1</Bt.InputGroup.Text>
                                                <Bt.Button className='btn-sm rounded-0' variant='primary'>
                                                    <FaPlus />
                                                </Bt.Button>
                                            </Bt.InputGroup>
                                        </td>
                                        <td className='align-middle'>$150</td>
                                        <td className='align-middle'>
                                            <Bt.Button className='btn-sm rounded-0 '>
                                                <FaTimes />
                                            </Bt.Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Bt.Table>
                        </Bt.Col>
                        <Bt.Col lg={4}>
                            <Bt.Card className='border-secondary rounded-0' mb={5}>
                                <Bt.Card.Header className='bg-secondary border-0 rounded-0'>
                                    <h3 className='fw-semibold m-0'>Thông tin giỏ hàng</h3>
                                </Bt.Card.Header>
                                <Bt.Card.Body>
                                    <div className='d-flex justify-content-between mb-3 pt-1'>
                                        <h6 className='fw-medium'>Tạm tính</h6>
                                        <h6 className='fw-medium'>150$</h6>
                                    </div>
                                    <div className='d-flex justify-content-between mb-3 pt-1'>
                                        <h6 className='fw-medium'>Thuế</h6>
                                        <h6 className='fw-medium'>10$</h6>
                                    </div>
                                </Bt.Card.Body>
                                <Bt.Card.Footer className='border-secondary bg-transparent d-grid gap-2'>
                                    <div className='d-flex justify-content-between mt-2'>
                                        <h5 className='fw-bold'>Tổng tiền</h5>
                                        <h5 className='fw-bold'>160$</h5>
                                    </div>
                                    <Bt.Button className='rounded-0 my-3 py-3' variant='primary'>
                                        Tiến hành thanh toán
                                    </Bt.Button>
                                </Bt.Card.Footer>
                            </Bt.Card>
                        </Bt.Col>
                    </Bt.Row>
                </Bt.Form>
            </Bt.Container>
        </>
    )
}

