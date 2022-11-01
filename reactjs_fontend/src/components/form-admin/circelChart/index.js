import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircelChart = ({ data2 }) => {
  // console.log(data2?.loai);
  const [loai, setLoai] = useState();
  const [percent, setPercent] = useState();
  const [terms, setTerms] = useState(true);

  useEffect(() => {
    if (data2 && terms) {
      setTerms(false);
      setLoai(Object.keys(data2?.loai));
      setPercent(Object.values(data2?.loai));
    }
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bảng thống kê %",
      },
    },
  };

  const data = {
    labels: loai,
    datasets: [
      {
        label: "# of Votes",
        data: percent,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Doughnut
      options={options}
      className="card shadow mb-4 h-100"
      data={data}
    />
  );
};
export default CircelChart;
