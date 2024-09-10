import React from 'react'
import { useSelector } from 'react-redux';
import { assets } from '../../assets/assets'
const Order = () => {
  const cartList = useSelector(state => state.cartSlice.cartItems);
  const TotalAmount = useSelector(state => state.cartSlice.totalAmount);
  const deliveryFee = TotalAmount > 0 ? 150 : 0;
  return (
    <div className='container py-5' style={{ marginTop: "10vmin" }}>
      <div className="d-flex flex-row gap-1">
        {cartList.length > 0 ?
          <>
            <div className="d-flex flex-column card border rounded-lg shadow-sm p-3 col-md-6 col-12 m-auto">
              <h3>User Orders</h3>
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="my-2">
                    <label htmlFor="FirstName" className="col-form-label">FirstName</label>
                    <input type="text" className="form-control" id="FirstName" required placeholder='enter your First Name' />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="my-2">
                    <label htmlFor="LastName" className="col-form-label">Last Name</label>
                    <input type="text" className="form-control" id="LastName" required placeholder='enter your Last Name' />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="my-2">
                    <label htmlFor="email" className="col-form-label">Email</label>
                    <input type="text" className="form-control" id="email" required placeholder='enter your email' />
                  </div>

                </div>
                <div className="col-md-6 col-12">
                  <div className="my-2">
                    <label htmlFor="Phone" className="col-form-label">Phone</label>
                    <input type="text" className="form-control" id="Phone" required placeholder='enter your Phone' />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="my-2">
                    <label htmlFor="Street" className="col-form-label">Street No</label>
                    <input type="text" className="form-control" id="Street" required placeholder='enter your Street No' />
                  </div>

                </div>
                <div className="col-md-6 col-12">
                  <div className="my-2">
                    <label htmlFor="City" className="col-form-label">City</label>
                    <input type="text" className="form-control" id="City" required placeholder='enter your City' />
                  </div>
                </div>
              </div>
              <div className="d-flex my-md-4 my-2 align-items-end justify-content-md-end justify-content-center">
                <button className='btn btn-primary w-25'>
                  Submit
                </button>
              </div>
            </div>

          </> :
          <div className='d-flex flex-column card border rounded-lg shadow-sm p-3  m-auto'>
           <h5>your cart is empty</h5> <img src={assets.Emptycarticon} alt="" />
          </div>
        }

        <div className="d-md-flex d-none flex-column col-md-4 col-12 m-auto">
          <h5>cart Info</h5>
          <div className="card border rounded-lg shadow-sm">
            <div className="card-body">
              <p className="h5 fw-semibold text-dark">Order summary</p>
              <div className="mt-4 border-top">
                {cartList.map((item) => (
                  <dl className="d-flex justify-content-between pt-2">
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

                  </> : <></>}
                <dl className="d-flex justify-content-between border-top pt-2">
                  <dt className="h5 fw-bold">Total</dt>
                  <dd className="h5 fw-bold">Rs/- {TotalAmount + deliveryFee}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order