import React from "react";
import { useState, useRef, useEffect } from "react";

import "./style.css";
import Category from "../category";
const Slideshows = () => {
  const images = [
    "https://media.jw.com.au/media/wysiwyg/2022/11/1400X400.jpg",
    "https://media.jw.com.au/media/wysiwyg/2022/09/1400X400.jpg",
    "https://storage-asset.msi.com/event/2020/nb/In-reboot-GearUp/images/Reboot-and-gearUp-event-banner02.jpg",
    "https://promotions.newegg.ca/asus/21-2758/1380x360.jpg"
  ];
  const delay = 3000;
  const handleOnclickPre = () => {
    if (index !== 0) {
      setIndex(index - 1);
    } else if (index === 0) {
      setIndex(images.length - 1);
    }
  };
  const handleOnclickNext = () => {
    //console.log(index)
    if (index !== images.length - 1) {
      setIndex(index + 1);
    } else if (index === images.length - 1) {
      setIndex(0);
    }
  };
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((preIndex) =>
          preIndex === images.length - 1 ? 0 : preIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <>
      <div className="container-fluid">
        <div
          className="row"
          style={{ flexDirection: "row", flexWrap: "nowrap" }}
        >
          {/* -------------------------------------------------------------------------  */}
          {/* <Category></Category> */}
          {/* ----------------------------------------------------------------- */}
          <div className="carousel slide col header-carousel">
            <div className="carousel-inner">
              <div
                className="carousel-item active"
                style={{
                  height: "410px",
                  whiteSpace: "nowrap",
                  transition: "ease 1000ms",
                  transform: `translate3d(${-index * 100}%,0,0)`,
                }}
              >
                {images.map((image, index) => (
                  <>
                    <img
                      key={index}
                      className="img-fluid "
                      // style={{ width:"100%"}}
                      src={image}
                      alt="Image"
                    ></img>
                  </>
                ))}
              </div>

              <div
                style={{ zIndex: "10",textShadow:"2px 2px #FF0000" }}
                className=" carousel-caption d-flex flex-column align-items-center justify-content-center"
              >
                <div
                  className="p-3"
                  style={{
                    maxWidth: "700px",
                  }}
                >
                  <h4 className="text-light text-uppercase font-weight-medium mb-3">
                    CHÍNH HÃNG
                  </h4>
                  <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                    LAPTOP-PC-WORKSTATION{" "}
                    <h1 style={{ fontSize: "100px" }}>L3M SHOP</h1>
                  </h3>
                </div>
              </div>
            </div>

            <a
              className="carousel-control-prev"
              data-slide="prev"
              onClick={handleOnclickPre}
            >
              <div
                className="btn btn-dark"
                style={{ width: "45px", height: "45px" }}
              >
                <span className="carousel-control-prev-icon mb-n2"></span>
              </div>
            </a>
            <a
              className="carousel-control-next"
              data-slide="next"
              onClick={handleOnclickNext}
            >
              <div
                className="btn btn-dark"
                style={{ width: "45px", height: "45px" }}
              >
                <span className="carousel-control-next-icon mb-n2"></span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slideshows;
