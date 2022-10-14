import React from "react";
import Widget from "../widget";
import { Chart } from "../chart";
import { CircelChart } from "../circelChart";
const DashBoard = () => {
  return (
    <>
      <Widget />
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <Chart />
        </div>
        <div className="col-xl-4 col-lg-5">
          <CircelChart />
        </div>
      </div>
    </>
  );
};
export default DashBoard;
