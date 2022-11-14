import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react'
import * as B from 'react-bootstrap'
import swal from 'sweetalert';
import { Editor } from "@tinymce/tinymce-react";

const Prodedit = ({ product, showModal }) => {

    const [picture, setPicture] = useState([]);
    const [previewIMG, setPreviewIMG] = useState();
    const [mota, setMota] = useState(product.moTa);
    const [ctsp, setCtsp] = useState(product.ctSanPham);
    const [tabkey, setTabKey] = useState(1);
    const editorRef = useRef(product.moTa);

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

    useEffect(() => {
        return () => {
            previewIMG && URL.revokeObjectURL(previewIMG.preview);
        };
    }, [previewIMG]);

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });

        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setPreviewIMG(file);
    };

    const handleMotaChange = (value) => {
        setMota({ value });
    }

    const handleCTSPChange = (value) => {
        setCtsp({ value })
    }

    const handleProductChange = (e) => {
        setProdEdit({ ...prodEdit, [e.target.name]: e.target.value });
    };


    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("hinh", picture.image);
        formData.set("maLoai", prodEdit.loaisp);
        formData.set("tenSP", prodEdit.tenSP);
        formData.set("soLuongSP", prodEdit.sl);
        formData.set("gia", prodEdit.gia);
        formData.set("maNCC", prodEdit.ncc);
        formData.set("maNSX", prodEdit.nsx);
        formData.set("moTa", mota);
        formData.set("baoHanh", prodEdit.baohanh);
        formData.set("ctSanPham", ctsp);

        axios.post(`/api/kho/products/update/${id}`, formData).then(res => {
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
                        <B.Row>
                            <B.Col lg={4}>
                                {previewIMG && previewIMG !== null ?
                                    <div className="prev-container mb-4">
                                        {<img src={previewIMG.preview} alt=""></img>}
                                    </div>
                                    : <div className="prev-container mb-2 me-2">
                                        {<img src={`http://localhost:8000/uploadhinh/${product.hinh}`} alt=""></img>}
                                    </div>}
                                <B.FormGroup className="">
                                    <B.FormControl
                                        type="file"
                                        name="image"
                                        onChange={handleImage}
                                        className="rounded-0 shadow-none mb-3"
                                    ></B.FormControl>
                                </B.FormGroup>
                            </B.Col>
                            <B.Col lg={8}>
                                <B.FormGroup>
                                    <B.FormLabel>Tên sản phẩm</B.FormLabel>
                                    <B.FormControl type='text' name='tenSP' className='rounded-0 shadow-none mb-3 w-100' placeholder='Tên sản phẩm'
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
                                <B.FormGroup>
                                    <B.FormLabel>Bảo Hành</B.FormLabel>
                                    <B.FormControl type='text' name='baohanh' className='rounded-0 shadow-none mb-3' placeholder='Bảo Hành'
                                        value={prodEdit.baohanh} onChange={handleProductChange}></B.FormControl>
                                </B.FormGroup>
                            </B.Col>
                        </B.Row>
                        <B.Button variant='primary' type='submit' className='rounded-0 w-100' onClick={showModal}>Lưu thay đổi</B.Button>
                    </B.Form>
                </B.Tab>
                <B.Tab eventKey={2} title="Mô tả sản phẩm" className=" border border-top-0 py-3 px-3">
                    <Editor
                        apiKey="a8nb9uaw0lp4od36nbcunv8as7dlqf8udfnatman56onjtpv"
                        onEditorChange={handleMotaChange}
                        // onInit={mota}
                        // onInit={(editor) => { editorRef.current = editor }}

                        initialValue={mota}
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
                        apiKey="a8nb9uaw0lp4od36nbcunv8as7dlqf8udfnatman56onjtpv"
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