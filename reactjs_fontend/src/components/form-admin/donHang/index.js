import React, { useCallback, useEffect, useState, useRef } from "react";
import * as B from 'react-bootstrap'
import axios from "axios";
import Pagination from '../../form/pagination/index'
import swal from "sweetalert";
import { FcPrint } from 'react-icons/fc'
import { useReactToPrint } from 'react-to-print';
import { RiRefreshLine } from 'react-icons/ri'

const checkStatus = [
  { id: 0, name: 'Chờ xác nhận' },
  { id: 1, name: 'Đã xác nhận' },
  { id: 2, name: 'Đang đóng gói' },
  { id: 3, name: 'Đang vận chuyển' },
  { id: 4, name: 'Giao hàng thành công' },
  { id: 5, name: 'Hủy đơn hàng' },
];

const DonHang = () => {
  const [order, setOrder] = useState();
  const [orderList, setOrderList] = useState([]);
  const [submitting, setSubmitting] = useState(true);
  const [showPrint, setShowPrint] = useState(false);
  const [viewOrder, setViewOrder] = useState();

  const componentRef = useRef();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const handlePerPage = (page) => {
    setPage(page);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }

  function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }

  const handleShowPrint = (order) => {
    setShowPrint(true);
    setViewOrder(order);
  }

  const handleClosePrint = () => setShowPrint(prev => !prev);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getOrderData = useCallback(async () => {
    const res = await axios.get(`/api/nhanvien/px?page=${page}`)
    if (res.data.status === 200) {
      setOrderList(res.data.data.data);
      setTotalPage(res.data.data.total);
      setPerPage(res.data.data.per_page);
      setCurrentPage(res.data.data.current_page)
    }
  }, [page]);

  useEffect(() => {
    getOrderData().then(() => setSubmitting(false))
  }, [submitting, getOrderData]);

  const handleUpdateStatus = (value, order) => {
    const data = {
      status: value.id,
    }
    axios.put(`/api/nhanvien/setstatusDH/${order.id}`, data).then(res => {
      if (res.data.status === 200) {
        setSubmitting(true);
      } else if (res.data.status === 400) {
        swal('Cảnh báo', res.data.message, 'warning')
      }
    })
  }

  const test = (status) => {
    var x;
    switch (status) {
      case 0: {
        x = 'Chờ xác nhận';
        break;
      }
      case 1: {
        x = 'Đã xác nhận';
        break;
      }
      case 2: {
        x = 'Đang đóng gói';
        break;
      }
      case 3: {
        x = 'Đang vận chuyển';
        break;
      }
      case 4: {
        x = 'Giao hàng thành công';
        break;
      }
      case 5: {
        x = 'Đơn hàng đã hủy';
        break;
      }
      case 6: {
        x = 'Đã xuất kho';
        break;
      }
      default: {
        break;
      }
    }
    return x;
  }

  const variant = (status) => {
    var x;
    switch (status) {
      case 0: {
        x = 'dark';
        break;
      }
      case 1: {
        x = 'primary';
        break;
      }
      case 2: {
        x = 'info';
        break;
      }
      case 3: {
        x = 'warning';
        break;
      }
      case 4: {
        x = 'success';
        break;
      }
      case 5: {
        x = 'danger';
        break;
      }
      case 6: {
        x = 'success';
        break;
      }
      default: {
        break;
      }
    }
    return x;
  }

  let date = new Date().toLocaleString("vi-VN", { day: '2-digit' });
  let month = new Date().toLocaleString("vi-VN", { month: "long" });
  let year = new Date().getFullYear();

  return (
    <>
      <B.Modal size='lg' show={showPrint} onHide={handleClosePrint}>
        <div ref={componentRef}>
          <B.ModalHeader>
            <B.ModalTitle>
              <div className='text-primary fw-bold'>
                L3M
                <span className='text-dark'>SHOP</span>
                <p className='fs-6 text-dark fw-semibold'>Mã hóa đơn: {viewOrder && viewOrder.id}</p>
              </div>
            </B.ModalTitle>
            <B.ModalTitle>
              <div>
                Hóa đơn bán hàng
                <p className='fs-6'>Ngày {date} {month} Năm {year}</p>
              </div>
            </B.ModalTitle>
          </B.ModalHeader>
          <B.Row className='px-3 mt-2'>
            <div className='fs-6'>Công ty TNHH thương mại L3M</div>
            <div className='fs-6'>Địa chỉ: 273 An D. Vương, Phường 3, Quận 5, Thành phố Hồ Chí Minh</div>
            <div className='fst-italic fs-6'>Hotline: 0123498765<span className='ms-5'>Email: l3mstore@gmail.com</span></div>
          </B.Row>
          <hr />
          <B.ModalBody>
            <B.Row>
              <B.FormGroup className='d-flex justify-content-between'>
                <B.FormLabel className='fs-6'>Họ và tên khách hàng:</B.FormLabel>
                <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewOrder && viewOrder.tenKH}</B.FormLabel>
              </B.FormGroup>
              <B.FormGroup className='d-flex justify-content-between'>
                <B.FormLabel className='fs-6'>Số điện thoại khách hàng:</B.FormLabel>
                <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewOrder && viewOrder.sdt}</B.FormLabel>
              </B.FormGroup>
              <B.FormGroup className='d-flex justify-content-between'>
                <B.FormLabel className='fs-6'>Địa chỉ:</B.FormLabel>
                <B.FormLabel className='fs-6 ms-2 mb-3 text-success text-end'>{viewOrder && viewOrder.diaChi}</B.FormLabel>
              </B.FormGroup>
              <B.FormGroup className='d-flex justify-content-between'>
                <B.FormLabel className='fs-6'>Phương thức thanh toán:</B.FormLabel>
                <B.FormLabel className='fs-6 ms-2 mb-3 text-success'>{viewOrder && viewOrder.pt_ThanhToan}</B.FormLabel>
              </B.FormGroup>
            </B.Row>
            <hr />
            <B.Row>
              <B.Table responsive='sm' className='table-borderless border border-muted mb-0'>
                <thead className='text-dark'>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Bảo hành</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {viewOrder && viewOrder.pxct.map((prod) => {
                    return (
                      <>
                        <tr key={prod.product.id}>
                          <td>{prod.product.tenSP}</td>
                          <td>{prod.soluong}</td>
                          <td>{prod.product.baoHanh} tháng</td>
                          <td>{formatMoney(prod.product.gia)}</td>
                        </tr>
                        <tr>
                          <td></td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
                <tfoot className='border-top'>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className='fw-semibold'>Tổng tiền: </td>
                    <td>{formatMoney(viewOrder && viewOrder.tongTien)}</td>
                  </tr>
                </tfoot>
              </B.Table>
            </B.Row>
            <B.Row className='px-3 mt-2'>
              <B.Row className='mb-5'>
                <B.Col>
                  <p>Khách hàng
                    <p className='fst-italic ms-3'>Ký tên</p>
                  </p>
                </B.Col>
                <B.Col className='text-end'>
                  <p>Nhân viên bán hàng
                    <p className='fst-italic me-5'>Ký tên</p></p>
                </B.Col>
              </B.Row>
              <div className='fst-italic mt-5'>Vui lòng giữ lại hóa đơn trong vòng 1 tháng sau khi mua hàng</div>
            </B.Row>
          </B.ModalBody>
        </div>
        <B.ModalFooter>
          <B.Button
            variant="outline-primary"
            className="mt-2 me-2 rounded-0"
            onClick={handlePrint}
          >
            In hóa đơn
          </B.Button>
          <B.Button
            variant="outline-primary"
            className="mt-2 rounded-0"
            onClick={handleClosePrint}
          >
            Hủy bỏ
          </B.Button>
        </B.ModalFooter>
      </B.Modal>

      <B.Container fluid>
        <B.Row className='pe-xl-5 mb-4'>
          <B.Col lg={10}><h1 className='fw-bold text-primary mb-4 text-capitalize'>QUẢN LÝ ĐƠN HÀNG</h1></B.Col>
          <B.Col lg={2} className='mt-lg-3 text-end'><RiRefreshLine className='fs-3 customborder' onClick={() => setSubmitting(true)} /></B.Col>
        </B.Row>

        <B.Row className='pe-xl-5 mb-5'>
          <B.Table responsive='lg' className='table-borderless border border-secondary mb-0'>
            <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
              <tr>
                <th>STT</th>
                <th>Họ và tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orderList && orderList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.tenKH}</td>
                  <td>{item.sdt}</td>
                  <td>{item.diaChi}</td>
                  <td><B.DropdownButton variant={variant(item.status)} className='me-2' title={test(item.status)}>
                    {checkStatus.map((val) => (
                      <B.Dropdown.Item key={val.id}
                        onClick={() => handleUpdateStatus(val, item)}
                      >{val.name}</B.Dropdown.Item>
                    ))}
                  </B.DropdownButton>
                  </td>
                  <td className='text-center'>
                    <FcPrint className='fs-3' onClick={() => handleShowPrint(item)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </B.Table>
        </B.Row>
        <Pagination currentPage={currentPage} totalPage={pageNumbers} handlePerPage={handlePerPage} />
      </B.Container>
    </>
  );
};
export default DonHang;
