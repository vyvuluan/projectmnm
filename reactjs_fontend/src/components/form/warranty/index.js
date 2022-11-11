import React, { useState } from 'react'
import * as Bt from 'react-bootstrap'
import product1 from '../../../img/product-1.jpg'
import { Link } from 'react-router-dom'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert'

export default function Warrantycheck() {

    const [warrantyData, setWarrantyData] = useState();
    const [warrantyInput, setWarrantyInput] = useState();
    const [showWarranty, setShowWarranty] = useState(false);

    const handleCheckWarranty = (e) => {
        e.preventDefault();

        const prodID = warrantyInput;

        axios.get(`/api/checkBaoHanh/${prodID}`).then(res => {
            if (res.data.status === 200) {
                setWarrantyData(res.data.kq);
                setShowWarranty(true);
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error')
            }
        })
    }

    const tinhTrang = (status) => {
        if (status === 'Còn bảo hành') {
            return <td className='fw-semibold text-success'>Còn bảo hành</td>
        } else if (status === 'Hết bảo hành') {
            return <td className='fw-semibold text-danger'>Hết bảo hành</td>
        }
    }

    return (
        <>
            <Bt.Container fluid className='bg-secondary mb-5'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '300px' }}>
                    <h1 className='fw-semibold text-uppercase mb-3'>Kiểm tra tình trạng bảo hành</h1>
                    <div className='d-inline-flex'>
                        <p className='m-0'><Link to='/' className='text-decoration-none' variant='primary'>Home</Link></p>
                        <p className='m-0 px-2'>-</p>
                        <p className='m-0 text-muted'>Kiểm tra bảo hành</p>
                    </div>
                </div>
            </Bt.Container>

            <Bt.Container pt={5}>
                <Bt.Row className='px-xl-5 pt-5 text-center'>
                    <div>Khách hàng có thể mang đến địa chỉ:
                        <span className='fw-bold'> 273 An D. Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh</span> để được bảo hành
                    </div>
                </Bt.Row>
                <Bt.Form>
                    <Bt.Row className='px-xl-5 py-5'>
                        <Bt.Col lg={6} className='d-grid gap-2 mx-auto'>
                            <Bt.FormGroup className='mb-3' controlId='formSearchWarranty'>
                                <Bt.FormControl type='text' name='orderID' placeholder='Nhập vào mã hóa đơn' className='rounded-0' value={warrantyInput} onChange={(e) => setWarrantyInput(e.target.value)}></Bt.FormControl>
                            </Bt.FormGroup>
                            <Bt.ButtonGroup className='d-flex justify-content-center'>
                                <Bt.Button variant='primary' className='rounded-0 px-3 py-2' style={{ maxWidth: '120px' }} onClick={handleCheckWarranty}>Kiểm tra</Bt.Button>
                            </Bt.ButtonGroup>
                        </Bt.Col>
                    </Bt.Row>

                    {showWarranty && (
                        <Bt.Row className='px-xl-5'>
                            <Bt.Col lg className='d-grd gap-2 mx-auto table-responsive mb-5' >
                                <Bt.Table className='table-borderless border border-secondary text-center mb-0'>
                                    <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                                        <tr>
                                            <th>Tên Sản phẩm</th>
                                            <th>Thời gian bảo hành</th>
                                            <th>Ngày kích hoạt</th>
                                            <th>Ngày hết hạn</th>
                                            <th>Tình trạng</th>
                                        </tr>
                                    </thead>
                                    <tbody className='align-middle'>
                                        {warrantyData && warrantyData.map((prod, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{prod.tenSP}</td>
                                                    <td>{prod.timeBH} tháng</td>
                                                    <td>{prod.ngayMua}</td>
                                                    <td>{prod.ngayEnd}</td>
                                                    {tinhTrang(prod.status)}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Bt.Table>
                            </Bt.Col>
                        </Bt.Row>
                    )}
                </Bt.Form>
            </Bt.Container>
        </>
    )
}
