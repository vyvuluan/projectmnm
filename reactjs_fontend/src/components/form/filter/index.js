import axios from "axios";
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import "./style.css";
import MinimumDistanceSlider from "./rangePrice";
const Filter = () => {
  const [viewNSX, setViewNSX] = useState([]);
  const [idNSX, setIdNSX] = useState();

  const [key, setKey] = useState(0);
  const [uncheckAll, setUncheckAll] = useState(true);
  const clearClickHandler = () => {
    setUncheckAll(true);
    setKey((k) => k + 1);
  };
  const clearClickHandlerAll = () => setUncheckAll(false);
  useEffect(() => {
    axios
      .get(`/api/nsx`)
      .then((res) => {
        if (res.data.status == 200) {
          // console.log(res.data.Nsx);
          setViewNSX(res.data.Nsx);
          // setIdNSX(res.data.Nsx.id)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const changeValue = (e) => {
    console.log(e.target.value);
  };

  // rangeMoney
  const minDistance = 10;
  function valuetext(value) {
    // console.log(value);
    return value;
  }
  const [value1, setValue1] = React.useState([0, 50000000]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };
  const data = [1, 2];
  //  console.log(value1);
  useEffect(() => {
    axios
      .get(
        `/api/sort-chitiet-minmax?nsx_id=1,2&giaMin=${value1[0]}&giaMax=${value1[1]}`
      )
      .then((res) => {
        if (res.data.status == 200) {
          // console.log(res.data.Nsx);
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
              defaultChecked={uncheckAll}
              checked={uncheckAll}
              id="price-all"
              onClick={clearClickHandler}
              value={0}
              onChange={changeValue}
            ></input>
            <label className="custom-control-label" htmlFor="price-all">
              Tất cả
            </label>
          </div>
          {viewNSX.map((item) => {
            return (
              <>
                <div
                  key={key}
                  className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                >
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    defaultChecked={false}
                    id={item.id}
                    name={item.tenNSX}
                    value={item.id}
                    onChange={changeValue}
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
      <Button style={{ float: "right" }} variant="danger">
        Lọc
      </Button>
    </>
  );
};
export default Filter;
