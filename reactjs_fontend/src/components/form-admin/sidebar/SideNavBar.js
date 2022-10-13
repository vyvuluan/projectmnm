import React, { useState } from 'react'
import { FaICursor } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import * as FaI from 'react-icons/fa'
import * as B from 'react-bootstrap'
import { MdDashboard } from 'react-icons/md'
import { HiHome } from 'react-icons/hi'
import { SideNavBarData } from './SideNavBarData.js'


function SideNavBar() {
    return (
        <>
            <B.TabContainer id='left-tabs-example' defaultActiveKey={'/Home'}>
                < B.Col lg={2} className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark' style={{ height: '100vh' }}>
                    {/* <div className='text-muted fs-6 ms-3'>ADMINISTRATIVE</div>
                    <hr></hr> */}

                    <B.Nav variant='pills' className='flex-column mb-auto'>
                        <B.NavItem>
                            {SideNavBarData.map(({ title, icon, path }) => (
                                <B.NavLink className='text-white' eventKey={path}>
                                    <span className='fs-5 me-3'>{icon}</span>
                                    <span className='fs-5'>{title}</span>
                                </B.NavLink>
                            ))}
                        </B.NavItem>
                    </B.Nav>
                </B.Col>
            </B.TabContainer>
        </>
    )
}

export default SideNavBar