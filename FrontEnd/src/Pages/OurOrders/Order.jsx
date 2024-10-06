import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { assets } from '../../assets/assets'
import { useGetAllItemsQuery } from '../../app/features/middleware/userCartAPI';
import { useGetAllOrdersQuery } from '../../app/features/middleware/Ordermiddleware'
import Spinner from '../../Components/Spinner/Spinner'
import Cookies from "js-cookie";
import { API_ENDPOINTS, BASE_URL } from '../../API EndPoints/API_ENDPOINTS';
const Order = () => {
  const TotalAmount = useSelector(state => state.UserCart.totalAmount);
  const cartList = useSelector(state => state.UserCart.cartItems);
  const deliveryFee = TotalAmount > 0 ? 10 : 0;
  const { data: cartItemsDetails, isLoading } = useGetAllItemsQuery();
  const { data: orders, isLoading: isLoadingOrders } = useGetAllOrdersQuery();
  const [loading, setLoading] = useState(false);
  const [userOrderData, setUserOrderData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetNo: "",
    city: "",
    state: ""
  });


  const OnchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserOrderData({ ...userOrderData, [name]: value })
  }
  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    let OrderFood = [];
    cartList.map((item) => {
      OrderFood.push(item)
    })
    let totalItemPrice = 0;
    cartList.forEach((item) => {
      totalItemPrice += item.price * item.OrderQuantity;
    });
    let TotalAmount = totalItemPrice + deliveryFee;
    let OrderDetails = {
      address: userOrderData,
      items: OrderFood,
      amount: TotalAmount
    }
    const tokenFromCookies = Cookies.get("accessToken");
    const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.placeOrder}`, OrderDetails,
      {
        headers: {
          token: `${tokenFromCookies}` // Pass token as Authorization header
        }
      }
    )
    if (response.data.success) {
      setUserOrderData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        streetNo: "",
        city: "",
        state: ""
      });
      setLoading(false)
      const { session_url } = response.data
      window.location.replace(session_url)
    }
    else {
      setLoading(false)
      alert("Order failed")
    }
  }
  return (
    <>
      {isLoading || loading || isLoadingOrders ? <><Spinner /></> :
        <div className='container py-5' style={{ marginTop: "10vmin" }}>
          <div className="">
            <h5>Your Previous Orders</h5>
            {console.log("cartItemsDetails", cartItemsDetails)}
            <div className="row p-2">
              {
                orders.userOrders.map((items) => {
                  const totalItems = items.Item.reduce((total, innerItem) => total + innerItem.OrderQuantity, 0);
                  return (
                    <div className="d-flex shadow-sm align-items-center my-2 border p-3 border-1" key={items._id}>
                      <div className="col-md-2">
                        <img height={50} src={assets.FoodAddicon} alt="" />
                      </div>
                      <div className="col-md-10 d-flex flex-md-row flex-column m-auto justify-content-center align-items-center">
                        <div className="col text-center mx-2">
                          {items.Item && items.Item.map((innerItem) => (
                            <span key={innerItem._id}>
                              <span>{innerItem.name} x {innerItem.OrderQuantity} , </span>
                            </span>
                          ))}
                        </div>
                        <div className="col text-center mx-2">
                          Items Quantity: {totalItems}
                        </div>
                        <div className="col text-center mx-2">
                          Status: {items.Status}
                        </div>
                        <div className="col text-center mx-2">
                          Total Amount: {items.Amount} ADE
                        </div>
                        <div className="col text-center mx-2">
                          <button className="btn btn-success"> Track</button>
                        </div>

                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="d-flex flex-row gap-1">
            {cartItemsDetails.cartItemsDetails.length >= 0 ?
              <>
                <div className="d-flex flex-column card border rounded-lg shadow-sm p-3 col-md-6 col-12 m-auto">
                  <form onSubmit={OnSubmitHandler}>
                    <h3>User Orders</h3>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="my-2">
                          <label htmlFor="FirstName" className="col-form-label">FirstName</label>
                          <input
                            name='firstName'
                            onChange={OnchangeHandler}
                            value={userOrderData.firstName}
                            type="text"
                            className="form-control"
                            id="FirstName"
                            required
                            placeholder='enter your First Name' />
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="my-2">
                          <label htmlFor="LastName" className="col-form-label">Last Name</label>
                          <input type="text"
                            name='lastName'
                            onChange={OnchangeHandler}
                            value={userOrderData.lastName}
                            className="form-control"
                            id="LastName"
                            required
                            placeholder='enter your Last Name' />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="my-2">
                          <label htmlFor="email" className="col-form-label">Email</label>
                          <input type="text"
                            name='email'
                            onChange={OnchangeHandler}
                            value={userOrderData.email}
                            className="form-control"
                            id="email"
                            required
                            placeholder='enter your email' />
                        </div>

                      </div>
                      <div className="col-md-6 col-12">
                        <div className="my-2">
                          <label htmlFor="Phone" className="col-form-label">Phone</label>
                          <input type="text"
                            name='phone'
                            onChange={OnchangeHandler}
                            value={userOrderData.phone}
                            className="form-control"
                            id="Phone"
                            required
                            placeholder='enter your Phone' />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="my-2">
                          <label htmlFor="Street" className="col-form-label">Street No</label>
                          <input
                            type="text"
                            name='streetNo'
                            onChange={OnchangeHandler}
                            value={userOrderData.streetNo}
                            className="form-control"
                            id="Street"
                            required
                            placeholder='enter your Street No' />
                        </div>

                      </div>
                      <div className="col-md-6 col-12">
                        <div className="my-2">
                          <label htmlFor="City" className="col-form-label">City</label>
                          <input
                            type="text"
                            name='city'
                            onChange={OnchangeHandler}
                            value={userOrderData.city}
                            className="form-control"
                            id="City"
                            required
                            placeholder='enter your City' />
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="my-2">
                          <label htmlFor="State" className="col-form-label">State</label>
                          <input
                            type="text"
                            name='state'
                            onChange={OnchangeHandler}
                            value={userOrderData.state}
                            className="form-control"
                            id="State"
                            required
                            placeholder='enter your State' />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex my-md-4 my-2 align-items-end justify-content-md-end justify-content-center">
                      <button type='submit' className='btn button-primary py-2 w-25'>
                        Submit
                      </button>
                    </div>
                  </form>
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

                      </> : <></>}
                    <dl className="d-flex justify-content-between border-top pt-2">
                      <dt className="h5 fw-bold">Total</dt>
                      <dd className="h5 fw-bold">AED {TotalAmount + deliveryFee}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Order