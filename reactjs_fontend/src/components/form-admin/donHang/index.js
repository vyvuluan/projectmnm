import React, { useCallback, useEffect, useState, useRef } from "react";
import * as B from 'react-bootstrap'
import axios from "axios";
import Pagination from '../../form/pagination/index'
import swal from "sweetalert";
import { FaRegEye } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print';
import { RiRefreshLine } from 'react-icons/ri'
import { BsFillExclamationSquareFill } from 'react-icons/bs'
import { useDownloadExcel } from 'react-export-table-to-excel';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Bill from '../print/bill'

const checkStatus = [
  { id: 0, name: 'Chờ xác nhận' },
  { id: 1, name: 'Đã xác nhận' },
  { id: 2, name: 'Đang đóng gói' },
  { id: 3, name: 'Đang vận chuyển' },
  { id: 4, name: 'Giao hàng thành công' },
  { id: 5, name: 'Hủy đơn hàng' },
];

// const sort = [
//   { value: '', name: 'Sắp xếp' },
//   { value: 'h-l', name: 'Giá cao-thấp' },
//   { value: 'l-h', name: 'Giá thấp-cao' },
//   { value: '0', name: 'Chờ xác nhận' },
//   { value: '1', name: 'Đã xác nhận' },
//   { value: '4', name: 'Đã xuất nhanvien' },
//   { value: '5', name: 'Đơn hàng đã hủy' },
//   { value: 'Tại quầy', name: 'Thanh toán tại quầy' },
// ]

const sort = [
  { value: '', name: 'Sắp xếp' },
  { value: 'h-l', name: 'Giá cao-thấp' },
  { value: 'l-h', name: 'Giá thấp-cao' },
  { value: '0', name: 'Chờ xác nhận' },
  { value: '1', name: 'Đã xác nhận' },
  { value: '2', name: 'Đang đóng gói' },
  { value: '3', name: 'Đang vận chuyển' },
  { value: '4', name: 'Giao hàng thành công' },
  { value: '5', name: 'Đơn hàng đã hủy' },
  { value: 'COD', name: 'Thanh toán COD' },
  { value: 'PayPal', name: 'Thanh toán Paypal' },
  { value: 'VnPay', name: 'Thanh toán VNPay' },
  { value: 'Tại quầy', name: 'Thanh toán tại quầy' },
]

