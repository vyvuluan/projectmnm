import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoaderIcon from "../../layouts/Loading/index";
import * as B from 'react-bootstrap'
import ShowMoreText from "react-show-more-text";
import {
  BsStarFill,
  BsFacebook,
  BsPinterest,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GrNext, GrPrevious } from "react-icons/gr";
const DetailProduct = (props) => {
  const { item } = props;

  const [tabkey, setTabkey] = useState(1);
  const navaigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [comInput, setComInput] = useState();
  const [comment, setComment] = useState([]);
  const [submitting, setSubmitting] = useState(true);
  const { id } = useParams();

  function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`http://localhost:8000/api/products/chitiet/${id}`)
      .then((res) => {
        if (isMounted) {
          if (res.data.status === 200) {
            setProduct(res.data.sanPham);
            setLoading(false);
          } else if (res.data.status === 404) {
            navaigate.push("/pageproducts");
            swal("Warning", res.data.message, "error");
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, navaigate]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < product.soLuongSP) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const submitAddtocart = (e) => {
    e.preventDefault();

    const data = {
      product_id: product.id,
      product_qty: quantity,
    };

    axios.post(`/api/addtocart`, data).then((res) => {
      if (res.data.status === 201) {
        // console.log(res);
        localStorage.setItem("count", res.data.count)

        swal("Success", res.data.message, "success");
      } else if (res.data.status === 409) {
        swal("Warning", res.data.message, "warning");
      } else if (res.data.status === 401) {
        swal("Error", res.data.message, "error");
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
      }
    });
  };

  const executeOnClick = (isExpanded) => {
    console.log(isExpanded);
  }

  // useEffect(() => {
  //   axios.get(`/api/allcomment/${id}`).then(res => {
  //     if (res.data.status === 200) {
  //       setComment(res.data.comment);
  //     }
  //   })
  // }, [id])

  const getComments = useCallback(async () => {
    const res = await axios.get(`/api/allcomment/${id}`)
    if (res.data.status === 200) {
      setComment(res.data.comment);
    }
  }, [id]);

  useEffect(() => {
    getComments().then(() => setSubmitting(false))
  }, [submitting, getComments])

  const handleSubmitComment = (e) => {
    e.preventDefault();

    const data = {
      comment: comInput,
      product_id: id,
    }

    axios.post(`/api/addcomment`, data).then(res => {
      if (res.data.status === 200) {
        setSubmitting(true);
        swal('Success', res.data.message, 'success');
      } else if (res.data.status === 401) {
        swal('Error', res.data.message, 'error')
      }
    })
  }

  if (loading) {
    return <LoaderIcon />;
  } else {
    var avail_stock = "";
    if (product.soLuongSP > 0) {
      avail_stock = (
        <div className="d-flex align-items-center mb-4 pt-2">
          <div className="input-group quantity me-3" style={{ width: "130px" }}>
            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-primary btn-minus rounded-0 btnclick shadow-none"
                onClick={handleDecrement}
              >
                <AiFillMinusCircle />
              </button>
            </div>
            <input
              type="text"
              className="form-control text-center"
              value={quantity}
            />
            <div className="input-group-btn">
              <button
                type="button"
                className="btn btn-primary btn-plus rounded-0 btnclick shadow-none"
                onClick={handleIncrement}
              >
                <AiFillPlusCircle />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary px-3 rounded-0 btnclick shadow-none"
            onClick={submitAddtocart}
          >
            <AiOutlineShoppingCart /> Thêm vào giỏ hàng
          </button>
        </div>
      );
    } else {
      avail_stock = (
        <button className="btn btn-primary px-3 rounded-0 shadow-none">
          <AiOutlineShoppingCart /> Hết hàng
        </button>
      );
    }
  }

  return (
    <>
      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 pb-5">
            <div
              id="product-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner border">
                <div className="carousel-item active">
                  <img
                    className="w-100 h-100"
                    src={`http://localhost:8000/uploadhinh/${product.hinh}`}
                    alt="prod"
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    className="w-100 h-100"
                    src="img/product-2.jpg"
                    alt="Image"
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    className="w-100 h-100"
                    src="img/product-3.jpg"
                    alt="Image"
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    className="w-100 h-100"
                    src="img/product-4.jpg"
                    alt="Image"
                  ></img>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#product-carousel"
                data-slide="prev"
              >
                <GrPrevious />
              </a>
              <a
                className="carousel-control-next"
                href="#product-carousel"
                data-slide="next"
              >
                <GrNext />
              </a>
            </div>
          </div>

          <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{product.tenSP}</h3>
            {/* <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                <small>
                  <BsStarFill />
                </small>
                <small>
                  <BsStarFill />
                </small>
                <small>
                  <BsStarFill />
                </small>
                <small>
                  <BsStarFill />
                </small>
                <small>
                  <BsStarFill />
                </small>
              </div>
              <small className="pt-1">(50 Reviews)</small>
            </div> */}
            <small className="text-primary fw-semibold">{comment.length} bình luận</small>
            <h3 className="font-weight-semi-bold mt-2 mb-4">
              {formatMoney(product.gia)}
            </h3>
            <p className="mb-4">
              <div dangerouslySetInnerHTML={{ __html: product.ctSanPham }} />
            </p>

            <div>{avail_stock}</div>

            <div className="d-flex pt-2">
              <p className="text-dark font-weight-medium mb-0 mr-2">
                Share on:
              </p>
              <div className="d-inline-flex">
                <a className="text-dark px-2" href="">
                  <BsFacebook />
                </a>
                <a className="text-dark px-2" href="">
                  <BsTwitter />
                </a>
                <a className="text-dark px-2" href="">
                  <BsLinkedin />
                </a>
                <a className="text-dark px-2" href="">
                  <BsPinterest />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="px-xl-5">
          <B.Tabs activeKey={tabkey}
            onSelect={(k) => setTabkey(k)}
            className=' justify-content-center'>
            <B.Tab eventKey={1} title="Mô tả sản phẩm" className="border border-top-0 py-3 px-3">
              <B.Row className='px-xl-3 mb-3'>
                {/* {product.ctSanPham} */}
                {/* <ShowMoreText
                  lines={3}
                  more="Xem thêm"
                  less="Rút gọn"
                  className="content-css"
                  anchorClass="show-more-less-clickable"
                  onClick={executeOnClick}
                  expanded={false}
                  width={280}
                  truncatedEndingComponent={"..... "}
                >
                </ShowMoreText> */}
                <div dangerouslySetInnerHTML={{ __html: product.moTa }} />
              </B.Row>
            </B.Tab>

            <B.Tab eventKey={2} title="Bình luận" className="border border-top-0 py-3 px-3">
              <B.Row className='px-xl-3 mb-3'>
                <B.Col lg={4}>
                  <B.Form onSubmit={handleSubmitComment}>
                    <B.FormGroup>
                      <B.FormLabel>Bình luận</B.FormLabel>
                      <B.FormControl as='textarea' rows={4} name='binhluan' value={comInput} onChange={(e) => setComInput(e.target.value)} placeholder="Nhập bình luận" className="rounded-0 mb-3"></B.FormControl>
                    </B.FormGroup>
                    <B.Button variant='primary' type='submit' className="rounded-0 mb-3">Đăng bình luận</B.Button>
                  </B.Form>
                </B.Col>
                <B.Col lg={8}>
                  {comment && comment.map((com, index) => {
                    return (
                      <B.FormGroup key={index} className="border border-2 px-3 py-2 mb-3">
                        <B.FormLabel className="fs-6">{com.customer.ten}</B.FormLabel>
                        <B.FormText>{com.comment}</B.FormText>
                      </B.FormGroup>
                    )
                  })}
                </B.Col>
              </B.Row>
            </B.Tab>
          </B.Tabs>
        </div>
      </div>
    </>
  );
};
export default DetailProduct;
