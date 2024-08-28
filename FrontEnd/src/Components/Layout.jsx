import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import Navbar from './Navbar/Navbar'
import Banner from './banner/Banner'
import Home from '../Pages/Home/Home'
const Layout = () => {
    return (
        <div className="">
            <div className=''>
                <Navbar />
            </div>
            <div className="d-flex flex-md-row flex-row gap-3">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout