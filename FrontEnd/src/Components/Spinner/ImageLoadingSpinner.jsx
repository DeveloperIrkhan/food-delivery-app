import React, { useState } from 'react'
import Spinner from './Spinner'

const ImageLoadingSpinner = ({ src, alt }) => {
    const [loading, setLoading] = useState(true)
    return (
        <div>
            <div className=''>
                {loading && (
                    <div className="">
                        <span><Spinner /></span>
                    </div>
                )}
                <img src={src}
                    alt={alt}
                    className={`cart-image rounded ${loading ? 'hidden' : "block"}`}
                    onLoad={() => setLoading(false)} />
            </div>
        </div>
    )
}

export default ImageLoadingSpinner