import React from "react";
import "./style.css"
import * as B from 'react-bootstrap'
import { AiFillFire } from 'react-icons/ai'
import { MdArrowForwardIos } from 'react-icons/md'
const SectionTitle = (props) => {
    return (
        <>
            {/* <div className="text-center mb-2">
                <h2 className="section-title px-5"><span className="px-2 text-uppercase">{props.title}</span></h2>
            </div> */}
            <B.Container fluid>
                <B.Row className='px-xl-5'>
                    <div className='d-flex'>
                        <div>{props.icon}</div>
                        <MdArrowForwardIos className='iconsize mt-2' />
                        <h2 className=''>{props.title}</h2>
                    </div>
                </B.Row>
            </B.Container>
        </>
    )
}
export default SectionTitle