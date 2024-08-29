import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons'
import './Navbar.css';
import { useSelector } from 'react-redux';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const Quantity = useSelector(state => state.cartSlice.totalItems);

  useEffect(() => {
    console.log("Quantity is ", Quantity);
  }, [Quantity]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="container-fluid position-relative">
        <div className="navbar fixed m-0 px-3 d-flex justify-content-between align-items-center">
          <div>
            <img className="full-logo" src={assets.FullLogo} alt="Logo" />
            <img className="small-logo" src={assets.miniLogo} alt="Logo" />
          </div>

          <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            <NavLink to="home" className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>Home</NavLink>
            <a href="#explore-menu" className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>Our Foods</a>
            <a href="#contect-section" className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>Contact Us</a>
            <a href="#about-us" className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>About Us</a>
          </div>

          <div className="cart-container d-flex align-items-center gap-3">
            <NavLink to="user-cart" className="bg-none">
              {Quantity > 0 ? (
                <img className="cart-img" src={assets.Fullcarticon} alt="Cart" />
              ) : (
                <img className="cart-img" src={assets.Emptycarticon} alt="Empty Cart" />
              )}
              <div className="cart-quantity">{Quantity}</div>
            </NavLink>
            <div>
              <img className="profile-img" src={assets.Profile} alt="Profile" />
            </div>
          </div>

          <div className="dot">
            <button className="navbar-button">Sign In</button>
          </div>

          {/* Hamburger Menu Button */}
          <div className="hamburger-menu" onClick={toggleMenu}>
            {
              menuOpen ? <span><Icon.XLg /></span> :
                <span>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </span>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
