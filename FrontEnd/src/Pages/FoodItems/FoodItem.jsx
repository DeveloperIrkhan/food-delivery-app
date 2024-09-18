import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FoodCard from './FoodCard'
import { toast } from 'react-toastify'
import Spinner from '../../Components/Spinner/Spinner'
import { API_ENDPOINTS } from '../../API EndPoints/API_ENDPOINTS'
import { useGetFoodsQuery } from '../../app/features/gettingCategories and Fooditems/categorySlice'
const FoodItem = ({ category }) => {
    const { data: foods, isLoading } = useGetFoodsQuery();
    { isLoading ? <Spinner /> : <></> }
    const [footitems, setFootItems] = useState([])
    const fetchAllFoodItems = () => {
        try {
            console.log(isLoading)
            console.log("foods", foods)
            setFootItems(foods.foods)
        } catch (error) {
             toast.error(foods?.message)
        }
    }
    useEffect(() => {

        // const { data: fooditems } = useGetFoodsQuery()
        // console.log(fooditems)
        fetchAllFoodItems();
        // dispatch(fetchCartData())
        // dispatch(AddCartData({ itemId: "66d4b7cece358cb7697ae50c" }))
    }, [foods, isLoading]);
    return (
        <div id='food-item' className='container-fluid'>
            {isLoading ? <Spinner /> : <></>}
            <div className="d-flex justify-content-center my-4">
                <h3 className='text-center header-text'>Top Dishes of Your Resturant</h3>
            </div>
            <div className="container">
                {footitems ?
                    <>
                        <div className="row">
                            {footitems.map((item) => {
                                if (category === "all" || category === item.category) {
                                    return <FoodCard
                                        key={item._id}
                                        item={item} />
                                }
                            })}

                        </div>
                    </> : <></>}
            </div>
        </div>
    )
}

export default FoodItem