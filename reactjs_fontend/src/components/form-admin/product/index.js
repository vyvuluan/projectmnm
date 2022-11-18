import React, { useState, useEffect, useRef, useCallback } from "react";
import * as B from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { BsPersonPlusFill, BsTrash2 } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Pagination from "../../form/pagination";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import EditProd from "./EditProd";
import "./style.css";

const sort = [
  { value: '', name: 'Sắp xếp' },
  { value: '1', name: 'Tên A-Z' },
  { value: '2', name: 'Tên Z-A' },
  { value: '3', name: 'Giá cao-thấp' },
  { value: '4', name: 'Giá thấp-cao' },
]

function Index() {
  const [roleID, setRoleID] = useState();
  const [submitting, setSubmitting] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [categorylist, setCategorylist] = useState([]);
  const [ncclist, setNcclist] = useState([]);
  const [nccData, setNccData] = useState();
  const [nsxlist, setNsxlist] = useState([]);
  const [nsxData, setNsxData] = useState([]);
  const [prodSearchlist, setProdSearchlist] = useState([]);
  const [showTable, setShowtable] = useState(false);
  const [pricture, setPicture] = useState([]);
  const [previewIMG, setPreviewIMG] = useState();
  const [errorlist, setError] = useState([]);
  const [viewProd, setViewProd] = useState([]);
  const [mota, setMota] = useState("");
  const [ctsp, setCtsp] = useState("");
  const [tabkey, setTabkey] = useState(1);
  const editorRef = useRef(null);
  const [productInput, setProduct] = useState({
    loaisp_id: "",
    tenSP: "",
    gia: "",
    ncc_id: "",
    nsx_id: "",
    baohanh: "",
    moTa: "",
    ctSanPham: "",
  });

  useEffect(() => {
    const cookies = new Cookies();
    setRoleID(cookies.get("role_id"));
  }, []);

  const [editorKey, setEditorKey] = React.useState(4);
  const [show, setShow] = useState(false);
  const [prodData, setProdData] = useState();
  const handleClose = () => {
    setShow((prev) => !prev);
    setSubmitting(true);
  }
  const handleShow = (prod) => {
    setShow(true);
    setProdData(prod);
  };

  function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }

  const handlePerPage = (page) => {
    setPage(page);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }
  // Thêm sản phẩm (start)
  const handleProductInput = (e) => {
    setProduct({ ...productInput, [e.target.name]: e.target.value });
  };

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

  const handleCTSPInput = (value) => {
    setCtsp({ ctSanPham: value });
  };

  const handleMotaInput = (value) => {
    setMota({ moTa: value });
  };

  const handleOnSearch = (key) => {
    axios.get(`http://localhost:8000/api/searchNcc?key=${key}`).then((res) => {
      if (res.data.status === 200) {
        setNcclist(res.data.ncc);
      }
    });
  };

  const handleOnSelect = (value) => {
    setNccData(value.id);
  };

  const handleOnNsxSearch = (key) => {
    axios.get(`http://localhost:8000/api/searchNsx?key=${key}`).then((res) => {
      if (res.data.status === 200) {
        setNsxlist(res.data.nsx);
      }
    });
  };

  const handleOnNsxSelect = (value) => {
    setNsxData(value.id);
  };

  const handleOnProdSearch = (key) => {
    if (key !== '') {
      axios.get(`http://localhost:8000/api/searchProduct?key=${key}`).then((res) => {
        if (res.data.status === 200) {
          setProdSearchlist(res.data.product);
          setShowtable(true);
        }
      });
    }
  };

  const handleOnProdClear = () => {
    setShowtable(false);
    setProdSearchlist([]);
  };

  useEffect(() => {
    let isMounted = true;

    axios.get(`http://localhost:8000/api/loaisp/view`).then((res) => {
      if (isMounted) {
        if (res.data.status === 200) {
          setCategorylist(res.data.Loaisp);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const submitProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("hinh", pricture.image);
    formData.append("maLoai", productInput.loaisp_id);
    formData.append("tenSP", productInput.tenSP);
    formData.append("soLuongSP", productInput.soLuong);
    formData.append("gia", productInput.gia);
    formData.append("maNCC", nccData);
    formData.append("maNSX", nsxData);
    formData.append("moTa", mota.moTa);
    formData.append("baoHanh", productInput.baohanh);
    formData.append("ctSanPham", ctsp.ctSanPham);
    const newKey = editorKey * 43;

    axios
      .post(`http://localhost:8000/api/kho/products`, formData)
      .then((res) => {
        if (res.data.status === 200) {
          swal("Thêm sản phẩm thành công", res.data.message, "success");
          setProduct({
            ...productInput,
            loaisp_id: "",
            tenSP: "",
            gia: "",
            ncc_id: "",
            nsx_id: "",
            baohanh: "",
            moTa: "",
            ctSanPham: "",
          });
          setCtsp("");
          setMota("");
          setError([]);
          setSubmitting(true);
          setEditorKey(newKey);
          setPreviewIMG();
        } else if (res.data.status === 422) {
          swal("Vui lòng nhập đầy đủ các mục", "", "error");
          setError(res.data.errors);
        }
      });
  };
  // Thêm sản phẩm (end)
  const getProdData = useCallback(async () => {
    const res = await axios.get(`/api/products/view?page=${page}`)
    if (res.status === 200) {
      setViewProd(res.data.data);
      setTotalPage(res.data.total);
      setPerPage(res.data.per_page);
      setCurrentPage(res.data.current_page);
    }
  }, [page]);

  useEffect(() => {
    getProdData().then(() => setSubmitting(false));
  }, [getProdData, submitting]);

  const handleDeleteProd = (prod) => {
    const product_id = prod.id;
    swal({
      text: 'Xóa sản phẩm sẽ không thể hoàn tác!',
      title: 'Bạn chắc chứ?',
      icon: 'warning',
      buttons: {
        cancel: "Hủy bỏ",
        yes: {
          text: "Xóa sản phẩm",
          value: "yes",
        },
      }
    }).then((value) => {
      if (value === 'yes') {
        axios.delete(`/api/kho/products/${product_id}`).then(res => {
          if (res.data.status === 200) {
            setSubmitting(true);
            swal('Thành công', res.data.message, 'success');
          } else if (res.data.message === 404) {
            swal('Thất bại', res.data.message, 'error');
          }
        })
      }
    })

  }

  const SortStt = (e) => {
    if (e !== '') {
      axios.get(`/api/sortProduct?key=${e}`).then(res => {
        if (res.data.status === 200) {
          setViewProd(res.data.product.data);
          setTotalPage(res.data.product.total);
          setPerPage(res.data.product.per_page);
          setCurrentPage(res.data.product.current_page);
        }
      })
    } else if (e === '') {
      setSubmitting(true);
    }
  }

  return (
    <>
      <B.Modal size="xl" show={show} onHide={handleClose}>
        <B.ModalHeader closeButton className="bg-secondary">
          <B.ModalTitle>Sửa sản phẩm</B.ModalTitle>
        </B.ModalHeader>
        <B.ModalBody>
          <EditProd product={prodData} showModal={handleClose} />
        </B.ModalBody>
        <B.ModalFooter className="bg-secondary">
          <B.Button
            variant="outline-primary"
            className="mt-2 rounded-0"
            onClick={handleClose}
          >
            Hủy bỏ
          </B.Button>
        </B.ModalFooter>
      </B.Modal>

      <B.Container fluid>
        <B.Row className="px-xl-3 mb-4">
          <B.Col lg={4}>
            <h1 className="fw-bold text-primary mb-4 text-capitalize">
              QUẢN LÝ SẢN PHẨM
            </h1>
          </B.Col>
        </B.Row>

        {roleID === '3' ? (
          <B.Tabs activeKey={tabkey} onSelect={(k) => setTabkey(k)}>
            <B.Tab
              eventKey={1}
              title="Thêm sản phẩm"
              className=" border border-top-0 py-3 px-3"
            >
              <B.Form>
                <B.Row>
                  <B.Col lg={3}>
                    <div className="prev-container mb-4">
                      {previewIMG && <img src={previewIMG.preview} alt=""></img>}
                    </div>
                    <B.FormGroup className="file_wrap">
                      <B.FormControl
                        size="md"
                        type="file"
                        name="image"
                        onChange={handleImage}
                        className="rounded-0 shadow-none mb-3 w-50"
                      ></B.FormControl>
                      <small className="text-danger">{errorlist.image}</small>
                    </B.FormGroup>
                  </B.Col>
                  <B.Col lg={9}>
                    <B.FormGroup>
                      <B.FormControl
                        type="text"
                        name="tenSP"
                        className="rounded-0 shadow-none mb-3"
                        placeholder="Tên sản phẩm"
                        onChange={handleProductInput}
                        value={productInput.tenSP}
                      ></B.FormControl>
                      <small className="text-danger">{errorlist.tenSP}</small>
                    </B.FormGroup>

                    <div className="d-flex">
                      <B.FormGroup className="me-2 w-100">
                        <B.FormSelect
                          name="loaisp_id"
                          onChange={handleProductInput}
                          value={productInput.loaisp_id}
                          className="rounded-0 shadow-none mb-3 text-muted"
                        >
                          <option>Chọn loại sản phẩm</option>
                          {categorylist &&
                            categorylist.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.tenLoai}
                                </option>
                              );
                            })}
                        </B.FormSelect>
                        <small className="text-danger">
                          {errorlist.loaisp_id}
                        </small>
                      </B.FormGroup>
                      <B.FormGroup className="w-100 me-2">
                        <B.FormControl
                          type="text"
                          name="gia"
                          className="rounded-0 shadow-none mb-3"
                          placeholder="Giá"
                          onChange={handleProductInput}
                          value={productInput.gia}
                        ></B.FormControl>
                        <small className="text-danger">{errorlist.gia}</small>
                      </B.FormGroup>
                      <B.FormGroup className="w-100">
                        <B.FormControl
                          type="text"
                          name="baohanh"
                          className="rounded-0 shadow-none mb-3"
                          placeholder="Bảo hành (tháng)"
                          onChange={handleProductInput}
                          value={productInput.baohanh}
                        ></B.FormControl>
                        <small className="text-danger">{errorlist.baohanh}</small>
                      </B.FormGroup>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="w-100 me-2">
                        <ReactSearchAutocomplete
                          items={ncclist}
                          onSearch={handleOnSearch}
                          onSelect={handleOnSelect}
                          placeholder='Tìm kiếm nhà cung cấp'
                          fuseOptions={{ keys: ["id", "tenNCC"] }}
                          resultStringKeyName="tenNCC"
                          styling={{
                            height: "36px",
                            border: "1px solid lightgray",
                            borderRadius: "0",
                            backgroundColor: "white",
                            boxShadow: "none",
                            hoverBackgroundColor: "#d19c97",
                            color: "black",
                            fontSize: "15px",
                            iconColor: "black",
                            lineColor: "#d19c97",
                            clearIconMargin: "3px 8px 0 0",
                          }}
                        />
                      </div>
                      <div className="w-100">
                        <ReactSearchAutocomplete
                          items={nsxlist}
                          onSearch={handleOnNsxSearch}
                          onSelect={handleOnNsxSelect}
                          placeholder='Tìm kiếm nhà sản xuất'
                          fuseOptions={{ keys: ["id", "tenNSX"] }}
                          resultStringKeyName="tenNSX"
                          styling={{
                            height: "36px",
                            border: "1px solid lightgray",
                            borderRadius: "0",
                            backgroundColor: "white",
                            boxShadow: "none",
                            hoverBackgroundColor: "#d19c97",
                            color: "black",
                            fontSize: "15px",
                            iconColor: "black",
                            lineColor: "#d19c97",
                            clearIconMargin: "3px 8px 0 0",
                          }}
                        />
                      </div>
                    </div>
                  </B.Col>
                </B.Row>
              </B.Form>
            </B.Tab>

            <B.Tab
              eventKey={2}
              title="Thêm chi tiết/mô tả"
              className=" border border-top-0 py-3 px-3"
            >
              <B.Row>
                <B.Col lg={4}>
                  <label className="ps-3 ms-1 fs-5 fw-semibold text-uppercase border border-5 border-top-0 border-bottom-0 border-end-0 border-primary">
                    Chi tiết sản phẩm
                  </label>
                  <Editor
                    key={editorKey}
                    apiKey="a8nb9uaw0lp4od36nbcunv8as7dlqf8udfnatman56onjtpv"
                    onEditorChange={handleCTSPInput}
                    onInit={(evt, editor) => {
                      editorRef.current = editor;
                    }}
                    initialValue={"<p>CPU: </p> <p>Ram: </p> <p>GPU: </p> <p>Màn hình: </p> <p>Bộ nhớ: </p> <p>Pin: </p> <p>Khối lượng: </p>"}
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
                        "fullscreen",
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
                </B.Col>
                <B.Col lg={8}>
                  <label className="ps-3 ms-1 fs-5 fw-semibold text-uppercase border border-5 border-top-0 border-bottom-0 border-end-0 border-primary">
                    Mô tả sản phẩm
                  </label>
                  <Editor
                    key={editorKey}
                    apiKey="a8nb9uaw0lp4od36nbcunv8as7dlqf8udfnatman56onjtpv"
                    onEditorChange={handleMotaInput}
                    onInit={(evt, editor) => {
                      editorRef.current = editor;
                    }}
                    initialValue={"<p>Đây là mô tả của sản phẩm</p>"}
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
                        "editimage",
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
                            var blobCache =
                              editorRef.current.editorUpload.blobCache;
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
                </B.Col>
              </B.Row>
            </B.Tab>

            <B.Tab
              eventKey={3}
              title="Xem sản phẩm"
              className=" border border-top-0 py-3 px-3"
            >
              <B.Row className='px-xl-3 mb-3'>
                <B.Col lg={4}>
                  <ReactSearchAutocomplete
                    items={prodSearchlist}
                    onSearch={handleOnProdSearch}
                    onClear={handleOnProdClear}
                    placeholder='Tìm kiếm sản phẩm'
                    maxResults={10}
                    showNoResults={false}
                    styling={{
                      height: "34px",
                      border: "1px solid lightgray",
                      borderRadius: "0",
                      backgroundColor: "white",
                      boxShadow: "none",
                      hoverBackgroundColor: "#d19c97",
                      color: "black",
                      fontSize: "15px",
                      iconColor: "black",
                      lineColor: "#d19c97",
                      clearIconMargin: "3px 8px 0 0",
                      zIndex: '2',
                    }}
                  />
                </B.Col>
                <B.Col lg={8}>
                  <B.FormGroup className='mb-2 pull-right'>
                    <B.FormSelect className='rounded-0 shadow-none' style={{ width: '200px' }} onChange={(e) => SortStt(e.target.value)}>
                      {sort.map((item, index) => (
                        <option value={item.value}>{item.name}</option>
                      ))}
                    </B.FormSelect>
                  </B.FormGroup>
                </B.Col>
              </B.Row>
              <B.Row className="px-xl-3 mb-3">
                {/* <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
                <B.FormSelect
                  className="rounded-0 shadow-none"
                  style={{ width: "200px" }}
                >
                  <option>Sắp xếp</option>
                  <option>Từ A-Z</option>
                  <option>Theo ID</option>
                  <option>Theo loại</option>
                </B.FormSelect>
              </B.FormGroup> */}
                <B.Table responsive className="table-borderless border border-secondary mb-0">
                  <thead
                    className="text-dark"
                    style={{ backgroundColor: "#edf1ff" }}
                  >
                    <tr>
                      <th>STT</th>
                      <th>Tên sản phẩm</th>
                      <th>Loại</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th className="text-center">Thao tác</th>
                    </tr>
                  </thead>
                  {!showTable && (
                    <tbody>
                      {viewProd.map((item, index) => {
                        return (
                          <>
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td><img
                                src={`http://localhost:8000/uploadhinh/${item.hinh}`}
                                width="50px"
                                alt={item.tenSP}
                              /> {item.tenSP}</td>
                              <td>{item.maLoai}</td>
                              <td>
                                {formatMoney(item.gia)}
                              </td>
                              <td>{item.soLuongSP}</td>
                              <td className="text-center fs-5 text-primary">
                                <BiEdit className="me-2" onClick={() => handleShow(item)} />
                                <BsTrash2 onClick={() => handleDeleteProd(item)} />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  )}
                  {showTable && (
                    <tbody>
                      {prodSearchlist && prodSearchlist.map((item, index) => {
                        return (
                          <>
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td><img
                                src={`http://localhost:8000/uploadhinh/${item.hinh}`}
                                width="50px"
                                alt={item.tenSP}
                              /> {item.tenSP}</td>
                              <td>{item.maLoai}</td>
                              <td>
                                {formatMoney(item.gia)}
                              </td>
                              <td>{item.soLuongSP}</td>
                              <td className="text-center fs-5 text-primary">
                                <BiEdit className="me-2" onClick={() => handleShow(item)} />
                                <BsTrash2 onClick={() => handleDeleteProd(item)} />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  )}
                </B.Table>
              </B.Row>
              <Pagination
                currentPage={currentPage}
                totalPage={pageNumbers}
                handlePerPage={handlePerPage}
              />
            </B.Tab>
          </B.Tabs>
        ) : (
          <>
            <B.Row className='px-xl-3 mb-3'>
              <B.Col lg={4}>
                <ReactSearchAutocomplete
                  items={prodSearchlist}
                  onSearch={handleOnProdSearch}
                  onClear={handleOnProdClear}
                  placeholder='Tìm kiếm sản phẩm'
                  maxResults={10}
                  showNoResults={false}
                  styling={{
                    height: "34px",
                    border: "1px solid lightgray",
                    borderRadius: "0",
                    backgroundColor: "white",
                    boxShadow: "none",
                    hoverBackgroundColor: "#d19c97",
                    color: "black",
                    fontSize: "15px",
                    iconColor: "black",
                    lineColor: "#d19c97",
                    clearIconMargin: "3px 8px 0 0",
                    zIndex: '2',
                  }}
                />
              </B.Col>
              <B.Col lg={8}>
                <B.FormGroup className='mb-2 pull-right'>
                  <B.FormSelect className='rounded-0 shadow-none' style={{ width: '200px' }} onChange={(e) => SortStt(e.target.value)}>
                    {sort.map((item, index) => (
                      <option value={item.value}>{item.name}</option>
                    ))}
                  </B.FormSelect>
                </B.FormGroup>
              </B.Col>
            </B.Row>
            <B.Row className="px-xl-3 mb-3">
              {/* <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
                <B.FormSelect
                  className="rounded-0 shadow-none"
                  style={{ width: "200px" }}
                >
                  <option>Sắp xếp</option>
                  <option>Từ A-Z</option>
                  <option>Theo ID</option>
                  <option>Theo loại</option>
                </B.FormSelect>
              </B.FormGroup> */}
              <B.Table responsive className="table-borderless border border-secondary mb-0">
                <thead
                  className="text-dark"
                  style={{ backgroundColor: "#edf1ff" }}
                >
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Loại</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th className="text-center">Thao tác</th>
                  </tr>
                </thead>
                {!showTable && (
                  <tbody>
                    {viewProd.map((item, index) => {
                      return (
                        <>
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td><img
                              src={`http://localhost:8000/uploadhinh/${item.hinh}`}
                              width="50px"
                              alt={item.tenSP}
                            /> {item.tenSP}</td>
                            <td>{item.maLoai}</td>
                            <td>
                              {formatMoney(item.gia)}
                            </td>
                            <td>{item.soLuongSP}</td>
                            <td className="text-center fs-5 text-primary">
                              <BiEdit className="me-2" onClick={() => handleShow(item)} />
                              <BsTrash2 onClick={() => handleDeleteProd(item)} />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                )}
                {showTable && (
                  <tbody>
                    {prodSearchlist && prodSearchlist.map((item, index) => {
                      return (
                        <>
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td><img
                              src={`http://localhost:8000/uploadhinh/${item.hinh}`}
                              width="50px"
                              alt={item.tenSP}
                            /> {item.tenSP}</td>
                            <td>{item.maLoai}</td>
                            <td>
                              {formatMoney(item.gia)}
                            </td>
                            <td>{item.soLuongSP}</td>
                            <td className="text-center fs-5 text-primary">
                              <BiEdit className="me-2" onClick={() => handleShow(item)} />
                              <BsTrash2 onClick={() => handleDeleteProd(item)} />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                )}
              </B.Table>
            </B.Row>
            <Pagination
              currentPage={currentPage}
              totalPage={pageNumbers}
              handlePerPage={handlePerPage}
            />
          </>
        )}

        <B.Button
          variant="outline-primary"
          className="rounded-0 py-2 mb-2 mt-3"
          onClick={submitProduct}
        >
          <BsPersonPlusFill className="me-2" />
          Thêm sản phẩm
        </B.Button>

      </B.Container>
    </>
  );
}

export default Index;
