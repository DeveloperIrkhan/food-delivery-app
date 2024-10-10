import React from 'react'
import { toast} from 'react-toastify'
import { useGetAllOrdersQuery, useUpdateStatusMutation } from '../../app/Features/middlewares/OrderAPI'
import Spinner from '../../Components/Spinner/Spinner'
const Orders = () => {

    const { data: orders, isLoading } = useGetAllOrdersQuery()
    const [updateStatus] = useUpdateStatusMutation();
    if (isLoading) return <Spinner />
    const handleStatusOnChange = async (event, OrderId) => {
        const Status = event.target.value;
        console.log(Status)
        console.log(OrderId)
        await updateStatus({ OrderId, Status })
        toast.success('Order status updated successfully')
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="text-end">
                    <h5>Total {orders?.totalOrders} orders placed</h5>
                </div>
            </div>

            <div className="row p-2">
                {orders?.userOrders?.map((order) => {
                    return (
                        <div
                            className="row shadow-sm my-2 p-3 border border-1 bg-light rounded-3"
                            key={order._id}>
                            <div className="col-md-6 col-12 my-1">
                                <div className="d-flex align-items-center">
                                    <span className="dot-bullet"></span>
                                    <p className="mb-0"><strong>Order ID:</strong> {order._id}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="dot-bullet"></span>
                                    <p className="mb-0"><strong>Payment:</strong> {order.Payment ? 'Paid' : 'Pending'}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 my-1">
                                <div className="d-flex align-items-center">
                                    <span className="dot-bullet"></span>
                                    <p className="mb-0"><strong>Total Amount:</strong> {order.Amount}</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="dot-bullet"></span>
                                    <p className='mb-0'><strong>Delivering To:</strong> {order.Address.city}</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-12 my-1">
                                <div className="d-flex align-items-center">
                                    <span className="dot-bullet"></span>
                                    <p className='mb-0'><strong>Items Ordered:</strong> {order.Item.reduce((sum, item) => sum + item.OrderQuantity, 0)}</p>
                                </div>
                            </div>

                            <div className="col-12  my-1">
                                <div className="d-flex align-items-center">
                                    <p className="mb-0"><strong>Status:</strong>
                                        {/* {order.Status} */}
                                        <select onChange={(event) => handleStatusOnChange(event, order._id)}
                                            className="form-select"
                                            aria-label="Default select example"
                                            defaultValue={order.Status}
                                            name="Status"
                                            id="Status">
                                            <option value="Food Processing">Food Processing</option>
                                            <option value="Out For Delivery">Out For Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </p>


                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders