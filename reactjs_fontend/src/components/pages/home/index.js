import React from "react";

import {
  Slideshow,
  Features,
  SectionTitle,
  Product,
} from "../../form/index.js";
const HomePage = () => {
  return (
    <>
      <Slideshow />
      <SectionTitle title="Service" />
      <Features />
      <SectionTitle title="Sản phẩm bán chạy nhất" />
      <Product item={products} />
    </>
  );
};
const products = [
  {
    id: 1,
    image:
      "https://cdn.mediamart.vn/images/product/laptop-asus-vivobook-14-a415ea-eb1474w-den_2dc20efd.jpg",
    name: "Laptop Asus VivoBook 14",
    price: "10000đ",
  },
  {
    id: 2,
    image:
      "https://cdn.mediamart.vn/images/product/laptop-asus-vivobook-14-a415ea-eb1474w-den_2dc20efd.jpg",
    name: "Laptop Asus VivoBook 14",
    price: "10000đ",
  },
  {
    id: 3,
    image:
      "https://cdn.mediamart.vn/images/product/laptop-asus-vivobook-14-a415ea-eb1474w-den_2dc20efd.jpg",
    name: "Laptop Asus VivoBook 14",
    price: "10000đ",
  },
  {
    id: 4,
    image:
      "https://cdn.mediamart.vn/images/product/laptop-asus-vivobook-14-a415ea-eb1474w-den_2dc20efd.jpg",
    name: "Laptop Asus VivoBook 14",
    price: "10000đ",
  },
  {
    id: 5,
    image:
      "https://cdn.mediamart.vn/images/product/laptop-asus-vivobook-14-a415ea-eb1474w-den_2dc20efd.jpg",
    name: "Laptop Asus VivoBook 14",
    price: "10000đ",
  },
  {
    id: 6,
    image:
      "https://cdn.mediamart.vn/images/product/laptop-asus-vivobook-14-a415ea-eb1474w-den_2dc20efd.jpg",
    name: "Laptop Asus VivoBook 14",
    price: "10000đ",
  },
  {
    id: 7,
    image:
      "https://cdn.mediamart.vn/images/product/laptop-asus-vivobook-14-a415ea-eb1474w-den_2dc20efd.jpg",
    name: "Laptop Asus VivoBook 14",
    price: "10000đ",
  },
  {
    id: 8,
    image:
      "https://cdn.mediamart.vn/images/product/laptop-asus-vivobook-14-a415ea-eb1474w-den_2dc20efd.jpg",
    name: "Laptop Asus VivoBook 14",
    price: "10000đ",
  },
];
export default HomePage;
