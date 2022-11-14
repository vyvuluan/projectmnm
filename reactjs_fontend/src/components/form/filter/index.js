import axios from "axios";
import React, { useEffect, useState } from "react";
import RangeSlider from "./rangePrice";

import "./style.css";
const Filter = () => {
  const [viewNSX, setViewNSX] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/nsx`)
      .then((res) => {
        if (res.data.status == 200) {
          // console.log(res.data.Nsx);
          setViewNSX(res.data.Nsx);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // console.log(viewNSX);
  var NSX_HTML = (
    <>
    <div className="border-bottom mb-4 pb-4">
      <h5 className="pl-3">Nhà sản xuất</h5>
      <form>
        <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
          <input
            type="checkbox"
            className="custom-control-input"
            defaultChecked
            id="price-all"
            // value={item.id}
          ></input>
          <label className="custom-control-label" htmlFor="price-all">
            Tất cả
          </label>
        </div>
        {viewNSX.map((item) => {
          return (
            <>
              <div
                key={item.id}
                className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
              >
                <input
                  type="checkbox"
                  className="custom-control-input"
                  // defaultChecked
                  id={item.id}
                  // name={item.tenNSX}
                  // value={item.id}
                ></input>
                <label className="custom-control-label" htmlFor={item.id}>
                  {item.tenNSX}
                </label>
              </div>
            </>
          );
        })}
      </form>
      </div>
    </>
  );
  var Price_HTML = (
    <>
      <div className="border-bottom mb-4 pb-4">
        <h5 className="pl-3">Mức giá</h5>
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <RangeSlider/>

          </div>
          
        </form>
      </div>
    </>
  );
  return (
    <>
      {NSX_HTML}
      {Price_HTML}
    </>
  );
};
export default Filter;
