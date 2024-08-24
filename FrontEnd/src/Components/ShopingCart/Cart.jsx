import React from 'react'
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import PriceTag from './PriceTag';

const Cart = () => {
  const cartList = useSelector(state => state.shopingCartSlice.cartItems);
  const TotalAmount = useSelector(state => state.shopingCartSlice.totalAmount);

  console.log("TotalAmount", TotalAmount)
  return (

    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartList.map((cartItem) => (
                    <div key={cartItem.id}>
                      <CartItem cartitems={cartItem} />
                    </div>
                  ))}
                </div>

              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm
               dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                  <div className="space-y-4">
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2
                   dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">{TotalAmount}</dd>
                    </dl>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> Continue Shopping </span>
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