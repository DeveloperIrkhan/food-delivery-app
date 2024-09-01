import React from 'react'
import './OurFoods.css'
const OurFood = () => {
  return (
    <div id='our-foods' className='d-flex justify-content-center align-items-center flex-column mt-5'>
      <h3 className='header-text text-center'>Today's Specials</h3>
      <div className=" col-md-8 col-12">
        <div className="text-center">
          <p className='para-text'>Choose from a diverse menu featuring a detectable array of dishes
            crafted with the inest injredients and culinary experties.
            Our mission is to satisfy your cravings
            and elevate your dining experience.
            one delicious meal at the time
          </p>
          <button className='button'>Book a Table</button>
        </div>
      </div>
    </div>
  )
}

export default OurFood