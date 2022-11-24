import React, { useCallback, useEffect, useState } from "react";
import product1 from "../../../img/product-1.jpg";
import * as Bt from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import AccountEdit from "./accountEdit";
import ChangePassAccount from "./changePassAccount";
import Breadcrumb from "../breadcum/index";

const AccountInfo = () => {
  const [auth, setAuth] = useState();
  const [userName, setUserName] = useState();
  const [sex, setSex] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [emailUser, setEmailUser] = useState();
  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [bird, setBird] = useState();
  const [accountData, setAccountData] = useState();
  const [submitting, setSubmitting] = useState(true);
  //show đổi tài khoản
  const handleClose = () => {
    setSubmitting(true);
    setShow((prev) => !prev);
  }

  const handleShow = () => {
    setShow(true);
  };
  //show đổi mật khẩu
  const handleClosePass = () => setShowPass((prev) => !prev);

  const handleShowChangePass = () => {
    setShowPass(true);
  };

  // useEffect(() => {
  //   axios.get("api/detailUser").then((res) => {
  //     setAccountData(res.data.data_user);
  //     setEmailUser(res.data.data_user.email);
  //     setUserName(res.data.data_user.customer.ten);
  //     setSex(res.data.data_user.customer?.gioiTinh);
  //     setAddress(res.data.data_user.customer?.diaChi);
  //     setPhone(res.data.data_user.customer?.sdt);
  //     setBird(res.data.data_user.customer?.ngaySinh)

  //   });
  // }, []);

  const getUserData = useCallback(async () => {
    const res = await axios.get("api/detailUser")
    if (res.data.status === 200) {
      setAccountData(res.data.data_user);
      setEmailUser(res.data.data_user.email);
      setUserName(res.data.data_user.customer.ten);
      setSex(res.data.data_user.customer?.gioiTinh);
      setAddress(res.data.data_user.customer?.diaChi);
      setPhone(res.data.data_user.customer?.sdt);
      setBird(res.data.data_user.customer?.ngaySinh)
    }
  }, [])

  useEffect(() => {
    getUserData().then(() => setSubmitting(false));
  }, [submitting, getUserData])

  var Male = "Nam";
  var Female = "Nữ";

  useEffect(() => {
    setAuth(localStorage.getItem("auth_fullname"));
  }, []);


  return (
    <>
      <Bt.Modal show={show} onHide={handleClose}>
        <Bt.ModalHeader closeButton className="bg-secondary">
          <Bt.ModalTitle>Sửa tài khoản</Bt.ModalTitle>
        </Bt.ModalHeader>
        <Bt.ModalBody>
          <AccountEdit accountData={accountData} showModal={handleClose} />
        </Bt.ModalBody>
        <Bt.ModalFooter className="bg-secondary">
          <Bt.Button
            variant="outline-primary"
            className="mt-2 rounded-0"
            onClick={handleClose}
          >
            Hủy bỏ
          </Bt.Button>
        </Bt.ModalFooter>
      </Bt.Modal>
      <Bt.Modal show={showPass} onHide={handleClosePass}>
        <Bt.ModalHeader closeButton className="bg-secondary">
          <Bt.ModalTitle>Đổi mật khẩu</Bt.ModalTitle>
        </Bt.ModalHeader>
        <Bt.ModalBody>
          <ChangePassAccount showModal={handleClosePass} />
        </Bt.ModalBody>
        <Bt.ModalFooter className="bg-secondary">
          <Bt.Button
            variant="outline-primary"
            className="mt-2 rounded-0"
            onClick={handleClosePass}
          >
            Hủy bỏ
          </Bt.Button>
        </Bt.ModalFooter>
      </Bt.Modal>
      <Breadcrumb
        title='thông tin tài khoản'
        BC={1}
        name='Thông tin tài khoản'
      />
      {/* Account information start */}
      <Bt.Container fluid pt={5}>
        <Bt.Row className="px-xl-5">
          <Bt.Col lg={6} className="py-5 text-end">
            <Bt.Image
              className="thumbnail border rounded-0"
              width={"auto"}
              height={"500px"}
              src={product1}
            ></Bt.Image>
          </Bt.Col>
          <Bt.Col lg={6} className="py-5 ps-5 text-start">
            <h4 className="text-dark fw-semibold mb-3">Họ và tên</h4>
            <h6 className="text-muted mb-3">{userName}</h6>
            <h4 className="text-dark fw-semibold mb-3">Ngày Sinh</h4>
            <h6 className="text-muted mb-3">{bird}</h6>
            <h4 className="text-dark fw-semibold mb-3">Giới tính</h4>
            <h6 className="text-muted mb-3">{sex == 0 ? Male : Female}</h6>
            <h4 className="text-dark fw-semibold mb-3">Địa chỉ</h4>
            <h6 className="text-muted mb-3">{address}</h6>
            <h4 className="text-dark fw-semibold mb-3">Số điện thoại</h4>
            <h6 className="text-muted mb-3">{phone}</h6>
            <h4 className="text-dark fw-semibold mb-3">Email</h4>
            <h6 className="text-muted mb-3">{emailUser}</h6>
            {!auth ?
              null :
              <>
                <Bt.Button
                  variant="primary"
                  className="rounded-0 py-2 me-3 mt-3"
                  onClick={() => handleShow()}
                >
                  Chỉnh sửa thông tin
                </Bt.Button>
                <Bt.Button
                  variant="primary"
                  className="rounded-0 py-2 mt-3"
                  onClick={() => handleShowChangePass()}
                >
                  Đổi mật khẩu
                </Bt.Button>
              </>}
          </Bt.Col>
        </Bt.Row>
      </Bt.Container>
      {/* Account information end */}

      {/* Account information-edit start */}
      {/* <Bt.Container fluid pt={5}>
        <Bt.Row className="px-xl-5"> */}
      {/* <Bt.Col lg={6} className='py-5 text-end'>
                        <Bt.Image className='thumbnail border rounded-0' width={'auto'} height={'500px'} src={product1}></Bt.Image>
                    </Bt.Col> */}
      {/* <Bt.Col lg={4} className="py-5 ps-5 text-start">
            
          </Bt.Col>
        </Bt.Row>
      </Bt.Container> */}
      {/* Account information-edit end */}

      {/* Forgot password start */}
      {/* <Bt.Container fluid pt={5}>
        <Bt.Row className="px-xl-5">

          <Bt.Col lg={4} className="py-5 ps-5 text-start">
            
          </Bt.Col>
        </Bt.Row>
      </Bt.Container> */}
      {/* Forgot password end */}
    </>
  );
};
export default AccountInfo;
