import React, { useState } from 'react'
import Spinner from './Spinner'

const ImageLoadingSpinner = ({ SorceFile, Alt }) => {
    const [loading, setLoading] = useState(true)
    return (
        <div className="position-relative">
            {loading && (
                <div className="spinner-overlay w-100 d-flex align-items-center justify-content-center">
                    <div className="screen">
                        <div className="overflow-hidden">
                            <div className="d-flex align-items-center justify-content-center">
                                <img src='../src/assets/Loading.svg' className="img-fluid image-spinner" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <img
                src={SorceFile}
                alt={Alt}
                className={`w-100 h-auto ${loading ? 'd-none' : 'd-block cart-image'}`}
                onLoad={() => setLoading(false)} 
            />
        </div>


    )
}

export default ImageLoadingSpinner