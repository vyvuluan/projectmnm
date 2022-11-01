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
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data1 }) => {
  // console.log(data1?.total_pn);
  const [dateTime, setDateTime] = useState({});
  const [terms, setTerms] = useState(true);

  const [px, setpx] = useState({});

  useEffect(() => {
    if (data1 && terms) {
      setTerms(false);
      setDateTime(data1?.total_pn);
      setpx(data1?.total_px);
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
  const labels = Object.keys(dateTime);
  const data = {
    labels,
    datasets: [
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
    ],
  };
  return (
    <Bar className="card shadow mb-4 h-100" options={options} data={data} />
  );
};
export default Chart;
