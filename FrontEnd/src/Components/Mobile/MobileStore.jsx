import React from 'react'
import { assets } from '../../assets/assets'
import './Mobile.css'
const MobileStore = () => {
    return (
        <div className='d-flex justify-content-center align-items-center my-5 flex-column'>
            <h3 className="header-text my-4">Explore Our Delicious Menu</h3>
            <div className="image-store container">
                <div className="row text-center">
                    <div className="col-md-6 col-12">
                        <img className='' src={assets.App_store} alt="" />
                    </div>
                    <div className="col-md-6 col-12">
                        <img className='' src={assets.Play_store} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileStore