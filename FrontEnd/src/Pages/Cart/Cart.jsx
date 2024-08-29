import React from 'react'
import './cart.css'
import CartItem from './CartItem'
import { useSelector } from 'react-redux';
const Cart = () => {
  const cartList = useSelector(state => state.cartSlice.cartItems);
  const totalItems = useSelector(state => state.cartSlice.totalItems);
  const TotalAmount = useSelector(state => state.cartSlice.totalAmount);
  return (
    <>
      <section className="container bg-white py-5 antialiased" style={{marginTop:"10vmin"}}>
        <div className="container mx-auto px-4">
          <h2 className="h2 text-xl fw-semibold text-dark sm:text-2xl">Shopping Cart</h2>
          <div className="mt-6 row">
            <div className="mx-auto col-lg-8 col-xl-8">
              <div className="space-y-6">
                {
                  cartList.map((cartItem) => (
                    <div key={cartItem._id}>
                      <CartItem totalItems={totalItems} cartitems={cartItem} />
                      <ImageLoadingSpinner className="cart-image" src={cartitems.image} alt="cartItem Image" />
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="mx-auto mt-6 col-lg-4 col-xl-4">
              <div className="card border rounded-lg shadow-sm">
                <div className="card-body">
                  <p className="h4 fw-semibold text-dark">Order summary</p>
                  <div className="mt-4">
                    <dl className="d-flex justify-content-between border-top pt-2">
                      <dt className="h5 fw-bold">Total</dt>
                      <dd className="h5 fw-bold">{TotalAmount}</dd>
                    </dl>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <span className="text-muted">Continue Shopping</span>
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