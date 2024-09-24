import React, { useEffect, useState } from 'react'
import {
    addToCart,
    DecrementItem,
    cartItems,
} from '../../app/features/middleware/userCartMiddleware'
import { useSelector, useDispatch } from 'react-redux'
import * as Icon from 'react-bootstrap-icons'
import './Fooditem.css'
import ImageLoadingSpinner from '../../Components/Spinner/ImageLoadingSpinner'
import Roundedbtn from '../../Components/buttons/Roundedbtn'
import { API_ENDPOINTS } from '../../API EndPoints/API_ENDPOINTS'
const FoodCard = ({ item }) => {
    const dispatch = useDispatch();
    const cartitem = useSelector(cartItems) || [];
    // Assuming item has a unique `id`
    const existingItem = cartitem.some(cartItem => cartItem._id === item._id);
    const AddCart = (item) => {
        dispatch(addToCart(item))
    }
    const RemoveFromCart = (item) => {
        dispatch(DecrementItem(item))
    };
    return (
        <>
            <div className="col-md-3 col-12 gap-3 mb-3 food-item">
                <div className="card shadow-sm rounded">
                    <div className="food-item-img-container overflow-hidden">
                        <ImageLoadingSpinner
                            className="card-img-top"
                            SorceFile={`${API_ENDPOINTS.getImages}/${item.image}`} Alt="cartItem" />
                    </div>
                    <div className="card-body food-item-info">
                        <div className="food-item-rating">
                            <div className='card-title'>{item.name}</div>
                            <p>
                                description: {item.description}
                            </p>
                        </div>
                        <div className="food-item-description d-flex justify-content-around align-items-center">
                            <div className="d-flex gap-1">
                                <Icon.StarFill className='blackcolor' />
                                <Icon.StarFill className='blackcolor' />
                                <Icon.StarFill className='blackcolor' />
                                <Icon.StarHalf className='blackcolor' />
                                <Icon.Star className='blackcolor' />
                            </div>
                            <div className='food-item-price d-flex align-items-center'>Rs/- {item.price}</div>
                        </div>
                        <div className='d-flex justify-content-end mt-3 align-items-center'>
                            <Roundedbtn onclickFun={existingItem ? () => RemoveFromCart(item) : () => AddCart(item)} cssClass={"btn cart-button"} text={existingItem ? "Remove" : "Order"} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodCard