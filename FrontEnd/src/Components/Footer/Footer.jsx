import React, { useState } from 'react'
import './footer.css'
import * as Icon from 'react-bootstrap-icons'
import { assets } from '../../assets/assets'
const Footer = () => {
  const [menu, setMenu] = useState("")
  return (
    <div className='d-flex flex-column justify-content-center align-items-center footer-section'>
      <div className="logo-section my-md-4 my-2">
        <img src={assets.FullLogo} alt="" />

      </div>
      <div className="menu-section my-md-4 my-2">
        <ul className="d-flex my-auto flex-md-row flex-column gap-4 text-uppercase">
          <li>Home</li>
          <li>Our Foods</li>
          <li>Contact us</li>
          <li>About us</li>
        </ul>
      </div>
      <div className="social-section text-center my-md-4">
        <h4>Follow us on</h4>
        <div className="d-flex gap-4 pb-5">
          <span><Icon.Facebook /></span>
          <span><Icon.Instagram /></span>
          <span><Icon.TwitterX /></span>
          <span><Icon.Linkedin /></span>
          <span><Icon.Github /></span>
        </div>
        <div>
        </div>
      </div>
      <hr />
      <div className="copy-right-section">
      Food Divalary Application &copy;  {new Date().getFullYear()}
      </div>
    </div>
  )
}

export default Footer