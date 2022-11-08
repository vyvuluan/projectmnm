import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Bt from "react-bootstrap";
import swal from "sweetalert";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const UpdateCtPN = ({
  idSP,
  idPN,
  showModal,
  formatResult,
  handleOnSearchSp,
  listProduct,
  tenSP,
  gia,
  soLuong,
}) => {
  const [idProduct, setIdProduct] = useState();

  const [CTPN, setCTPN] = useState({
    soluong: soLuong,
    gia: gia,
    // product_id: "",
  });
  const handleOnSelectSp = (value) => {
    // console.log(value.id);
    setIdProduct(value.id);
  };

  const handleInput = (e) => {
    e.persist();
    // console.log(e.target.value);
    setCTPN({ ...CTPN, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    const data = {
      soluong: CTPN.soluong,
      gia: CTPN.gia,
      product_id: idProduct,
    };
    // console.log(e.target.value);
    // console.log(ngaySinh);

    axios
      .put(`api/kho/updateCtPN/${idPN}/${idSP}`, data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          swal({
            title: res.data.message,
            icon: "success",
            button: "đóng",
          });
          showModal(false);

        }
        if (res.data.status == 400) {
          swal({
            title: "Nhập sai định dạng",
            icon: "warning",
            button: "đóng",
          });
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <>
      <Bt.Form onSubmit={handleUpdate}>
        <Bt.FormLabel className="fw-semibold fs-4">Sản phẩm</Bt.FormLabel>

        <div className="w-100 me-2">
          <ReactSearchAutocomplete
            placeholder="sản phẩm"
            items={listProduct}
            onSearch={handleOnSearchSp}
            onSelect={handleOnSelectSp}
            fuseOptions={{ keys: ["id", "tenSP"] }}
            resultStringKeyName="tenSP"
            formatResult={formatResult}
            showIcon={false}
            inputSearchString={tenSP}
            onFocus
            styling={{
              height: "36px",
              border: "1px solid lightgray",
              borderRadius: "0",
              backgroundColor: "white",
              boxShadow: "none",
              hoverBackgroundColor: "#d19c97",
              color: "black",
              fontSize: "15px",
              // fontFamily: "Courier",
              iconColor: "black",
              lineColor: "#d19c97",
              // placeholderColor: "black",
              clearIconMargin: "3px 8px 0 0",
            }}
          />
        </div>
        <Bt.FormGroup className="mb-3" controlId="formName">
          <Bt.FormLabel className="fw-semibold fs-4">Số lượng</Bt.FormLabel>
          <Bt.FormControl
            type="text"
            name="soluong"
            placeholder="Số lượng"
            className="rounded-0"
            value={CTPN.soluong}
            onChange={handleInput}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>

        <Bt.FormGroup className="mb-3" controlId="formAddress">
          <Bt.FormLabel className="fw-semibold fs-4">Giá</Bt.FormLabel>
          <Bt.FormControl
            type="text"
            placeholder="Giá"
            className="rounded-0"
            name="gia"
            value={CTPN.gia}
            onChange={handleInput}
            required
          ></Bt.FormControl>
        </Bt.FormGroup>

        {/* <span className="text-danger">{errorSdt}</span> */}
        <Bt.Button
          variant="primary"
          type="submit"
          className="rounded-0 py-2 mt-3"
          //   onClick={showModal}
        >
          Chỉnh sửa
        </Bt.Button>
      </Bt.Form>
    </>
  );
};

export default UpdateCtPN;
