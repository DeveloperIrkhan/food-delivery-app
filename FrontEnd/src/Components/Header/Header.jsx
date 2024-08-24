import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector(state => state.shopingCartSlice.cartItems);
  console.log("cartItems", cartItems)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav id="header" className="w-full z-30 top-0 py-1">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">

        <label for="menu-toggle" className="cursor-pointer md:hidden block">
          <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <title>E-bazar Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
          <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
              <li>

                <NavLink to={"Home"}
                  className={({ isActive }) =>
                    ` py-2 px-4 ${isActive ? "inline-block font-bold border-b-2 border-y-black hover:text-black" : ""}`}>Home
                </NavLink>
              </li>
              <li>

                <NavLink to={"products"}
                  className={({ isActive }) =>
                    ` py-2 px-4 ${isActive ? "inline-block font-bold border-b-2 border-y-black hover:text-black" : ""}`}>Products
                </NavLink>
              </li>
              <NavLink to={"about"}
                className={({ isActive }) =>
                  ` py-2 px-4 ${isActive ? "inline-block font-bold border-b-2 border-y-black hover:text-black" : ""}`}>About
              </NavLink>
            </ul>
          </nav>
        </div>

        <div className="order-1 md:order-2">
          <NavLink to={"/Home"} className="tracking-wide bold-font flex flex-row items-center">
            <img src="../src/assets//E-shop.png" className="h-8" alt="E-bazar Logo" />
            <span className="text-center">E-Bazar</span>
          </NavLink>
        </div>

        <div className="order-2 md:order-3 flex items-center" id="nav-content">

          <a className="inline-block no-underline hover:text-black" href="#">
            <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <circle fill="none" cx="12" cy="7" r="3" />
              <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
            </svg>
          </a>

          <NavLink to={"cart"} className="relative pl-3 inline-block no-underline hover:text-black" href="#">
            <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
              <circle cx="10.5" cy="18.5" r="1.5" />
              <circle cx="17.5" cy="18.5" r="1.5" />
            </svg>
            {cartItems.length > 0 ? (<span className='absolute bottom-2 left-8 border text-white bg-red-500 w-6 rounded-full text-center cart-style'>
              {cartItems.length}
            </span>) : (<span></span>)}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;








// <nav className="bg-white border-gray-200 dark:bg-gray-900">
//       <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
         
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">E-Bazar</span>
//         </a>
//         <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

//           <button
//             type="button"
//             onClick={toggleDropdown}
//             className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dropdown-icon
//             dark:focus:ring-gray-600"
//             id="user-menu-button"
//             aria-expanded={isDropdownOpen}
//           >
//             <span className="sr-only">Open user menu</span>
//             <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
//           </button>

//           {/* Dropdown */}
//           {isDropdownOpen && (
//             <div className="text-base list-none bg-whiterounded-lg" id="user-dropdown">
//               <ul className="dropdown" aria-labelledby="user-menu-button">
//                 <li>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
//                    dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
//                 </li>
//                 <li>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
//                    dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
//                 </li>
//                 <li>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
//                    dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
//                 </li>
//               </ul>
//             </div>
//           )}

//           <button
//             onClick={toggleMobileMenu}
//             data-collapse-toggle="navbar-user"
//             type="button"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm
//              text-gray-500 rounded-lg md:hidden hover:bg-gray-100 
//              focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
//              dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             aria-controls="navbar-user"
//             aria-expanded={isMobileMenuOpen}
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//             </svg>
//           </button>
//         </div>
//         <div className={`items-center justify-between ${isMobileMenuOpen ? 'block' : 'hidden'} 
//         w-full md:flex md:w-auto md:order-1`} id="navbar-user">
//           <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg 
//           bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white 
//           dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <NavLink to={"Home"}
//                 className={({ isActive }) => `${isActive ? "" : ""}`}>Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to={"products"}
//                 className={({ isActive }) => `block py-2 px-3 text-gray-900  rounded 
//                 hover:bg-gray-100 md:hover:bg-transparent 
//                 md:hover:text-blue-700 md:p-0 dark:text-white
//                  md:dark:hover:text-blue-500 dark:hover:bg-gray-700
//                   dark:hover:text-white md:dark:hover:bg-transparent
//                    dark:border-gray-700 ${isActive ? "font-bold  border-b-2 border-black" : ""}`}>Products
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 className={({ isActive }) =>
//                   `relative block py-2 px-3 text-gray-900  rounded 
//                 hover:bg-gray-100 md:hover:bg-transparent 
//                 md:hover:text-blue-700 md:p-0 dark:text-white
//                  md:dark:hover:text-blue-500 dark:hover:bg-gray-700
//                   dark:hover:text-white md:dark:hover:bg-transparent
//                    dark:border-gray-700 ${isActive ?
//                     "font-bold " : ""}`}
//                 aria-current="page"

//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>