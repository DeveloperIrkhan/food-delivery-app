import React, { useState } from 'react'
import Loader from './Loader'
const LoadingWithImage = ({ src, alt }) => {
    const [loading, setLoading] = useState(true)
    return (
        <div className='relative'>
            {loading && (
                <div className="w-full h-48 flex items-center justify-center">
                    <span><Loader /></span>
                </div>
            )}
            <img src={src}
                alt={alt}
                className={`w-full ${loading ? 'hidden' : "block"}`}
                onLoad={() => setLoading(false)} />
        </div>
    )
}

export default LoadingWithImage