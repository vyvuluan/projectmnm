import React from "react";
import "./style.css"
const SectionTitle = (props) => {
    return (
        <>
        <div className="text-center mb-2">
            <h2 className="section-title px-5"><span className="px-2 text-uppercase">{props.title}</span></h2>
        </div>
        </>
    )
}   
export default SectionTitle