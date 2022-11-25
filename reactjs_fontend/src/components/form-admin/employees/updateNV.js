import * as B from "react-bootstrap";
import { BsPersonPlusFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

import axios from "axios";
const UpdateNV = ({ username, setSubmitting }) => {
  //   console.log(username);
  const [valueGT, setValueGT] = useState();
  const [valueCV, setValueCV] = useState();
  const [idNV, setidNV] = useState(username?.id);

  const handleChangeGT = (e) => {
    // console.log(e.target.value);
    setValueGT(e.target.value);
  };
  const handleChangeCV = (e) => {
    // console.log(e.target.value);
    setValueCV(e.target.value);
  };
  const handleInput = (e) => {
    e.persist();

    setupdateNV({ ...updateNV, [e.target.name]: e.target.value });
  };
  const [updateNV, setupdateNV] = useState({
    ten: username?.ten,
    sdt: username?.sdt,
    diaChi: username?.diaChi,
    gioiTinh: username?.gioiTinh,
    cv_id: username?.cv_id,
  });

  const handleUpdateNV = () => {
    const data = {
      ten: updateNV.ten,
      sdt: updateNV.sdt,
      diaChi: updateNV.diaChi,
      gioiTinh: valueGT,
      cv_id: valueCV,
    };
    axios
      .put(`/api/admin/manageEmployee/${idNV}`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 200) {
          swal("Thành công", res.data.message, "success");
          setSubmitting(true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        swal(
          "Cảnh báo",
          "vui lòng kiểm tra lại thông tin vừa nhập ",
          "warning"
        );
      });
  };

  return (
    <>
      <B.Form className="mt-2">
        <B.FormGroup>
          <span>Họ và tên</span>
          <B.FormControl
            type="text"
            name="ten"
            className="rounded-0 shadow-none mb-3"
            placeholder="Họ và tên nhân viên"
            onChange={handleInput}
            value={updateNV.ten}
            required
          ></B.FormControl>
        </B.FormGroup>
        <B.FormGroup>
          <span>Giới tính</span>

          <B.FormSelect
            name="gioiTinh"
            defaultValue={updateNV.gioiTinh}
            onChange={handleChangeGT}
            className="rounded-0 shadow-none mb-3 text-muted"
            required
          >
            <option>Giới tính</option>
            <option value={1}>Nam</option>
            <option value={0}>Nữ</option>
          </B.FormSelect>
        </B.FormGroup>
        <B.FormGroup>
          <span>Địa chỉ</span>

          <B.FormControl
            name="diaChi"
            type="textarea"
            className="rounded-0 shadow-none mb-3"
            placeholder="Địa chỉ"
            onChange={handleInput}
            value={updateNV.diaChi}
            required
          ></B.FormControl>
        </B.FormGroup>

        <B.FormGroup>
          <span>Số điện thoại</span>

          <B.FormControl
            name="sdt"
            type="text"
            className="rounded-0 shadow-none mb-3"
            placeholder="Số điện thoại"
            onChange={handleInput}
            value={updateNV.sdt}
            required
          ></B.FormControl>
        </B.FormGroup>
        <B.FormGroup>
          <span>Chức vụ</span>

          <B.FormSelect
            name="cv_id"
            // value={}
            required
            onChange={handleChangeCV}
            defaultValue={updateNV.cv_id}
            className="rounded-0 shadow-none mb-3 text-muted"
          >
            <option>Chức vụ</option>
            <option value={1}>admin</option>
            <option value={2}>kho</option>
            <option value={3}>nhân viên</option>
          </B.FormSelect>
        </B.FormGroup>
        <B.Button
          variant="outline-primary"
          className="rounded-0 py-2 mb-2 w-100"
          onClick={handleUpdateNV}
        >
          <BsPersonPlusFill className="me-2" />
          Sửa nhân viên
        </B.Button>
      </B.Form>
    </>
  );
};
export default UpdateNV;
