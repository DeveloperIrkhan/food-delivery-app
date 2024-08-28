import React, { useEffect } from 'react'
import FoodCard from './FoodCard'
import { useDispatch, useSelector } from 'react-redux'
import { RetriveCategories } from '../../app/features/categorySlice'
import { categories } from '../../DummyAPIdata/categoryAPI'
const FoodItem = ({ category }) => {

    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categoryReducer.foodCategory);
    useEffect(() => {
        dispatch(RetriveCategories(categories))
    }, [dispatch]);

    return (
        <div className='container-fluid'>
            <div className="d-flex justify-content-center my-4">
                <h3 className='text-center header-text'>Top Dishes of Your Resturant</h3>
            </div>
            <div className="container">
                <div className="row">
                    {categoriesList.map((item) => {
                        return <FoodCard
                            key={item._id}
                            item={item} />
                    })}

                </div>
            </div>
        </div>
    )
}

export default FoodItem