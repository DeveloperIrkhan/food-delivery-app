import React, { useState } from 'react'
import OurFood from '../Our Foods/OurFood'
import ExploreMenu from '../MenuSection/ExploreMenu'
import FoodItem from '../../Pages/FoodItems/FoodItem'
import Banner from '../../Components/banner/Banner'


const Home = () => {
    const [category, setCategory] = useState("all")
    return (
        <div>
            <Banner />
            <OurFood />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodItem category={category} />
        </div>
    )
}

export default Home