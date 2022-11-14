import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  console.log(value);

  return value;
}
function formatMoney(money) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
}
export default function RangeSlider() {
  const [value, setValue] = React.useState(50000000);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box width={300}>
      <span>0 Đ</span>
      <span style={{ float: "right" }}>{formatMoney(value)}</span>

      <Slider
        onChange={handleChange}
        getAriaValueText={valuetext}
        min={0}
        max={50000000}
        step={1000000}
        defaultValue={50000000}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
