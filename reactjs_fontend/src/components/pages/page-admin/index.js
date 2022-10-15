import React from "react";
import * as B from 'react-bootstrap'

import { NavbarAdmin,ContactAdmin,SideBar,SearchAdmin,DashBoard,Customer } from "../../form-admin";
const PageAdmin = (props) => {

    return (
        <>
            <NavbarAdmin/>
            <B.Container fluid>
                <B.Row>
                    <B.Col lg={2}>
                        <SideBar/>
                    </B.Col>
                    <B.Col lg={10} className='mt-5'>
                       <Customer/>
                    </B.Col>
                </B.Row>
            </B.Container>

            
        </>
    )
}   
export default PageAdmin