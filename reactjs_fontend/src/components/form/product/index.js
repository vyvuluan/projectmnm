import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import HoverImage from "react-hover-image";
const Product = () => {
  const product = [
    {
      image:
        "https://product.hstatic.net/200000144371/product/8fa6a004-d598-4244-bed0-5425f4b709d9_5de58097e7c946caac4d6cd6e9b746c4_large.jpg",
      hoverImage:
        "https://product.hstatic.net/200000144371/product/92651a55-b3a0-4b20-90f9-d85d524e401c_9cef895b4dab42b2885ba3505b336f85_large.jpg",
      name: "QUẦN JEANS K200 XANH",
      price: "10000đ",
    },
  ];
  return (
    <>
       
      <Card sx={{ maxWidth: 300 }}>
        <a href="">
          <HoverImage
            src={product.image}
            hoverSrc={product.hoverImage}
          ></HoverImage>
        </a>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <a href="#">{product.name}</a>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Product;
