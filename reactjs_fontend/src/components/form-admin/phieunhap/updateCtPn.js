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
  console.log(dataShowPN);
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
    // console.log(e.target.value);
    // console.log(ngaySinh);

    axios
      .put(`api/kho/updateCtPN/${idPN}/${idSP}`, data)
      .then((res) => {
        console.log(res.data);
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
          // const data1 = {
          //   created_at: "2022-11-08T12:48:06.000000Z",
          //   gia: CTPN.gia,
          //   pn_id: idPN,
          //   product: {
          //     baoHanh: 12,
          //     created_at: null,
          //     ctSanPham: "12",
          //     gia: 1200000,

          //     hinh: "12",
          //     id: idProduct,
          //     maLoai: 2,
          //     maNCC: 2,
          //     maNSX: 2,
          //     moTa: "12",
          //     soLuongSP: 286,
          //     tenSP: "laptop dell vip",
          //     updated_at: "2022-11-08T13:30:26.000000Z",
          //   },

          //   product_id: idProduct,
          //   soluong: CTPN.soluong,
          //   updated_at: "2022-11-08T13:30:26.000000Z",
          // };
          console.log(data1);
          data1.gia = CTPN.gia;
          data1.soluong = CTPN.soluong;
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
        console.log(error);
      });
  };

  return (
    <>
      <Bt.Form onSubmit={handleUpdate}>
        <Bt.FormLabel className="fw-semibold fs-4">Sản phẩm</Bt.FormLabel>

        <div className="w-100 me-2" style={{ pointerEvents: "none" }}>
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
