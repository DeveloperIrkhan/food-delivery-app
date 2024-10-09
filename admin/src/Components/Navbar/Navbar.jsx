import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { _token, SetToken, _user } from '../../app/Features/Slices/AuthSlice'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(_token);
  const userModel = useSelector(_user);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    const userCreds = userModel.exsistingUser;
    if (userCreds && userCreds.image) {
      setImage(`http://localhost:4000/images/${userCreds.image}`);
    } else {
      setImage(null);
    }
  }, [token]);
  const logout = () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("user");
    dispatch(SetToken(""));
    navigate("/");
  };
  return (
    <div className='navbar mb-md-4 mb-2'>
      <div className="container">
        <img className='full-logo' src={assets.FullLogo} alt="" />
        <div className="cart-container d-flex align-items-center gap-3">
          <div className="dot mx-3">
            {
              !token ?
                <button onClick={() => navigate("/")} className="navbar-button">Sign In</button>
                : <div>
                  <span className='user-container'>
                    <img className='img-user' src={token ? image : assets.Profile} alt="" />
                    <div className="dropdownmenu">
                      <ul>
                        <li onClick={() => logout()}>Logout</li>
                      </ul>
                    </div>
                  </span>
                </div>
            }
          </div>
          <div className="d-lg-none d-block hamb urger-menu" onClick={toggleMenu}>
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
    </div>
  )
}

export default Navbar