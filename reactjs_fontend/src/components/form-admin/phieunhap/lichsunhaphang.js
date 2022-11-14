import * as B from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Pagination from "../../form/pagination";
import { useDownloadExcel } from "react-export-table-to-excel";

const LichSuNhapHang = () => {
  const tableRef = useRef(null);

  const [dayStart, setDayStart] = useState();
  const [dayEnd, setDayEnd] = useState();
  const [xemNhap, setXemNhap] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [perPage, setPerPage] = useState();
  const [showExport, setShowExp] = useState(false);

  const [currentPage, setCurrentPage] = useState();
  const handlePerPage = (page) => {
    setPage(page);
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Lich su nhap hang",
    sheet: "Phiếu Nhập",
  });
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
  const xemLichSuNhapHang = (e) => {
    e.preventDefault();

    axios
      .get(
        `/api/kho/lichSuNhapHang?dateFrom=${dayStart}&dateTo=${dayEnd}&page=${page}`
      )
      .then(
        (res) => {
          // console.log(res);
          if (res.data.status === 200) {
            setXemNhap(res.data.pn.data);
            setTotalPage(res.data.pn.total);
            setShowExp(true);
            setPerPage(res.data.pn.per_page);
            setCurrentPage(res.data.pn.current_page);
          }
        },
        [page]
      );
  };

  return (
    <>
      <B.Form>
        <B.FormGroup className="mb-3" controlId="formName">
          <B.Row className="px-xl-3 mb-3 ">
            <B.Col sm={4}>
              <B.FormLabel className="fw-semibold fs-5  text-primary">
                Từ ngày
              </B.FormLabel>

              <B.FormControl
                type="date"
                name="dateFrom"
                className="rounded"
                value={dayStart}
                onChange={(e) => setDayStart(e.target.value)}
              ></B.FormControl>
            </B.Col>
            <B.Col sm={4}>
              <B.FormLabel className="fw-semibold fs-5 text-primary">
                Đến ngày
              </B.FormLabel>

              <B.FormControl
                type="date"
                name="dateTo"
                className="rounded"
                value={dayEnd}
                onChange={(e) => setDayEnd(e.target.value)}
              ></B.FormControl>
            </B.Col>
            <B.Col sm={2}>
              <B.Button
                style={{ position: "absolute", bottom: "0" }}
                variant="outline-primary"
                onClick={xemLichSuNhapHang}
              >
                Xem
              </B.Button>
            </B.Col>
            <B.Col sm={2}>
              {showExport ? (
                <B.Button
                  style={{ position: "absolute", bottom: "0", right: "10px" }}
                  variant="outline-success"
                  className="rounded"
                  onClick={onDownload}
                >
                  Xuất ra Excel
                </B.Button>
              ) : null}
            </B.Col>
          </B.Row>
          {/* <span className="text-danger">{errorBird}</span> */}
          <B.Row className="px-xl-3 mb-3">
            <B.Table
              ref={tableRef}
              responsive
              className="table-borderless border border-secondary mb-0"
            >
              <thead
                className="text-dark text-center"
                style={{ backgroundColor: "#edf1ff" }}
              >
                <tr>
                  <th>STT</th>
                  <th>Tên NCC</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>

                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {xemNhap &&
                  xemNhap.map((item, index) => {
                    return (
                      <tr className="text-center" key={index}>
                        <td>{index + 1}</td>
                        <td>{item.ncc.tenNCC}</td>
                        <td>{item.ncc.sdt}</td>
                        <td>{item.ncc.diaChi}</td>
                        {/* <td>{item.status}</td> */}

                        <td>{formatMoney(item.tongTien)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </B.Table>
          </B.Row>
          <B.Row style={{ marginTop: "50px" }}>
            <Pagination
              currentPage={currentPage}
              totalPage={pageNumbers}
              handlePerPage={handlePerPage}
            />
          </B.Row>
        </B.FormGroup>
      </B.Form>
    </>
  );
};
export default LichSuNhapHang;
