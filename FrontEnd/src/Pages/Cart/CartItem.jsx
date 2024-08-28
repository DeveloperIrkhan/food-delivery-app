import React from 'react'
import { useDispatch } from 'react-redux';
import { DecrementItem, IncrementItem } from '../../app/features/CartSlice';
import ImageLoadingSpinner from '../../Components/Spinner/ImageLoadingSpinner'
import './cart.css'
const CartItem = ({ cartitems }) => {
    const dispatch = useDispatch();
    const AddToCartitem = (cartitems) => {
        dispatch(IncrementItem(cartitems))
    }
    const removefromCartitem = (cartitems) => {
        dispatch(DecrementItem(cartitems))
    }
    return (
        <section>
            <div className="card border rounded-lg shadow-sm bg-white p-md-4 p-2 mb-2">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-auto order-md-1">
                        <div className="cart-image">
                            <ImageLoadingSpinner className="cart-image" src={cartitems.image} alt="cartItem Image" />
                        </div>
                    </div>

                    <label htmlFor="counter-input" className="visually-hidden">Choose quantity:</label>

                    <div className="col-md-auto order-md-3 d-flex justify-content-end align-items-center">
                        <div className="d-flex align-items-center">
                            <button onClick={() => AddToCartitem(cartitems)}
                                type="button"
                                className="inc-button">
                                +
                            </button>
                            <strong className="px-2">{cartitems.OrderQuantity}</strong>
                            <button onClick={() => removefromCartitem(cartitems)}
                                type="button"
                                className="inc-button">
                                -
                            </button>
                        </div>
                    </div>

                    <div className="col-md-4 text-end order-md-4">
                        <p className="text-dark">Item Price: Rs/- {cartitems.price}</p>
                    </div>

                    <div className="col-md order-md-2">
                        <div className="fw-medium text-dark">
                            {cartitems.name}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CartItem