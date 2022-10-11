import React from "react";
import "./style.css"
const SectionTitle = (props) => {
    return (
        <>
        <div class="text-center mb-2 mt-5">
            <h2 class="section-title px-5"><span class="px-2">{props.title}</span></h2>
        </div>
        </>
    )
}   
export default SectionTitle