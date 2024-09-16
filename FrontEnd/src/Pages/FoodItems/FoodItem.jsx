import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FoodCard from './FoodCard'
import { toast } from 'react-toastify'
import Spinner from '../../Components/Spinner/Spinner'
import { API_ENDPOINTS } from '../../API EndPoints/API_ENDPOINTS'
const FoodItem = ({ category }) => {
    const [loading, setLoading] = useState(true);
    const [footitems, setFootItems] = useState([])
    const fetchAllFoodItems = async () => {
        try {
            setLoading(true)
            const response = await axios.get(API_ENDPOINTS.getAllFoodItems)
            if (response.data.success) {
                setLoading(false)
                setFootItems(response.data.foods)
                console.log("foodItems",footitems)
            }
        } catch (error) {
            toast.error(response.data.message)
        }
    }
    useEffect(() => {
        fetchAllFoodItems();
        // dispatch(fetchCartData())
        // dispatch(AddCartData({ itemId: "66d4b7cece358cb7697ae50c" }))
    }, []);
    return (
        <div id='food-item' className='container-fluid'>
            {loading ? <Spinner /> : <></>}
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