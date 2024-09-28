import React from 'react'
import { useDispatch } from 'react-redux';
import { IncrementItem, DecrementItem } from '../../app/features/slices/userCartSlice';
import ImageLoadingSpinner from '../../Components/Spinner/ImageLoadingSpinner'
import './cart.css'
import { API_ENDPOINTS } from '../../API EndPoints/API_ENDPOINTS';
import { useAddToCartMutation, useRemoveFromCartMutation } from '../../app/features/middleware/userCartAPI';
const CartItem = ({ cartitems }) => {
    const [apiAddToCall] = useAddToCartMutation();
    const [removeCartItem] = useRemoveFromCartMutation();



    const dispatch = useDispatch();
    const AddToCartitem = (cartitems) => {
        dispatch(IncrementItem(cartitems))
        apiAddToCall(cartitems)
            .then(() => {
                console.log("item added successfully")
            })
            .catch((error) => {
                console.log(`error while adding item into database ${error}`)
            })
    }
    const removefromCartitem = (cartitems) => {
        dispatch(DecrementItem(cartitems))
        removeCartItem(cartitems)
            .then(() => {
                console.log("item remove successfully")
            })
            .catch((error) => {
                console.log(`error while removing item ${error}`)
            })
    }

    return (
        <section>
            <div className="card mb-3" style={{ maxWidth: 740 }}>
                <div className="row g-0">
                    <div className="col-md-5">
                        <ImageLoadingSpinner className="img-fluid rounded-lg shopingcart-img"
                            SorceFile={`${API_ENDPOINTS.getImages}/${cartitems.image}`} Alt={cartitems.name} />
                    </div>
                    <div className="col-md-7" style={{ position: "relative" }}>
                        <div className="card-body">
                            <div className="d-flex flex-md-column flex-row align-items-end">
                                <h5 className="card-text mt-md-0 mt-3">{cartitems.name}</h5>
                                <p className="card-text mx-md-0 mb-md-0 mx-3 mb-2">Item Price: Rs/- {cartitems.price}</p>
                            </div>
                            <div className="mt-auto align-self-end" style={{ position: "absolute", bottom: "20px", right: "10px" }}>
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