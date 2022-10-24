import React, { useState } from 'react'
import * as B from 'react-bootstrap'

const NccEdit = ({ ncc }) => {

    const id = ncc.id;
    const [tenNCC, setTenNCC] = useState(ncc.tenNCC);
    const [sdt, setSdt] = useState(ncc.sdt);
    const [diachi, setDiachi] = useState(ncc.diaChi);

    return (
        <>
            <B.Form>
                <B.FormGroup>
                    <B.FormControl type='text' name='tenNCC' className='rounded-0 shadow-none mb-3' placeholder='Tên nhà cung cấp'
                        value={tenNCC} onChange={(e) => setTenNCC(e.target.value)}></B.FormControl>
                </B.FormGroup>
                <B.FormGroup>
                    <B.FormControl type='text' name='sdt' className='rounded-0 shadow-none mb-3' placeholder='Số điện thoại'
                        value={sdt} onChange={(e) => setSdt(e.target.value)}></B.FormControl>
                </B.FormGroup>
                <B.FormGroup>
                    <B.FormControl as='textarea' rows={3} name='diachi' className='rounded-0 shadow-none mb-3' placeholder='Địa chỉ'
                        value={diachi} onChange={(e) => setDiachi(e.target.value)}></B.FormControl>
                </B.FormGroup>
                <B.Button variant='outline-primary' type='submit'>Sửa nhà cung cấp</B.Button>
            </B.Form>
        </>
    )
}

export default NccEdit