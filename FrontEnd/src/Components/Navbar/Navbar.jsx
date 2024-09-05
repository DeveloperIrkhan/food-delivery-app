import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons'
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { SetToken, showLoginModal } from '../../app/features/AuthSlice';
import Signin from '../../Pages/Auth/Signin';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const Quantity = useSelector(state => state.cartSlice.totalItems);
  const ShowLoginScreen = useSelector(state => state.authSlice.showLogin)
  const token = useSelector(state => state.authSlice.Token)
  const userModel = useSelector(state => state.authSlice.user)
  const [image, setImage] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    console.log("savedUser", userModel);
    const userCreds = userModel
    console.log("savedUser", userCreds);
    if (userCreds && userCreds?.image && userCreds?.image?.data) {
      const byteArray = new Uint8Array(userCreds?.image?.data);
      const base64String = btoa(
        byteArray.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      setImage(`data:image/jpeg;base64,${base64String}`);
    } else {
      console.log("No image found for user");
    }
  }, [userModel])
  const logout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("user")
    dispatch(SetToken(""))
  }
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const ShowModal = (item) => {
    dispatch(showLoginModal(item))
  }
  return (
    <>
      <div className="position-relative">
        {ShowLoginScreen ? <Signin /> : <></>}
      </div>
      <div className="container-fluid position-relative">
        <div className="navbar fixed m-0 px-3 d-flex justify-content-between align-items-center">
          <div>
            <img className="full-logo" src={assets.FullLogo} alt="Logo" />
            <img className="small-logo" src={assets.miniLogo} alt="Logo" />
          </div>

          <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            <NavLink to="home" className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>Home</NavLink>
            <a href="#explore-menu" className="under-">Our Foods</a>
            <a href="#contect-section" className="under-">Contact Us</a>
            <a href="#about-us" className="under-">About Us</a>
          </div>

          <div className="cart-container d-flex align-items-center gap-3">
            <NavLink to="user-cart" className="bg-none carts-container">
              {Quantity > 0 ? (
                <img className="cart-img" src={assets.Fullcarticon} alt="Cart" />
              ) : (
                <img className="cart-img" src={assets.Emptycarticon} alt="Empty Cart" />
              )}
              <div className="cart-quantity">{Quantity}</div>
            </NavLink>
            <div className="dot">
              {
                !token ?
                  <button onClick={() => ShowModal(true)} className="navbar-button">Sign In</button>
                  : <div>
                    <span className='user-container'>
                      <img className='img-user' src={image ? image : assets.Profile} alt="" />
                      <div className="dropdownmenu">
                        <ul>
                          <li onClick={() => navigate('/user-orders')} >Orders</li>
                          <hr className='m-1' />
                          <li onClick={() => logout()}>Logout</li>
                        </ul>
                      </div>
                    </span>
                  </div>
              }
            </div>
          </div>



          {/* Hamburger Menu Button */}
          <div className="hamb urger-menu" onClick={toggleMenu}>
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
