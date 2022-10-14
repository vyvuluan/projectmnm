import React, { useState } from 'react'
import * as B from 'react-bootstrap'
import axios from 'axios';
import swal from 'sweetalert'

function TestTable() {

    const [categoryInput, setCategory] = useState({
        name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            name: categoryInput.name,
        }

        axios.post(`http://localhost:8000/api/loaisp`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success')
                document.getElementById('formLoaiSP').reset();
            }
            else if (res.data.status === 400) {
                setCategory({ ...categoryInput, error_list: res.data.error })
            }
        });
    }

    var display_error = [];
    if (categoryInput.error_list) {
        display_error = [
            categoryInput.error_list.name,
        ]
    }

    return (
        <div>
            <B.Container>
                <B.Row>
                    <B.Col className='d-inline-block'>

                        {
                            display_error.map((item, index) => {
                                return (<li key={index}>{item}</li>)
                            })
                        }

                        <B.Form onSubmit={submitCategory} id='formLoaiSP'>
                            <B.FormGroup controlId='formTenLoaiSP'>
                                <B.FormLabel>Tên loại sản phẩm</B.FormLabel>
                                <B.FormControl type='text' name='name' onChange={handleInput} value={categoryInput.name}></B.FormControl>
                                <span>{categoryInput.error_list.name}</span>
                            </B.FormGroup>
                            {/* <B.FormGroup controlId='formGiaSP'>
                                <B.FormLabel>Giá sản phẩm</B.FormLabel>
                                <B.FormControl type='text'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup controlId='formSLSP'>
                                <B.FormLabel>Số lượng</B.FormLabel>
                                <B.FormControl type='text'></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup controlId='formMotaSP'>
                                <B.FormLabel>Mô tả sản phẩm</B.FormLabel>
                                <B.FormControl as='textarea' rows={6}></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup controlId='formCTSP'>
                                <B.FormLabel>Chi tiết sản phẩm</B.FormLabel>
                                <B.FormControl as='textarea' rows={6}></B.FormControl>
                            </B.FormGroup>
                            <B.FormGroup controlId='formLoaiSP'>
                                <B.FormLabel>Loại sản phẩm</B.FormLabel>
                                <B.FormControl type='text'></B.FormControl>
                            </B.FormGroup> */}
                            <B.Button variant='primary' className='rounded-0 mt-3' type='submit'>Thêm sản phẩm</B.Button>
                        </B.Form>
                    </B.Col>
                </B.Row>
            </B.Container>
        </div>
    )
}

export default TestTable