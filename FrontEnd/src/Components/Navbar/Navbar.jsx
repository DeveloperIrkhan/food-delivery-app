import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useSelector } from 'react-redux';
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const Quantity = useSelector(state => state.cartSlice.totalItems)
  useEffect(() => {
    console.log("Quantity is ", Quantity)
  }, [Quantity]);
  return (
    <>
      <div className="container-fluid position-relative">
        <div className=' navbar fixed m-0 px-3'>
          <div className="">
            <img className='full-logo' src={assets.FullLogo} alt="" />
          </div>
          <ul className="navbar-menu d-flex my-auto flex-md-row flex-column gap-4 text-uppercase">
            <NavLink to={"home"} className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>Home</NavLink>
            <NavLink to={""} className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>Our Foods</NavLink>
            <NavLink to={""} className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>Contact us</NavLink>
            <NavLink to={""} className={({ isActive }) => `p-1 ${isActive ? "under-line" : ""}`}>About us</NavLink>
          </ul>

          <div className=" d-flex justify-content-end align-items-center  gap-3">
            <NavLink to={"user-cart"} className="bg-none">
              {
                Quantity > 0 ?
                  (
                    <img className='cart-img' src={assets.Fullcarticon} alt="" />
                  ) : (
                    <img className='cart-img' src={assets.Emptycarticon} alt="" />
                  )
              } {Quantity}
            </NavLink>
            <div className="">
              <img className='profile-img' src={assets.Profile} alt="" />
            </div>
          </div>
          <div className="dot">
            <button className='navbar-button'>Sign In</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar