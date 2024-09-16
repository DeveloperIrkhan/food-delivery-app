import * as Icon from 'react-bootstrap-icons'
import './Navbar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import Signin from '../../Pages/Auth/Signin';
import { useNavbarLogic } from './NavbarLogic';

const Navbar = () => {
  const { menuOpen,
    Quantity,
    ShowLoginScreen,
    token,
    image,
    toggleMenu,
    logout,
    ShowModal,
    navigate, } = useNavbarLogic();
  return (
    <>
      <div className="position-relative">
        {ShowLoginScreen ? <Signin /> : <></>}
      </div>
      <div className="container-fluid position-relative">
        <div className="navbar fixed m-0 px-3  d-flex  justify-content-between align-items-center">
          <div className=''>
            <img className="full-logo" src={assets.FullLogo} alt="Logo" />
            <img className="small-logo" src={assets.miniLogo} alt="Logo" />
          </div>

          <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            <NavLink to="home" className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>Home</NavLink>
            <a href="#explore-menu" className="under-">Our Foods</a>
            <a href="#contect-section" className="under-">Contact Us</a>
            <a href="#about-us" className="under-">About Us</a>
          </div>

          <div className=" cart-container d-flex align-items-center gap-3">
            <NavLink to="user-cart" className="bg-none carts-container">
              {Quantity > 0 ? (
                <img className="cart-img" src={assets.Fullcarticon} alt="Cart" />
              ) : (
                <img className="cart-img" src={assets.Emptycarticon} alt="Empty Cart" />
              )}
              <div className="cart-quantity">{Quantity}</div>
            </NavLink>
            <div className="dot mx-3">
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
    </>
  );
};

export default Navbar;
