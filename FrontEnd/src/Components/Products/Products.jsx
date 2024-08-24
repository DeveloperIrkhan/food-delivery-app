import React from 'react'
import { useGetAllProductsQuery } from '../../app/features/ApiSlice'
import Loader from '../Loader/Loader'
import LoadingWithImage from '../Loader/LoadingWithImage'
import { AddtoCart } from '../../app/features/Shoping Cart/ShopingCartSlice'
import { useSelector, useDispatch } from 'react-redux'

const Products = () => {
    const cartList = useSelector(state => state.shopingCartSlice.cartItems);
    const TotalAmount = useSelector(state => state.shopingCartSlice.totalAmount);
    const dispatch = useDispatch();
    const AddToCart = (product) => {
        dispatch(AddtoCart(product))
    }
    const { data, isLoading, error } = useGetAllProductsQuery();
    if (isLoading) {
        return (<div>
            <Loader />
        </div>)
    }
    console.log(data.products)
    console.log("TotalAmount",TotalAmount)
    if (error) return <div>Error occurred {error.message}</div>

    return (
        <div className='w-screen bg-stone-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 justify-center'>
            {data.products.map((product) => (
                <div key={product.id} className='flex'>
                    <div className="flex flex-col max-w-sm w-full rounded-lg overflow-hidden shadow-xl bg-white p-3 hover:bg-slate-200 duration-200">
                        <LoadingWithImage src={product.thumbnail} alt="Product Image" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{product.title}</div>
                            
                        </div>
                        <div className="px-6 pt-4 pb-2 mt-auto flex justify-between items-center">
                            <span className="text-xl font-bold text-black-500">${product.price}</span>
                            <button onClick={() => AddToCart(product)} className="bg-lime-600 hover:bg-lime-900 text-white font-bold py-2 px-4 rounded duration-300">
                                AddnewTodo
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products