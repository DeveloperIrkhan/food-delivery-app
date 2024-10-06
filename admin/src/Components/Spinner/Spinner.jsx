import React from 'react'

const Spinner = () => {
    return (
        <div className='loading-screen' style={{height:"100vh"}}>
            <div className="d-flex align-items-center justify-content-center min-h-screen">
                <img src='../src/assets/Loading.svg' />
            </div>
        </div>
    )
}

export default Spinner

