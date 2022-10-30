import React, { useState } from 'react'
import * as Loader from "react-spinners";

function LoadingPage() {
    const [color, setColor] = useState('#d19c97');
    const [loading, setLoading] = useState(true);

    return (
        <div className='position-relative' style={{ height: '300px', width: '100%' }}>
            <Loader.BarLoader
                color={color}
                loading={loading}
                className='position-absolute top-50 start-50 translate-middle'
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default LoadingPage