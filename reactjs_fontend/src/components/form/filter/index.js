import axios from "axios";
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import "./style.css";
import MinimumDistanceSlider from "./rangePrice";
const Filter = ({
  handleFilter,
  handleToggle,
  value1,
  handleChange1,
  valuetext,
  Checked,
  viewNSX,
  handleChange,
  idNSX1,
  gia,
}) => {
  // const [viewNSX, setViewNSX] = useState([]);
  const [idNSX, setIdNSX] = useState([]);

  const [uncheckAll, setUncheckAll] = useState(true);

  const clearClickHandler = () => {
    setUncheckAll(true);
  };
  const clearClickHandlerAll = () => setUncheckAll(false);

  let dataIDNSX1 = [];
  let idNSX2 = viewNSX.map((item) => {
    return dataIDNSX1.push(item.id);
  });
  const handleChangeAll = (e) => {
    if (e.target.name === "all") {
      setUncheckAll(true);
      Checked.length = 0;
    }
  };

  var NSX_HTML = (
    <>
      <div className="border-bottom mb-4 pb-4">
        <h5 className="pl-3">Nhà sản xuất</h5>
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              defaultChecked={uncheckAll}
              checked={uncheckAll}
              id="all"
              name="all"
              onClick={handleChangeAll}
              value={idNSX1}
              onChange={handleChange}
            ></input>
            <label className="custom-control-label" htmlFor="all">
              Tất cả
            </label>
          </div>
          {viewNSX.map((item, index) => {
            return (
              <>
                <div
                  key={item.id}
                  className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                >
                  <input
                    type="checkbox"
                    className="custom-control-input checkbox"
                    id={item.id}
                    name={item.tenNSX}
                    value={item.id}
                    onChange={() => handleToggle(item.id)}
                    checked={Checked.indexOf(item.id) === -1 ? false : true}
                    onClick={clearClickHandlerAll}
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
            <MinimumDistanceSlider
              gia={gia}
              value1={value1}
              handleChange1={handleChange1}
              valuetext={valuetext}
            />
          </div>
        </form>
      </div>
    </>
  );

  return (
    <>
      {NSX_HTML}
      {Price_HTML}
      <Button
        style={{ float: "right" }}
        variant="danger"
        onClick={handleFilter}
      >
        Lọc
      </Button>
    </>
  );
};
export default Filter;
