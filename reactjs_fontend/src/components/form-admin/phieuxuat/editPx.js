import axios from 'axios';
import React, { useState, useRef } from 'react'
import * as B from 'react-bootstrap'
import swal from 'sweetalert';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { FaMinus, FaPlus, } from "react-icons/fa";

const PxEdit = ({ px, showModal }) => {

    const [editPxInput, setEditPxInput] = useState({
        tenKH: px.tenKH,
        sdtKH: px.sdt,
        diaChi: px.diaChi,
    });

    const handleEditProdChange = (e) => {
        setEditPxInput({ ...editPxInput, [e.target.name]: e.target.value })
    }

    const handleEditPxSubmit = (e) => {
        e.preventDefault();

        const idpx = px.id;
        const data = {
            tenKH: editPxInput.tenKH,
            sdt: editPxInput.sdtKH,
            diaChi: editPxInput.diaChi,
            pt_ThanhToan: px.pt_ThanhToan,
            tongTien: px.tongTien,
            status: px.status,
        }

        axios.put(`/api/kho/px/${idpx}`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success')
            }
        })
    }

    return (
        <>
            <B.Form onSubmit={handleEditPxSubmit}>
                <B.Row>
                    <B.FormGroup>
                        <B.FormLabel className='fs-5'>Họ và tên</B.FormLabel>
                        <B.FormControl type='text' name='tenKH' placeholder='Nhập vào họ và tên' className='rounded-0 shadow-none mb-3'
                            value={editPxInput.tenKH} onChange={handleEditProdChange}></B.FormControl>
                    </B.FormGroup>
                    <B.FormGroup>
                        <B.FormLabel className='fs-5'>Số điện thoại</B.FormLabel>
                        <B.FormControl type='text' name='sdtKH' placeholder='Nhập vào số điện thoại' className='rounded-0 shadow-none mb-3' maxLength='10'
                            value={editPxInput.sdtKH} onChange={handleEditProdChange}></B.FormControl>
                    </B.FormGroup>
                    <B.FormGroup>
                        <B.FormLabel className='fs-5'>Địa chỉ</B.FormLabel>
                        <B.FormControl as='textarea' rows={3} name='diaChi' placeholder='Nhập vào địa chỉ' className='rounded-0 shadow-none mb-3'
                            value={editPxInput.diaChi} onChange={handleEditProdChange}></B.FormControl>
                    </B.FormGroup>
                </B.Row>
                <B.Button type='submit' variant='primary' className='rounded-0 mb-3' onClick={showModal}>Lưu thay đổi</B.Button>
            </B.Form>
        </>
    )
}

export default PxEdit