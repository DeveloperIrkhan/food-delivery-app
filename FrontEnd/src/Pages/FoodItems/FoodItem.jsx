import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import FoodCard from './FoodCard'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RetriveAllFoodItems } from '../../app/features/categorySlice'
import { AllFoodsItems } from '../../DummyAPIdata/categoryAPI'
import { AddCartData, fetchCartData } from '../../app/features/CartSlice'
import Spinner from '../../Components/Spinner/Spinner'
const FoodItem = ({ category }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [footitems, setFootItems] = useState([])

    const cart_fetching_data = useSelector((state) => state.cartSlice);
    // const { AllFoodsItems } = useContext(StoreContext)
    useEffect(() => {
        dispatch(RetriveAllFoodItems(AllFoodsItems))
    }, [dispatch]);
    const fetchAllFoodItems = async () => {
        try {
            setLoading(true)
            const response = await axios.get("http://localhost:4000/api/food/getAllFood")
            if (response.data.success) {
                setLoading(false)
                setFootItems(response.data.foods)
            }
        } catch (error) {
            toast.error(response.data.message)
        }
    }
    useEffect(() => {
        console.log("cart_fetching_data", cart_fetching_data)
        fetchAllFoodItems();
        dispatch(fetchCartData())
        dispatch(AddCartData({ itemId: "66d4b7cece358cb7697ae50c" }))
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