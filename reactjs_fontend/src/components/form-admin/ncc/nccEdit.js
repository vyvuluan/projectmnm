import axios from 'axios';
import React, { useState } from 'react'
import * as B from 'react-bootstrap'
import swal from 'sweetalert';

const NccEdit = ({ ncc, showModal }) => {

    const id = ncc.id;
    const [tenNccData, setTenNccData] = useState(ncc.tenNCC);
    const [sdtNcc, setSdtNcc] = useState(ncc.sdt);
    const [diachiNcc, setDiachiNcc] = useState(ncc.diaChi);

    const handleUpdate = (e) => {
        e.preventDefault();

        const data = {
            tenNCC: tenNccData,
            sdt: sdtNcc,
            diaChi: diachiNcc,
        }

        axios.put(`/api/kho/ncc/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal('Thành công', res.data.message, 'success')
            } else if (res.data.status === 404) {
                swal('Thất bại', res.data.message, 'error')
            }
        })
    }

    return (
        <>
            <B.Form onSubmit={handleUpdate}>
                <B.FormGroup>
                    <B.FormControl type='text' name='tenNCC' className='rounded-0 shadow-none mb-3' placeholder='Tên nhà cung cấp'
                        value={tenNccData} onChange={(e) => setTenNccData(e.target.value)}></B.FormControl>
                </B.FormGroup>
                <B.FormGroup>
                    <B.FormControl type='text' name='sdt' className='rounded-0 shadow-none mb-3' placeholder='Số điện thoại'
                        value={sdtNcc} onChange={(e) => setSdtNcc(e.target.value)}></B.FormControl>
                </B.FormGroup>
                <B.FormGroup>
                    <B.FormControl as='textarea' rows={3} name='diachi' className='rounded-0 shadow-none mb-3' placeholder='Địa chỉ'
                        value={diachiNcc} onChange={(e) => setDiachiNcc(e.target.value)}></B.FormControl>
                </B.FormGroup>
                <B.Button variant='primary' type='submit' className='rounded-0 w-100' onClick={showModal}>Lưu thay đổi</B.Button>
            </B.Form>
        </>
    )
}

export default NccEdit