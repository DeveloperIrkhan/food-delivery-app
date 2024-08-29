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
            <div className="card mb-3" style={{ maxWidth: 740 }}>
                <div className="row g-0">
                    <div className="col-md-6">
                        <ImageLoadingSpinner className="img-fluid rounded-start shopingcart-img" SorceFile={cartitems.image} Alt="cartItem" />
                    </div>
                    <div className="col-md-6" style={{position:"relative"}}>
                        <div className="card-body">
                            <div className="d-flex flex-md-column flex-row align-items-end">
                            <h5 className="card-text mt-md-0 mt-3">{cartitems.name}</h5>
                            <p className="card-text mx-md-0 mb-md-0 mx-3 mb-2">Item Price: Rs/- {cartitems.price}</p>
                            </div>
                            <div className="mt-auto align-self-end" style={{position:"absolute", bottom:"20px", right:"10px"}}>
                                    <div className="mt-auto col-md-auto order-md-3 d-flex justify-content-end align-items-center">
                                        <div className="d-flex align-items-center">
                                            <button onClick={() => removefromCartitem(cartitems)}
                                                type="button"
                                                className="inc-button">
                                                -
                                            </button>
                                            <strong className="px-2">{cartitems.OrderQuantity}</strong>
                                            <button onClick={() => AddToCartitem(cartitems)}
                                                type="button"
                                                className="inc-button">
                                                +
                                            </button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CartItem