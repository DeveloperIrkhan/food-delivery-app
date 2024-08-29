import React from 'react'
import './aboutus.css'
const AboutUs = () => {
    return (
        <div id='about-us' className='d-flex flex-column justify-content-center align-items-center'>
            <div className="row m-0 p-0">
                <div className="col-md-6 col-12 about-us-img d-md-block d-none">


                </div>
                <div className="col-md-6 col-12 container d-flex flex-column overflow-hidden">
                    <div className="d-flex text-center flex-column m-auto">
                    <h3 className="header-text my-4 justify-content-center">About us</h3>
                        <p className='paragraph-text p-5'>Our Delicious Menu offers a variety of mouth-watering dishes crafted with the finest ingredients.
                            From savory appetizers to delightful main courses and indulgent desserts, each item is prepared to satisfy your taste buds and leave you craving more.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AboutUs