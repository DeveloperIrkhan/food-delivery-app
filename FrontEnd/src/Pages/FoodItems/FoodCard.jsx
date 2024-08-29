import React, { useEffect, useState } from 'react'
import { addToCart } from '../../app/features/CartSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as Icon from 'react-bootstrap-icons'
import './Fooditem.css'
import ImageLoadingSpinner from '../../Components/Spinner/ImageLoadingSpinner'
const FoodCard = ({ item }) => {
    const [itemCount, setItemCount] = useState(0);
    const dispatch = useDispatch();
    const TotalCount = useSelector(state => state.cartSlice.totalItems)
    useEffect(() => {
        setItemCount(TotalCount)
    }, [dispatch]);

    const AddCart = (item) => {
        dispatch(addToCart(item))
    }
    return (
        <div className="col-md-3 col-6 gap-3 mb-3 food-item">
            <div className="card shadow-sm rounded">
                <div className="food-item-img-container overflow-hidden">
                    <ImageLoadingSpinner className="card-img-top" SorceFile={item.image} Alt="cartItem" />
                </div>
                <div className="card-body food-item-info">
                    <div className="food-item-rating">
                        <div className='card-title'>{item.name}</div>
                        <p>
                            description:   {item.description}
                        </p>

                    </div>
                    <div className="food-item-description d-flex justify-content-around align-items-center">
                        <div className="d-flex gap-1 ">
                            <Icon.StarFill color='#3c3c3c' />
                            <Icon.StarFill color='#3c3c3c' />
                            <Icon.StarFill color='#3c3c3c' />
                            <Icon.StarHalf color='#3c3c3c' />
                            <Icon.Star color='#3c3c3c' />
                        </div>
                        <div className='food-item-price d-flex align-items-center'>Rs/- {item.price}</div>
                    </div>
                    <div className='d-flex justify-content-end mt-3 align-items-center'>
                        {/* {items.OrderQuantity === 1 ? (
                            <button className='btn cart-button' onClick={() => AddCart(item)}>
                                Order
                            </button>) : (<button className='btn cart-button'>
                                Remove
                            </button>)} */}
                        <button className='btn cart-button' onClick={() => AddCart(item)}>
                            Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodCard