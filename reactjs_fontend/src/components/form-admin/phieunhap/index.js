import React, { useState } from "react";
import * as B from "react-bootstrap";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaUserEdit, FaSearch } from "react-icons/fa";
import { AiOutlineUserDelete, AiOutlineEdit } from "react-icons/ai";
import { CgExtensionAdd } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";

/*
    xóa tìm kiếm
    chia thành tab giống sản phẩm (1 thêm 2 xem)
    xóa số lượng , giá nhập
    ngày nhập là hiện tại 
    xóa tên phiếu nhập, tên sản phẩm,nhà sản xuất
    nhà cung cấp có tìm kiếm


    table:
    xóa id đổi thành số thứ tự 
     
    cột 2 sản phẩm (cho tìm kiếm sản phẩm)
    3 số lượng 
    4 đơn giá
    thao tác thêm hiển thị dưới phía dưới
    bên phải có tổng tiền

    tab xem ds phiếu nhập



*/
const PhieuNhap = () => {
  const [tabkey, setTabKey] = useState(1);
    var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
//   console.log(typeof(newDate) );
  return (
    <>
      <B.Container fluid>
        <B.Row className="pe-xl-5 mb-4">
          <B.Col lg={8}>
            <h1 className="fw-bold text-primary mb-4 text-capitalize">
              QUẢN LÝ PHIẾU NHẬP
            </h1>
          </B.Col>
          <B.Col lg={2}></B.Col>
          {/* <B.Col lg={6}>
                        <B.Form>
                            <B.FormGroup>
                                <B.InputGroup>
                                    <B.FormControl
                                        type="text"
                                        placeholder="Tìm kiếm"
                                        className="rounded-0 shadow-none focus-outline-none fw-semibold"
                                    ></B.FormControl>
                                    <B.InputGroup.Text className="bg-transparent text-primary rounded-0">
                                        <FaSearch variant="primary" />
                                    </B.InputGroup.Text>
                                </B.InputGroup>
                            </B.FormGroup>
                            <B.FormGroup className='d-flex d-inline-block justify-content-between mt-2'>
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo id' />
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo NCC' />
                                <B.FormCheck type='checkbox' className='rounded-0' label='Theo NSX' />
                            </B.FormGroup>
                        </B.Form>
                    </B.Col> */}
        </B.Row>

        <B.Row className="pe-xl-5 mb-5">
          <B.Col>
            <B.Tabs activeKey={tabkey} onSelect={(k) => setTabKey(k)}>
              <B.Tab
                eventKey={1}
                title="thêm phiếu nhập"
                className=" border border-top-0 py-3 px-3"
              >
                <B.Row>
                  <B.Col>
                    <B.Form>
                      <B.FormGroup className="d-flex d-inline-block justify-content-between">
                        <B.FormSelect className="rounded-0 shadow-none me-1 mb-3 text-muted w-100">
                          <option>Nhà cung cấp</option>
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                        </B.FormSelect>
                        <B.Button className="rounded-0 shadow-none me-1 mb-3 text-muted ">
                          Thêm
                        </B.Button>
                      </B.FormGroup>
                    </B.Form>
                  </B.Col>
                  <B.Col>
                    <B.FormGroup>
                    <B.FormControl
                        type="text"
                        className="rounded-0 shadow-none mb-3"
                        placeholder={dateTime}
                        disabled
                    ></B.FormControl>
                    </B.FormGroup>

                  </B.Col>
                  <B.Col>

                <B.Button variant="outline-primary" className="rounded-0  mb-2">
                  <BsPersonPlusFill className="me-2" />
                  Thêm phiếu nhập
                </B.Button>
                  </B.Col>
                </B.Row>


                <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2"></B.FormGroup>
                <B.Table className="table-borderless border border-secondary text-center mb-0">
                  <thead
                    className="text-dark"
                    style={{ backgroundColor: "#edf1ff" }}
                  >
                    <tr>
                      <th>
                        <input type="checkbox" />
                      </th>
                      <th>ID</th>
                      <th>Tên phiếu nhập</th>
                      <th>Tên sản phẩm</th>
                      <th>NCC/NSX</th>
                      <th>Số lượng</th>
                      <th>Giá nhập</th>
                      <th>Ngày nhập</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    <tr>
                      <td className="align-middle">
                        <input type="checkbox" />
                      </td>
                      <td className="align-middle">1</td>
                      <td className="align-middle">
                        Nhập 50 laptop ASUS đợt 1
                      </td>
                      <td className="align-middle">Laptop ASUS TUF A15</td>
                      <td className="align-middle">GearVN/ASUS</td>
                      <td className="align-middle">50</td>
                      <td className="align-middle">2,500,000,000</td>
                      <td className="align-middle">20/8/2021</td>
                      <td className="align-middle fs-5 text-primary">
                        <BiEdit />
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <input type="checkbox" />
                      </td>
                      <td className="align-middle">2</td>
                      <td className="align-middle">
                        Nhập 50 laptop ASUS đợt 2
                      </td>
                      <td className="align-middle">Laptop ASUS ROG G14</td>
                      <td className="align-middle">GearVN/ASUS</td>
                      <td className="align-middle">50</td>
                      <td className="align-middle">3,500,000,000</td>
                      <td className="align-middle">7/12/2021</td>
                      <td className="align-middle fs-5 text-primary">
                        <BiEdit />
                      </td>
                    </tr>
                    <tr>
                      <td className="align-middle">
                        <input type="checkbox" />
                      </td>
                      <td className="align-middle">3</td>
                      <td className="align-middle">Nhập 10 laptop Lenovo</td>
                      <td className="align-middle">Laptop Lenovo Legion</td>
                      <td className="align-middle">StarComP/Lenovo</td>
                      <td className="align-middle">10</td>
                      <td className="align-middle">300,000,000</td>
                      <td className="align-middle">2/2/2022</td>
                      <td className="align-middle fs-5 text-primary">
                        <BiEdit />
                      </td>
                    </tr>
                  </tbody>
                </B.Table>
              </B.Tab>

              <B.Tab
                eventKey={2}
                title="Xem danh sách phiếu nhập"
                className=" border border-top-0 py-3 px-3"
              >
                <B.Form>
                  <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
                    <B.FormSelect
                      className="rounded-0 shadow-none"
                      style={{ width: "200px" }}
                    >
                      <option>Sắp xếp</option>
                      <option>Từ A-Z</option>
                      <option>Theo ID</option>
                      <option>Theo NCC</option>
                      <option>Theo NSX</option>
                      <option>Theo ngày nhập</option>
                    </B.FormSelect>
                  </B.FormGroup>
                  <B.Table className="table-borderless border border-secondary text-center mb-0">
                    <thead
                      className="text-dark"
                      style={{ backgroundColor: "#edf1ff" }}
                    >
                      <tr>
                        <th>
                          <input type="checkbox" />
                        </th>
                        <th>ID</th>
                        <th>Tên phiếu nhập</th>
                        <th>Tên sản phẩm</th>
                        <th>NCC/NSX</th>
                        <th>Số lượng</th>
                        <th>Giá nhập</th>
                        <th>Ngày nhập</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      <tr>
                        <td className="align-middle">
                          <input type="checkbox" />
                        </td>
                        <td className="align-middle">1</td>
                        <td className="align-middle">
                          Nhập 50 laptop ASUS đợt 1
                        </td>
                        <td className="align-middle">Laptop ASUS TUF A15</td>
                        <td className="align-middle">GearVN/ASUS</td>
                        <td className="align-middle">50</td>
                        <td className="align-middle">2,500,000,000</td>
                        <td className="align-middle">20/8/2021</td>
                        <td className="align-middle fs-5 text-primary">
                          <BiEdit />
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">
                          <input type="checkbox" />
                        </td>
                        <td className="align-middle">2</td>
                        <td className="align-middle">
                          Nhập 50 laptop ASUS đợt 2
                        </td>
                        <td className="align-middle">Laptop ASUS ROG G14</td>
                        <td className="align-middle">GearVN/ASUS</td>
                        <td className="align-middle">50</td>
                        <td className="align-middle">3,500,000,000</td>
                        <td className="align-middle">7/12/2021</td>
                        <td className="align-middle fs-5 text-primary">
                          <BiEdit />
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle">
                          <input type="checkbox" />
                        </td>
                        <td className="align-middle">3</td>
                        <td className="align-middle">Nhập 10 laptop Lenovo</td>
                        <td className="align-middle">Laptop Lenovo Legion</td>
                        <td className="align-middle">StarComP/Lenovo</td>
                        <td className="align-middle">10</td>
                        <td className="align-middle">300,000,000</td>
                        <td className="align-middle">2/2/2022</td>
                        <td className="align-middle fs-5 text-primary">
                          <BiEdit />
                        </td>
                      </tr>
                    </tbody>
                  </B.Table>
                </B.Form>
              </B.Tab>
            </B.Tabs>
          </B.Col>
        </B.Row>
        {/* table hien thi tai khoan */}
        {/* <B.Row className="pe-xl-5">
          <B.Col lg className="d-grd gap-2 mx-auto table-responsive mb-5">
            <B.FormGroup className="d-flex d-inline-block justify-content-between mb-2">
              <B.FormSelect
                className="rounded-0 shadow-none"
                style={{ width: "200px" }}
              >
                <option>Sắp xếp</option>
                <option>Từ A-Z</option>
                <option>Theo ID</option>
                <option>Theo NCC</option>
                <option>Theo NSX</option>
                <option>Theo ngày nhập</option>
              </B.FormSelect>
            </B.FormGroup>
            <B.Table className="table-borderless border border-secondary text-center mb-0">
              <thead
                className="text-dark"
                style={{ backgroundColor: "#edf1ff" }}
              >
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>ID</th>
                  <th>Tên phiếu nhập</th>
                  <th>Tên sản phẩm</th>
                  <th>NCC/NSX</th>
                  <th>Số lượng</th>
                  <th>Giá nhập</th>
                  <th>Ngày nhập</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                <tr>
                  <td className="align-middle">
                    <input type="checkbox" />
                  </td>
                  <td className="align-middle">1</td>
                  <td className="align-middle">Nhập 50 laptop ASUS đợt 1</td>
                  <td className="align-middle">Laptop ASUS TUF A15</td>
                  <td className="align-middle">GearVN/ASUS</td>
                  <td className="align-middle">50</td>
                  <td className="align-middle">2,500,000,000</td>
                  <td className="align-middle">20/8/2021</td>
                  <td className="align-middle fs-5 text-primary">
                    <BiEdit />
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">
                    <input type="checkbox" />
                  </td>
                  <td className="align-middle">2</td>
                  <td className="align-middle">Nhập 50 laptop ASUS đợt 2</td>
                  <td className="align-middle">Laptop ASUS ROG G14</td>
                  <td className="align-middle">GearVN/ASUS</td>
                  <td className="align-middle">50</td>
                  <td className="align-middle">3,500,000,000</td>
                  <td className="align-middle">7/12/2021</td>
                  <td className="align-middle fs-5 text-primary">
                    <BiEdit />
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">
                    <input type="checkbox" />
                  </td>
                  <td className="align-middle">3</td>
                  <td className="align-middle">Nhập 10 laptop Lenovo</td>
                  <td className="align-middle">Laptop Lenovo Legion</td>
                  <td className="align-middle">StarComP/Lenovo</td>
                  <td className="align-middle">10</td>
                  <td className="align-middle">300,000,000</td>
                  <td className="align-middle">2/2/2022</td>
                  <td className="align-middle fs-5 text-primary">
                    <BiEdit />
                  </td>
                </tr>
              </tbody>
            </B.Table>
          </B.Col>
        </B.Row> */}
      </B.Container>
    </>
  );
};

export default PhieuNhap;
