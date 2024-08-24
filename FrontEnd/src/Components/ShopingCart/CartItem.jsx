import React from 'react'
import LoadingWithImage from '../Loader/LoadingWithImage'
import { useDispatch } from 'react-redux'
import { RemoveFromCart } from '../../app/features/Shoping Cart/ShopingCartSlice'

const CartItem = ({ cartitems }) => {
    const dispatch = useDispatch();
    const removefromCartitem = (cartitems) => {
        dispatch(RemoveFromCart(cartitems))
    }
    return (
        <section>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="w-20 shrink-0 md:order-1">
                            <LoadingWithImage src={cartitems.thumbnail} alt="cartItem Image" />
                        </div>
                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="inline-flex  p-2 bg-slate-400 hover:bg-slate-800 text-white h-7 w-7 items-center justify-center rounded-md border">
                                    +
                                </button>
                                <button onClick={() => removefromCartitem(cartitems)}
                                    type="button"
                                    className="inline-flex  p-2 bg-slate-400 hover:bg-slate-800 text-white h-7 w-7 items-center justify-center rounded-md border">
                                    -
                                </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 dark:text-white">{cartitems.price}</p>
                            </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <div className="text-base font-medium text-gray-900 dark:text-white">
                                {cartitems.title}
                            </div>
                        </div>
                    </div>
                
            </div>
        </section>
    )
}

export default CartItem