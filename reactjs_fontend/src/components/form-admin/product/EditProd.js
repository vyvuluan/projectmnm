import axios from 'axios';
import React, { useState, useRef } from 'react'
import * as B from 'react-bootstrap'
import swal from 'sweetalert';
import { Editor } from "@tinymce/tinymce-react";

const Prodedit = ({ product, showModal }) => {

    const editorRef = useRef(null);
    const [mota, setMota] = useState(product.moTa);
    const [ctsp, setCtsp] = useState(product.ctSanPham);
    const [tabkey, setTabKey] = useState(1);

    const id = product.id;
    const [prodEdit, setProdEdit] = useState({
        tenSP: product.tenSP,
        sl: product.soLuongSP,
        gia: product.gia,
        loaisp: product.maLoai,
        baohanh: product.baoHanh,
        ncc: product.maNCC,
        nsx: product.maNSX,
    });

    const handleMotaChange = (value) => {
        setMota({ moTa: value });
    }

    const handleCTSPChange = (value) => {
        setCtsp({ ctSanPham: value })
    }

    const handleProductChange = (e) => {
        setProdEdit({ ...prodEdit, [e.target.name]: e.target.value });
    };


    const handleUpdate = (e) => {
        e.preventDefault();

        const data = {
            tenSP: prodEdit.tenSP,
            soLuongSP: prodEdit.sl,
            gia: prodEdit.gia,
            baoHanh: prodEdit.baohanh,
            maLoai: prodEdit.loaisp,
            maNCC: prodEdit.ncc,
            maNSX: prodEdit.nsx,
            moTa: mota.moTa,
            ctSanPham: ctsp.ctSanPham,
        }

        axios.put(`/api/kho/products/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, 'success')
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error')
            }
        })
    }

    return (
        <>
            <B.Tabs
                activeKey={tabkey}
                onSelect={(k) => setTabKey(k)}
            >
                <B.Tab eventKey={1} title="Thông tin sản phẩm" className=" border border-top-0 py-3 px-3">
                    <B.Form onSubmit={handleUpdate}>
                        <B.FormGroup>
                            <B.FormLabel>Tên sản phẩm</B.FormLabel>
                            <B.FormControl type='text' name='tenSP' className='rounded-0 shadow-none mb-3' placeholder='Tên sản phẩm'
                                value={prodEdit.tenSP} onChange={handleProductChange}></B.FormControl>
                        </B.FormGroup>
                        <B.FormGroup>
                            <B.FormLabel>Số Lượng</B.FormLabel>
                            <B.FormControl type='text' name='sl' className='rounded-0 shadow-none mb-3' placeholder='Số Lượng'
                                value={prodEdit.sl} onChange={handleProductChange}></B.FormControl>
                        </B.FormGroup>
                        <B.FormGroup>
                            <B.FormLabel>Giá</B.FormLabel>
                            <B.FormControl type='text' name='gia' className='rounded-0 shadow-none mb-3' placeholder='Giá'
                                value={prodEdit.gia} onChange={handleProductChange}></B.FormControl>
                        </B.FormGroup>
                        {/* <B.FormGroup>
                            <B.FormLabel>Loại sản phẩm</B.FormLabel>
                            <B.FormControl type='text' name='loaisp' className='rounded-0 shadow-none mb-3' placeholder='Loại sản phẩm'
                                value={prodEdit.loaisp} onChange={handleProductChange}></B.FormControl>
                        </B.FormGroup> */}
                        <B.FormGroup>
                            <B.FormLabel>Bảo Hành</B.FormLabel>
                            <B.FormControl type='text' name='baohanh' className='rounded-0 shadow-none mb-3' placeholder='Bảo Hành'
                                value={prodEdit.baohanh} onChange={handleProductChange}></B.FormControl>
                        </B.FormGroup>
                        {/* <B.FormGroup>
                            <B.FormLabel>Nhà cung cấp</B.FormLabel>
                            <B.FormControl type='text' name='ncc' className='rounded-0 shadow-none mb-3' placeholder='Nhà cung cấp'
                                value={prodEdit.ncc} onChange={handleProductChange}></B.FormControl>
                        </B.FormGroup>
                        <B.FormGroup>
                            <B.FormLabel>Nhà sản xuất</B.FormLabel>
                            <B.FormControl type='text' name='nsx' className='rounded-0 shadow-none mb-3' placeholder='Nhà sản xuất'
                                value={prodEdit.nsx} onChange={handleProductChange}></B.FormControl>
                        </B.FormGroup> */}
                        <B.Button variant='primary' type='submit' className='rounded-0 w-100' onClick={showModal}>Lưu thay đổi</B.Button>
                    </B.Form>
                </B.Tab>
                <B.Tab eventKey={2} title="Mô tả sản phẩm" className=" border border-top-0 py-3 px-3">
                    <Editor
                        apiKey="9h1x1877ytvzphzr5xx9vfz2454i9j6kvn1pq8hyd9le04yl"
                        onEditorChange={handleMotaChange}
                        onInit={(evt, editor) => {
                            editorRef.current = editor
                        }}
                        initialValue={mota}
                        // value={mota}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "media",
                                "image",
                                "editimage"
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter media image editimage " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            file_picker_callback: function (cb, value, meta) {
                                var input = document.createElement("input");
                                input.setAttribute("type", "file");
                                input.setAttribute("accept", "image/*");
                                input.onchange = function () {
                                    var file = this.files[0];

                                    var reader = new FileReader();
                                    reader.onload = function () {
                                        var id = "blobid" + new Date().getTime();
                                        var blobCache = editorRef.current.editorUpload.blobCache;
                                        var base64 = reader.result.split(",")[1];
                                        var blobInfo = blobCache.create(id, file, base64);
                                        blobCache.add(blobInfo);
                                        cb(blobInfo.blobUri(), { title: file.name });
                                    };
                                    reader.readAsDataURL(file);
                                };
                                input.click();
                            },
                        }}
                    />
                </B.Tab>
                <B.Tab eventKey={3} title="Chi tiết sản phẩm" className=" border border-top-0 py-3 px-3">
                    <Editor
                        apiKey="9h1x1877ytvzphzr5xx9vfz2454i9j6kvn1pq8hyd9le04yl"
                        onEditorChange={handleCTSPChange}
                        onInit={(evt, editor) => {
                            editorRef.current = editor
                        }}
                        initialValue={ctsp}
                        // value={ctsp}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "insertdatetime",
                                "table",
                                "wordcount",
                                "fullscreen"
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter" +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                    />
                </B.Tab>
            </B.Tabs>

        </>
    )
}

export default Prodedit