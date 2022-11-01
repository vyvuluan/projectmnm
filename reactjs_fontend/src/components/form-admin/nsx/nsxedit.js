import axios from 'axios';
import React, { useState } from 'react'
import * as B from 'react-bootstrap'
import swal from 'sweetalert';

export const Nsxedit = ({ nsx, showModal }) => {
    const id = nsx.id;
    const [tennsx, setTenNsx] = useState(nsx.tenNSX);
    const [quocgia, setQuocgia] = useState(nsx.quocGia);

    const handleUpdate = (e) => {
        e.preventDefault();

        const data = {
            tenNSX: tennsx,
            quocGia: quocgia,
        }

        axios.put(`/api/kho/nsx/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success')
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error')
            }
        })
    }

    return (
        <>
            <B.Form onSubmit={handleUpdate}>
                <B.FormGroup>
                    <B.FormControl type='text' name='tennsx' className='rounded-0 shadow-none mb-3' placeholder='Tên nhà sản xuất'
                        value={tennsx} onChange={(e) => setTenNsx(e.target.value)}></B.FormControl>
                </B.FormGroup>
                <B.FormGroup>
                    <B.FormControl type='text' name='sdt' className='rounded-0 shadow-none mb-3' placeholder='Quốc gia'
                        value={quocgia} onChange={(e) => setQuocgia(e.target.value)}></B.FormControl>
                </B.FormGroup>
                <B.Button variant='primary' type='submit' className='rounded-0 w-100' onClick={showModal}>Lưu thay đổi</B.Button>
            </B.Form>
        </>
    )
}
