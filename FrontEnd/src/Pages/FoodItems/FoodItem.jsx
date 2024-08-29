import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard'
import { useDispatch, useSelector } from 'react-redux'
import { RetriveAllFoodItems } from '../../app/features/categorySlice'
import { AllFoodsItems } from '../../DummyAPIdata/categoryAPI'
const FoodItem = ({ category }) => {
    const dispatch = useDispatch();
    const allFoodsItems = useSelector(state => state.categoryReducer.AllFoodItems);
    useEffect(() => {
        dispatch(RetriveAllFoodItems(AllFoodsItems))
    }, [dispatch]);

    return (
        <div className='container-fluid'>
            <div className="d-flex justify-content-center my-4">
                <h3 className='text-center header-text'>Top Dishes of Your Resturant</h3>
            </div>
            <div className="container">
                <div className="row">
                    {allFoodsItems.map((item) => {
                        if (category === "all" || category === item.category) {
                            return <FoodCard
                                key={item._id}
                                item={item} />
                        }
                    })}

                </div>
            </div>
        </div>
    )
}

export default FoodItem