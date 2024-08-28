import React from 'react'

const Spinner = () => {
    return (
        <div className='loading-screen w-100 h-100'>
            <div className="d-flex align-items-center justify-content-center">
                <img src='../src/assets/Loading.svg' />
            </div>
        </div>
    )
}

export default Spinner

