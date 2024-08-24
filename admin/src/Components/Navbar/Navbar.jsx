import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar mb-md-4 mb-2'>
      <div className="container-fluid">
        <img className='full-logo' src={assets.FullLogo} alt="" />
        <img className='profile-img' src={assets.Profile} alt="" />
      </div>
    </div>
  )
}

export default Navbar