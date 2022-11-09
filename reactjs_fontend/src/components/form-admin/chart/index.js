import React, { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Cookies from "universal-cookie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data1, dataKho, dataKho2, dataNV }) => {
  const cookies = new Cookies();

  // console.log(data1?.total_pn);
  const [dateTime, setDateTime] = useState({});
  const [dateTime2, setDateTime2] = useState({});
  const [terms, setTerms] = useState(true);

  const [px, setpx] = useState({});
  const [sl, setSL] = useState({});
  const [sl2, setSL2] = useState({});

  useEffect(() => {
    if (cookies.get("role_id") == 2) {
      if (data1 && terms) {
        setTerms(false);
        setDateTime(data1?.total_pn);
        setpx(data1?.total_px);
      }
    } else if (cookies.get("role_id") == 3) {
      if (dataKho && dataKho2 && terms) {
        setTerms(false);
        setDateTime(dataKho?.total_pn);
        setDateTime2(dataKho2?.total_px);
        setSL(dataKho?.total_sl);
        setSL2(dataKho2?.total_sl);
      }
    } else if (cookies.get("role_id") == 4) {
      if (dataNV && terms) {
        setTerms(false);
        setDateTime(dataNV?.total_px);
        setSL(dataNV?.total_sl);
      }
    }
  }, [cookies, data1, dataKho, dataKho2, dataNV, terms]);

  const pn = Object.keys(dateTime).map((key) => dateTime[key]);
  let dataTongPN = pn.map(({ tongTien }) => tongTien);
  const datapx = Object.keys(px).map((key) => px[key]);
  let dataTongPX = datapx.map(({ tongTien }) => tongTien);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",

      },
      title: {
        display: true,
        text: "Bảng thống kê tháng",
      },
    },
  };

  const dataBaoCaoAdmin = [
    {
      label: "Tổng phiếu nhập",
      data: dataTongPN,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Tổng phiếu xuất",
      data: dataTongPX,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  const labels = Object.keys(dateTime);
  const dataAdmin = {
    labels,
    datasets: dataBaoCaoAdmin,
  };

  //kho
  const pnKho = Object.keys(dateTime).map((key) => dateTime[key]);
  let dataTongPNKho = pnKho.map(({ tongTien }) => tongTien);
  const dataSl = Object.keys(sl).map((key) => sl[key]);
  let dataTongSL = dataSl.map(({ soluong }) => soluong);
  const pxKho = Object.keys(dateTime2).map((key) => dateTime2[key]);
  let dataTongPXKho = pxKho.map(({ tongTien }) => tongTien);
  const dataSl2 = Object.keys(sl2).map((key) => sl2[key]);
  let dataTongSL2 = dataSl2.map(({ soluong }) => soluong);

  const dataBaoCaoKho = [
    {
      label: "Tổng tiền phiếu nhập",
      data: dataTongPNKho,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Doanh thu phiếu xuất",
      data: dataTongPXKho,
      backgroundColor: "rgba(255, 120, 0, 0.5)",
    },
    {
      label: "Tổng số lượng Phiếu nhập",
      data: dataTongSL,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Tổng số lượng Phiếu xuất",
      data: dataTongSL2,
      backgroundColor: "rgba(0, 255, 128, 0.5)",
    },
  ];

  const dataViewKho = {
    labels,
    datasets: dataBaoCaoKho,
  };
  //nhanvien
  const pxNV = Object.keys(dateTime).map((key) => dateTime[key]);
  let dataTongPXNV = pxNV.map(({ tongTien }) => tongTien);
  const dataSlNV = Object.keys(sl).map((key) => sl[key]);
  let dataTongSLNV = dataSlNV.map(({ soluong }) => soluong);

  const dataBaoCaoNV = [
    {
      label: "Tổng tiền phiếu Xuất",
      data: dataTongPXNV,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Tổng tiền số lượng phiếu xuất",
      data: dataTongSLNV,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];
  // console.log(dataTongPNKho);
  // console.log(dataTongSL);
  // const labels1 = Object.keys(dateTime);
  const dataViewNV = {
    labels,
    datasets: dataBaoCaoNV,
  };

  return (
    <Bar

      className="card shadow mb-4 h-100"

      options={options}
      data={
        cookies.get("role_id") == 3
          ? dataViewKho
          : cookies.get("role_id") == 2
            ? dataAdmin
            : cookies.get("role_id") == 4
              ? dataViewNV
              : null
      }
    />
  );
};
export default Chart;