const DonHang = () => {
  const [searchList, setSearchlist] = useState([]);
  const [showSearchTable, setShowSearchTable] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [submitting, setSubmitting] = useState(true);
  const [showPrint, setShowPrint] = useState(false);
  const [viewOrder, setViewOrder] = useState();
  const [tabkey, setTabkey] = useState(1);

  const componentRef = useRef();
  const componentRefPx = useRef();
  const [pxtab, setpxtab] = useState(1);
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

  const handlePrintPx = useReactToPrint({
    content: () => componentRefPx.current,
  });

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
    if (value.id === 1 && order.status < 2 && order.status !== 1) {
      swal({
        text: 'Xác nhận đơn hàng bạn sẽ không thể thay đổi thông tin!',
        title: 'Bạn chắc chứ?',
        icon: 'warning',
        buttons: {
          cancel: "Hủy bỏ",
          yes: {
            text: "Xác nhận đơn hàng",
            value: "yes",
          },
        }
      }).then((value) => {
        if (value === 'yes') {
          axios.put(`/api/nhanvien/setstatusDH/${order.id}`, data).then(res => {
            if (res.data.status === 200) {
              setSubmitting(true);
            } else if (res.data.status === 400) {
              swal('Cảnh báo', res.data.message, 'warning')
            }
          })
        }
      })
    } else if (value.id === 5 && order.status !== 5 && order.status !== 1) {
      swal({
        text: 'Khi hủy đơn bạn sẽ không thể xuất hay thay đổi phiếu!',
        title: 'Bạn chắc chứ?',
        icon: 'warning',
        buttons: {
          cancel: "Hủy bỏ",
          yes: {
            text: "Hủy phiếu",
            value: "yes",
          },
        }
      }).then((value) => {
        if (value === 'yes') {
          axios.put(`/api/nhanvien/setstatusDH/${order.id}`, data).then(res => {
            if (res.data.status === 200) {
              setSubmitting(true);
            } else if (res.data.status === 400) {
              swal('Cảnh báo', res.data.message, 'warning')
            }
          })
        }
      })
    }
    else {
      axios.put(`/api/nhanvien/setstatusDH/${order.id}`, data).then(res => {
        if (res.data.status === 200) {
          setSubmitting(true);
        } else if (res.data.status === 400) {
          swal('Cảnh báo', res.data.message, 'warning')
        }
      })
    }
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
        x = 'Đã giao hàng';
        break;
      }
      case 5: {
        x = 'Đã huỷ đơn';
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
        x = 'secondary';
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
      default: {
        break;
      }
    }
    return x;
  }

  const handleOnSearch = (key) => {
    if (key !== "") {
      axios.get(`http://localhost:8000/api/nhanvien/px-search?key=${key}`).then(res => {
        if (res.status === 200) {
          setSearchlist(res.data.data)
          // setTotalPage(res.data.total);
          // setPerPage(res.data.per_page);
          // setCurrentPage(res.data.current_page)
          setShowSearchTable(true);
        }
        else {
          setShowSearchTable(false);
        }
      })
    }
  }

  const handleOnClear = () => {
    setShowSearchTable(false);
    setSearchlist([]);
  }

  const SortStt = (e) => {
    var key = '';
    switch (e) {
      case '0': case '1': case '2': case '3': case '4': case '5':
        {
          key = 1;
          break;
        }
      case 'COD': case 'PayPal': case 'Tại quầy': case 'VnPay':
        {
          key = 2;
          break;
        }
      case 'h-l':
        {
          key = 4;
          break;
        }
      case 'l-h':
        {
          key = 3;
          break;
        }
      case '':
        {
          key = '';
          break;
        }
      default:
        {
          break;
        }
    }
    if (key !== '') {
      axios.get(`/api/nhanvien/locpx?key=${key}&value=${e}`).then(res => {
        if (res.data.status === 200) {
          setOrderList(res.data.data.data);
          setTotalPage(res.data.data.total);
          setPerPage(res.data.data.per_page);
          setCurrentPage(res.data.data.current_page);
        }
      })
    } else if (key === '') {
      setSubmitting(true);
    }
  }

  const [dayStart, setDayStart] = useState();
  const [dayEnd, setDayEnd] = useState();
  const [xemXuat, setXemXuat] = useState([]);
  const [showExport, setShowExp] = useState(false);
  const tableRef = useRef(null);

  const xemLichSuXuatHang = (e) => {
    e.preventDefault();

    axios.get(`/api/nhanvien/lichSuXuatHang?dateFrom=${dayStart}&dateTo=${dayEnd}`).then(res => {
      if (res.data.status === 200) {
        setXemXuat(res.data.px.data);
        setShowExp(true);
      }
    });
  }

  const { onDownload } =
    useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: 'Lich su xuat hang',
      sheet: 'Phiếu xuất'
    })

  const renderTooltip = (props) => (
    <B.Tooltip id="button-tooltip" {...props}>
      Đơn hàng thanh toán thất bại hãy hủy đơn hàng này!!!
    </B.Tooltip>
  );

  return (
    <>
      {/* In hoa don va phieu xuat kho */}
      <B.Modal size='lg' show={showPrint} onHide={handleClosePrint}>
        <B.Tabs activeKey={pxtab} onSelect={(k) => setpxtab(k)}>
          <B.Tab eventKey={1} title="Hóa đơn">
            <div ref={componentRef}>
              <Bill
                tenPhieu='px'
                billCode={viewOrder?.id}
                tenKH={viewOrder?.tenKH}
                sdt={viewOrder?.sdt}
                diaChi={viewOrder?.diaChi}
                pttt={viewOrder?.pt_ThanhToan}
                data={viewOrder}
                discount={viewOrder?.discount}
                tongTien={viewOrder?.tongTien}
              />
            </div>
          </B.Tab>
          <B.Tab eventKey={2} title="Phiếu xuất kho">
            <div ref={componentRefPx}>
              <Bill
                tenPhieu='ycxk'
                billCode={viewOrder?.id}
                tenKH={viewOrder?.tenKH}
                sdt={viewOrder?.sdt}
                diaChi={viewOrder?.diaChi}
                pttt={viewOrder?.pt_ThanhToan}
                data={viewOrder}
              />
            </div>
          </B.Tab>
        </B.Tabs>
        <B.ModalFooter>
          {viewOrder && viewOrder.status > 0 && viewOrder.status < 5 ?
            <>
              <B.Button
                variant="outline-success"
                className="mt-2 me-2 rounded-0"
                onClick={handlePrintPx}
              >
                In phiếu yêu cầu xuất kho
              </B.Button>
              <B.Button
                variant="outline-primary"
                className="mt-2 me-2 rounded-0"
                onClick={handlePrint}
              >
                In hóa đơn
              </B.Button>
            </> : null}
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

        <B.Tabs activeKey={tabkey}
          onSelect={(k) => setTabkey(k)}>
          <B.Tab eventKey={1} title="Danh sách đơn hàng" className=" border border-top-0 py-3 px-3">
            <B.Row className='pe-xl-5 mb-3'>
              <B.Col lg={4} className='mt-2'>
                <ReactSearchAutocomplete
                  items={searchList}
                  onSearch={handleOnSearch}
                  onClear={handleOnClear}
                  placeholder='Tìm kiếm đơn hàng'
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
              <B.Col lg={8} className='mb-2 mt-2'>
                <B.FormGroup className='pull-right'>
                  <B.FormSelect className='rounded-0 shadow-none' style={{ width: '200px' }} onChange={(e) => SortStt(e.target.value)}>
                    {sort.map((item, index) => (
                      <option value={item.value}>{item.name}</option>
                    ))}
                  </B.FormSelect>
                </B.FormGroup>
              </B.Col>
            </B.Row>
            <B.Row className='pe-xl-5 mb-5'>
              {!showSearchTable && (
                <B.Table responsive='lg' className='table-borderless border border-secondary mb-0'>
                  <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                    <tr>
                      <th>STT</th>
                      <th>Họ và tên khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Địa chỉ</th>
                      <th>Giảm giá</th>
                      <th>Phương thức thanh toán</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th className="text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList && orderList.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.tenKH}</td>
                          <td>{item.sdt}</td>
                          <td>{item.diaChi}</td>
                          <td>{item.discount}%</td>
                          <td>{item.pt_ThanhToan}</td>
                          <td>{formatMoney(item.tongTien)}</td>
                          <td><B.DropdownButton variant={variant(item.status)} className='me-2' title={test(item.status)}>
                            {checkStatus.map((val) => {
                              return (
                                // <>
                                //   {item.status > 1 && item.status < 4 ? (
                                //     null
                                //   ) : <B.Dropdown.Item key={val.id}
                                //     onClick={() => handleUpdateStatus(val, item)}
                                //   >{val.name}</B.Dropdown.Item>}
                                // </>
                                <B.Dropdown.Item key={val.id}
                                  onClick={() => handleUpdateStatus(val, item)}
                                >{val.name}</B.Dropdown.Item>
                              )
                            })}
                          </B.DropdownButton>
                          </td>
                          <td className='text-center'>
                            {item.status === 0 && (item.pt_ThanhToan === 'VnPay' || item.pt_ThanhToan === 'PayPal') ?
                              <B.OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                              >
                                <div className="d-flex gap-2"><BsFillExclamationSquareFill className='fs-4 text-danger' />
                                  <FaRegEye className='fs-3 text-info' onClick={() => handleShowPrint(item)} /></div>
                              </B.OverlayTrigger> : <FaRegEye className='fs-3 text-info' onClick={() => handleShowPrint(item)} />}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </B.Table>
              )}

              {showSearchTable && (
                <B.Table responsive='lg' className='table-borderless border border-secondary mb-0'>
                  <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                    <tr>
                      <th>STT</th>
                      <th>Họ và tên khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Địa chỉ</th>
                      <th>Giảm giá</th>
                      <th>Phương thức thanh toán</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th className="text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchList && searchList.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.tenKH}</td>
                          <td>{item.sdt}</td>
                          <td>{item.diaChi}</td>
                          <td>{item.discount}%</td>
                          <td>{item.pt_ThanhToan}</td>
                          <td>{formatMoney(item.tongTien)}</td>
                          <td><B.DropdownButton variant={variant(item.status)} className='me-2' title={test(item.status)}>
                            {checkStatus.map((val) => (
                              <B.Dropdown.Item key={val.id}
                                onClick={() => handleUpdateStatus(val, item)}
                              >{val.name}</B.Dropdown.Item>
                            ))}
                          </B.DropdownButton>
                          </td>
                          <td className='text-center'>
                            {item.status === 0 && (item.pt_ThanhToan === 'VnPay' || item.pt_ThanhToan === 'PayPal') ?
                              <BsFillExclamationSquareFill className='fs-4 text-danger me-2' /> : null}
                            <FaRegEye className='fs-3 text-info' onClick={() => handleShowPrint(item)} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </B.Table>
              )}
            </B.Row>
            <Pagination currentPage={currentPage} totalPage={pageNumbers} handlePerPage={handlePerPage} />
          </B.Tab>

          <B.Tab eventKey={2} title='Lịch sử xuất hàng' className='border border-top-0 py-3 px-3'>
            <B.Row className='px-xl-3 mb-3'>
              <B.Col lg={4}>
                <B.FormGroup className='d-flex'>
                  <B.FormLabel className='fs-5'>Từ</B.FormLabel>
                  <B.FormControl type='date' className='rounded-0 ms-2 mb-2' value={dayStart} onChange={(e) => setDayStart(e.target.value)}></B.FormControl>
                </B.FormGroup>
              </B.Col>
              <B.Col lg={4}>
                <B.FormGroup className='d-flex'>
                  <B.FormLabel className='fs-5'>Đến</B.FormLabel>
                  <B.FormControl type='date' className='rounded-0 ms-2 mb-2' value={dayEnd} onChange={(e) => setDayEnd(e.target.value)}></B.FormControl>
                </B.FormGroup>
              </B.Col>
              <B.Col lg={1}>
                <B.Button variant='outline-primary' className='rounded-0' onClick={xemLichSuXuatHang}>Xem</B.Button>

              </B.Col>
              <B.Col lg={3}>
                {showExport ? <B.Button variant='outline-success' className='rounded-0 pull-right' onClick={onDownload}>Xuất ra Excel</B.Button> : null}
              </B.Col>
            </B.Row>
            <B.Row className='px-xl-3 mb-3'>
              <B.Table ref={tableRef} responsive className='table-borderless border border-secondary mb-0'>
                <thead className='text-dark' style={{ backgroundColor: '#edf1ff' }}>
                  <tr>
                    <th>ID</th>
                    <th>Tên Khách hàng</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Phương thức thanh toán</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {xemXuat && xemXuat.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.tenKH}</td>
                        <td>{item.sdt}</td>
                        <td>{item.diaChi}</td>
                        <td>{item.pt_ThanhToan}</td>
                        <td>{formatMoney(item.tongTien)}</td>
                        <td>{test(item.status)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </B.Table>
            </B.Row>
          </B.Tab>
        </B.Tabs>
      </B.Container>
    </>
  );
};
export default DonHang;
