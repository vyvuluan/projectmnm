import React from "react";
import { FaCheck,FaShippingFast,FaExchangeAlt,FaPhoneVolume } from 'react-icons/fa';

const Features = () => {
    return (
        <>
            
            <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 className=" text-primary m-0 me-3"><FaCheck/></h1>
                    <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 className=" text-primary m-0 me-3"><FaShippingFast/></h1>
                    <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 className=" text-primary m-0 me-3"><FaExchangeAlt/></h1>
                    <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 className="text-primary m-0 me-3"><FaPhoneVolume/></h1>
                    <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}
export default Features