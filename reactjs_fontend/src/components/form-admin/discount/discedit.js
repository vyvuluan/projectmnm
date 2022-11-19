import axios from 'axios';
import React, { useState } from 'react'
import * as B from 'react-bootstrap'
import swal from 'sweetalert';
import { AiOutlineEdit } from "react-icons/ai";

const Discedit = ({ disc, showModal }) => {
    const [error, setError] = useState([]);
    const [start, setStart] = useState(disc.start);
    const [end, setEnd] = useState(disc.end);
    const [discID, setDiscID] = useState(disc.discount_id);


    const [discEdit, setDiscEdit] = useState({
        discount: disc.discount_id,
        phantram: disc.phantram,
        dieukien: disc.dieukien,
    });

    const handleDiscChange = (e) => {
        setDiscEdit({ ...discEdit, [e.target.name]: e.target.value })
    }

    const submitChangeDisc = (e) => {
        e.preventDefault();

        const data = {
            discount_id: discEdit.discount,
            phantram: discEdit.phantram,
            start: start,
            end: end,
            dieukien: discEdit.dieukien,
        }

        axios.put(`http://localhost:8000/api/nhanvien/discount/${discID}`, data).then(res => {
            if (res.data.status === 200) {
                swal('Thành công', res.data.message, 'success');
                setError([]);
            }
            else if (res.data.status === 400) {
                setError(res.data.error);
            }
        });
    }

    return (
        <>
            <B.Form onSubmit={submitChangeDisc}>
                <B.FormGroup>
                    <B.FormLabel>Mã giảm giá</B.FormLabel>
                    <B.FormControl type='text' name='discount' className='rounded-0 shadow-none mt-1 mb-2' placeholder='Mã giảm giá'
                        onChange={handleDiscChange} value={discEdit.discount}></B.FormControl>
                    <small className='text-danger'>{error?.discount_id}</small>
                </B.FormGroup>
                <B.FormGroup>
                    <B.FormLabel>Phần trăm giảm</B.FormLabel>
                    <B.FormControl type='text' name='phantram' className='rounded-0 shadow-none mt-1 mb-2' placeholder='Phần trăm giảm'
                        onChange={handleDiscChange} value={discEdit.phantram}></B.FormControl>
                    <small className='text-danger'>{error?.phantram}</small>
                </B.FormGroup>
                <B.FormGroup>
                    <B.FormLabel>Chi tiêu tối thiểu</B.FormLabel>
                    <B.FormControl type='text' name='dieukien' className='rounded-0 shadow-none mt-1 mb-2' placeholder='Chi tiêu tối thiểu'
                        onChange={handleDiscChange} value={discEdit.dieukien}></B.FormControl>
                    <small className='text-danger'>{error?.dieukien}</small>
                </B.FormGroup>
                <B.FormGroup className='d-flex mb-3 mt-3'>
                    <B.FormLabel className='fs-5'>Từ</B.FormLabel>
                    <B.FormControl type='date' name='start' className='rounded-0 ms-2 me-2' value={start} onChange={(e) => setStart(e.target.value)}></B.FormControl>
                    <B.FormLabel className='fs-5'>Đến</B.FormLabel>
                    <B.FormControl type='date' name='end' className='rounded-0 ms-2' value={end} onChange={(e) => setEnd(e.target.value)}></B.FormControl>
                </B.FormGroup>
                <small className='text-danger'>{error?.start}</small>
                <small className='text-danger'>{error?.end}</small>
                <B.Button variant='outline-primary' type='submit' className='rounded-0 py-2 w-50 pull-right' onClick={showModal}>
                    <AiOutlineEdit />
                    Lưu thay đổi
                </B.Button>
            </B.Form>
        </>
    )
}

export default Discedit;
