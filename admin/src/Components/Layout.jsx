import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import Sidebar from '../Components/Sidebar/Sidebar'
const Layout = () => {
    return (
        <div className="">
            <div className=''>
                <Navbar />
            </div>
            <div className="container d-flex flex-md-row flex-row gap-3">
                <div className="col-md-3 col-2">
                    <Sidebar />
                </div>
                <div className='col-md-9 col-10 div-container'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout