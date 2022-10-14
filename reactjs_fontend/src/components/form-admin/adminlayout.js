import React from 'react'
import * as B from 'react-bootstrap'
import SideNavBar from './sidebar/SideNavBar'
import TestTable from './TestTable'

function AdminLayout() {
    return (
        <>
            <B.Container fluid>
                <B.Row>
                    <B.Col lg={2}>
                        <SideNavBar />
                    </B.Col>
                    <B.Col lg={10} className='mt-5'>
                        <TestTable />
                    </B.Col>
                </B.Row>
            </B.Container>
        </>
    )
}

export default AdminLayout