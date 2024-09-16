import React, { useEffect } from 'react'
import './cart.css'
import { useNavigate } from 'react-router-dom'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux';
import { cartAddedItems, getStatus, fetchingCartItemThunk } from "../../app/features/UserCartSlice/UserCartSlice"
import { _cartItems, _totalAmount, _totalItems } from '../../app/features/AddToCart/CartSlice';
const Cart = () => {
  const cartList = useSelector(_cartItems);
  const totalItems = useSelector(_totalItems);
  const TotalAmount = useSelector(_totalAmount);
  const deliveryFee = TotalAmount > 0 ? 150 : 0;
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const Status = useSelector(getStatus)
  const fooditems = useSelector(cartAddedItems)
  useEffect(() => {
    if (Status === 'idel') {
      dispatch(fetchingCartItemThunk())
    }
    console.log(fooditems)
  }, [fetchingCartItemThunk()]);
  return (
    <>
      <section className="container bg-white py-5 antialiased" style={{ marginTop: "10vmin" }}>
        <div className="container mx-auto px-4">
          <h2 className="h2 text-xl fw-semibold text-dark sm:text-2xl">Shopping Cart</h2>
          <div className="mt-6 row">
            <div className="mx-auto col-lg-8 col-xl-8">
              <div className="space-y-6">
                {
                  cartList.map((cartItem) => (
                    <div key={cartItem._id}>
                      <CartItem totalItems={totalItems} cartitems={cartItem} />
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="mx-auto mt-6 col-lg-4 col-xl-4">
              <div className="card border rounded-lg shadow-sm">
                <div className="card-body">
                  <p className="h4 fw-semibold text-dark">Order summary</p>
                  <div className="mt-4 border-top">
                    {cartList.map((item) => (
                      <dl key={item._id} className="d-flex justify-content-between pt-2">
                        <dt className="">{item.name} x{item.OrderQuantity}</dt>
                        <dd className="">Rs/- {item.OrderQuantity * item.price} </dd>
                      </dl>
                    ))}
                    {deliveryFee != 0 ?
                      <>
                        <dl className="d-flex justify-content-between pt-3 border-top">
                          <dt className="">Delivery Fee</dt>
                          <dd className="">Rs/- {deliveryFee}</dd>
                        </dl>

                      </> : <p className='text-danger p-3'>your cart is empty</p>}
                    <dl className="d-flex justify-content-between border-top pt-2">
                      <dt className="h5 fw-bold">Total</dt>
                      <dd className="h5 fw-bold">Rs/- {TotalAmount + deliveryFee}</dd>
                    </dl>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button onClick={() => navigate('/user-orders')} className="button-primary">Proceed To Checkout</button>
                  </div>
                  <div className="d-flex justify-content-center mt-3 top-border">
                    <input className='form-control' placeholder='Promo Code here' />
                    <button className='btn btn-dark'>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Cart