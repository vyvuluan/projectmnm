import React from "react";
import { useState, useRef, useEffect } from "react";

import "./style.css";
import Category from "../category";
const Slideshows = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
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
      <div className="container-fluid mb-5" >
        <div className="row border-top px-xl-5 " style={{flexDirection: "row", flexWrap: "nowrap"}} >
          {/* -------------------------------------------------------------------------  */}
          <Category></Category>
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
              
              <div style={{zIndex:"10"}} className=" carousel-caption d-flex flex-column align-items-center justify-content-center">
                
                <div
                  className="p-3"
                  style={{
                    maxWidth: "700px",
                  }}
                >
                  <h4 className="text-light text-uppercase font-weight-medium mb-3">
                    10% Off Your First Order
                  </h4>
                  <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                    Fashionable Dress
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
