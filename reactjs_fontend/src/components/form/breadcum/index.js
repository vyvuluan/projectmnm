import React from 'react'
import { Link } from 'react-router-dom'
import * as B from 'react-bootstrap'

const index = (props) => {
    return (
        <>
            <B.Container fluid className="bg-secondary mb-5">
                <div
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: "300px" }}
                >
                    <h1 className="fw-semibold text-uppercase mb-3">
                        {props.title}
                    </h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <Link to='/' className="text-decoration-none" variant="primary">
                                Trang chủ
                            </Link>
                        </p>
                        {props.BC === 1 ?
                            <>
                                <p className="m-0 px-2">-</p>
                                <p className="m-0 text-muted">{props.name}</p>
                            </>
                            : props.BC === 2 ?
                                <>
                                    <p className="m-0 px-2">-</p>
                                    <p className="m-0"><Link to={props.link} className='text-decoration-none' variant="primary">{props.linkName}</Link></p>
                                    <p className="m-0 px-2">-</p>
                                    <p className="m-0 text-muted">{props.name}</p>
                                </> : null}
                    </div>
                </div>
            </B.Container>
        </>
    )
}

export default index