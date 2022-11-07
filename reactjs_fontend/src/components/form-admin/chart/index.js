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

const Chart = ({ data1, dataKho, dataNV }) => {
  const cookies = new Cookies();

  // console.log(data1?.total_pn);
  const [dateTime, setDateTime] = useState({});
  const [terms, setTerms] = useState(true);

  const [px, setpx] = useState({});
  const [sl, setSL] = useState({});

  useEffect(() => {
    if (cookies.get("role_id") == 2) {
      if (data1 && terms) {
        setTerms(false);
        setDateTime(data1?.total_pn);
        setpx(data1?.total_px);
      }
    } else if (cookies.get("role_id") == 3) {
      if (dataKho && terms) {
        setTerms(false);
        setDateTime(dataKho?.total_pn);
        setSL(dataKho?.total_sl);
      }
    } else if (cookies.get("role_id") == 4) {
      if (dataNV && terms) {
        setTerms(false);
        setDateTime(dataNV?.total_px);
        setSL(dataNV?.total_sl);
      }
    }
  });

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
  // console.log(dataTongPX);
  //kho
  const pnKho = Object.keys(dateTime).map((key) => dateTime[key]);
  let dataTongPNKho = pnKho.map(({ soluong }) => soluong);
  const dataSl = Object.keys(sl).map((key) => sl[key]);
  let dataTongSL = dataSl.map(({ tongTien }) => tongTien);
  const dataBaoCaoKho = [
    {
      label: "Tổng tiền phiếu nhập",
      data: dataTongPNKho,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Tổng tiền số lượng",
      data: dataTongSL,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  const dataViewKho = {
    labels,
    datasets: dataBaoCaoKho,
  };
  //nhanvien
  const pxNV = Object.keys(dateTime).map((key) => dateTime[key]);
  let dataTongPXNV = pxNV.map(({ soluong }) => soluong);
  const dataSlNV = Object.keys(sl).map((key) => sl[key]);
  let dataTongSLNV = dataSlNV.map(({ tongTien }) => tongTien);

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
