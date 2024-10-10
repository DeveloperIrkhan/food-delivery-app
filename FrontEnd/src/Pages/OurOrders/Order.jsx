import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { assets } from '../../assets/assets'
import { useGetAllOrdersQuery } from '../../app/features/middleware/Ordermiddleware'
import Spinner from '../../Components/Spinner/Spinner'
import { useNavigate } from 'react-router-dom'
import { _token } from '../../app/features/slices/userAuth';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
const Order = () => {
  const token = Cookies.get("accessToken");
  const { data: orders, isLoading: isLoadingOrders, refetch } = useGetAllOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true, // This will refetch the data when the component mounts again
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/home")
      toast.warning("Please Login First")
    }
  }, [token]);
  return (
    <>
      {isLoadingOrders ? <><Spinner /></> :
        <div className='container py-5' style={{ marginTop: "10vmin" }}>
          <div className="">
            <h5>Your Previous Orders</h5>
            <div className="row p-2">
              {
                orders.userOrders.map((items) => {
                  const totalItems = items.Item.reduce((total, innerItem) => total + innerItem.OrderQuantity, 0);
                  return (
                    <div className="d-flex shadow-sm align-items-center my-2 border p-3 border-1" key={items._id}>
                      <div className="col-md-2">
                        <img height={50} src={assets.miniLogo} alt="" />
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
                        <div className={`col text-center mx-2  
                         ${items.Status === "Food Processing" ? "bground-primary"
                            : items.Status === "Out For Delivery" ? "bground-success"
                              : items.Status === "Delivered" ? "bground-secondary" : ""}`}>
                          Status: {items.Status}
                        </div>
                        <div className="col text-center mx-2">
                          Total Amount: {items.Amount} ADE
                        </div>
                        <div className="col text-center mx-2">
                          <button onClick={() => refetch()} className="btn btn-success"> Track Order</button>
                        </div>

                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Order