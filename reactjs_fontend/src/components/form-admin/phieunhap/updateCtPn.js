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
  test,
  dataShowPN,
}) => {
  const [idProduct, setIdProduct] = useState();
  // console.log(dataShowPN);
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
      product_id: idSP,
    };
    axios
      .put(`api/kho/updateCtPN/${idPN}/${idSP}`, data)
      .then((res) => {
        // console.log(res.data);
        if (res.status == 200) {
          swal({
            title: res.data.message,
            icon: "success",
            button: "đóng",
          });
          showModal(false);
          let data1;
          dataShowPN.filter((item, index) => {
            return item.id == idPN
              ? dataShowPN[index].pnct.filter((item1, index1) => {
                return item1.product_id == idSP ? (data1 = item1) : null;
              })
              : null;
          });
          data1.gia = CTPN?.gia;
          data1.soluong = CTPN?.soluong;
          if (data1) {
            test(data1);
          }
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
        // console.log(error);
      });
  };

  return (
    <>
      <Bt.Form onSubmit={handleUpdate}>
        <Bt.FormLabel className="fw-semibold fs-4">Sản phẩm</Bt.FormLabel>
        <Bt.FormControl
          type="text"
          name="tenSP"
          className="rounded-0"
          value={tenSP}
          disabled
        ></Bt.FormControl>
      
        <Bt.FormGroup className="mb-3" controlId="formName">
          <Bt.FormLabel className="fw-semibold fs-4">Số lượng</Bt.FormLabel>
          <Bt.FormControl
            type="number"
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
            type="number"
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
