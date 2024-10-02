import './cart.css'
import { useNavigate } from 'react-router-dom'
import Roundedbtn from '../../Components/buttons/Roundedbtn'
import CartItem from './CartItem'
import { useSelector } from 'react-redux';
import {
  cartItems,
  totalitems,
  totalamount,
} from "../../app/features/slices/userCartSlice"
import { useGetAllItemsQuery } from '../../app/features/middleware/userCartAPI';
import Spinner from '../../Components/Spinner/Spinner';
const Cart = () => {
  const cartList = useSelector(cartItems);
  const totalItems = useSelector(totalitems);
  const TotalAmount = useSelector(totalamount);
  const deliveryFee = TotalAmount > 0 ? 10 : 0;
  const navigate = useNavigate()
  const { data: cartItemsDetails, isLoading } = useGetAllItemsQuery();
  if (!isLoading) { console.log("items", cartItemsDetails) }
  return (
    <>
      {isLoading ? <Spinner /> : <></>}
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
                        <dd className="">AED {item.OrderQuantity * item.price} </dd>
                      </dl>
                    ))}
                    {deliveryFee != 0 ?
                      <>
                        <dl className="d-flex justify-content-between pt-3 border-top">
                          <dt className="">Delivery Fee</dt>
                          <dd className="">AED {deliveryFee}</dd>
                        </dl>

                      </> :
                      <p className='row  p-3'>
                        <span className="alert alert-danger">
                          your cart is empty
                        </span>
                      </p>}
                    <dl className="d-flex justify-content-between border-top pt-2">
                      <dt className="h5 fw-bold">Total</dt>
                      <dd className="h5 fw-bold">AED {TotalAmount + deliveryFee}</dd>
                    </dl>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <Roundedbtn cssClass={"btn cart-button"} text='Proceed to Checkout' onclickFun={() => navigate('/user-orders')} />
                  </div>
                  <div className="d-flex justify-content-center mt-3 top-border">
                    <input className='form-control rounded-0 rounded-start-5' placeholder='Promo Code here' />
                    <button className='btn rounded-0 rounded-end-5 btn-primary'>Submit</button>
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