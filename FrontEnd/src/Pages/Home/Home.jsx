import React, { useState } from 'react'
import OurFood from '../Our Foods/OurFood'
import ExploreMenu from '../MenuSection/ExploreMenu'
import FoodItem from '../../Pages/FoodItems/FoodItem'
import Banner from '../../Components/banner/Banner'
import MobileStore from '../../Components/Mobile/MobileStore'
import AboutUs from '../../Components/About us/AboutUs'
import Footer from '../../Components/Footer/Footer'


const Home = () => {
    const [category, setCategory] = useState("all")
    return (
        <div>
            <Banner />
            <OurFood />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodItem category={category} />
            <MobileStore/>
            <AboutUs/>
        </div>
    )
}

export default Home