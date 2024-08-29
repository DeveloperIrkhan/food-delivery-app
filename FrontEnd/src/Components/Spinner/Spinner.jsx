import React from 'react'

const Spinner = () => {
  return (
    <div className="loading-screen">
      <div className="vw-100 vh-100 overflow-hidden">
        <div className="d-flex align-items-center justify-content-center min-vh-100">
          <img src='../src/assets/Loading.svg' className="img-fluid" />
        </div>
      </div>
    </div>

  )
}

export default Spinner

