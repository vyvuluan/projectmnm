import React, { useEffect, useState } from "react";
import Widget from "../widget";
import Chart from "../chart";
import CircelChart from "../circelChart";
import axios from "axios";
const DashBoard = () => {
  const [data, setData] = useState();

  useEffect(() => {
    // const controller = new AbortController();
    
    axios
      .get("/api/admin/baocao")
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data);
          setData(res.data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    // return () => controller.abort();
  }, []);
  // console.log(data);

  // console.log(data);
  return (
    <>
      <Widget dataWidget={data} />
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <Chart data1={data} />
        </div>
        <div className="col-xl-4 col-lg-5">
          <CircelChart data2={data} />
        </div>
      </div>
    </>
  );
};
export default React.memo(DashBoard);
