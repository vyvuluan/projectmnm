import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";



const MinimumDistanceSlider=({value1,handleChange1,valuetext,gia})=> {

  function formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  // console.log({min: value1[0],max: value1[1]});
  

  return (
    <>
      {/* <div></div>
      <div>{value1[1]}</div> */}
      <Box sx={{ width: 300 }}>
        <span>{formatMoney(value1[0])}</span>
        <span style={{ float: "right" }}>{formatMoney(value1[1])} </span>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value1}
          max={gia}
          min={0}
          step={100000}
          onChange={handleChange1}
          valueLabelDisplay="off"
          getAriaValueText={valuetext}
          disableSwap
          
        />
      </Box>
    </>
  );
}
export default MinimumDistanceSlider;