import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { useGetFoodsQuery } from '../../app/features/categoriesSlice/categorySlice'
const FoodItem = ({ category }) => {
    const { data: foods, isError, isLoading, error } = useGetFoodsQuery();

    const [footitems, setFootItems] = useState([])
    // Check the API response
    useEffect(() => {
        if (foods && foods.foods) {
            setFootItems(foods.foods);

            console.log(footItemsLength)
        }
    }, [foods]);
    const footItemsLength = footitems.length;
    return (
        <div id='food-item' className='container-fluid'>
            <div className="d-flex justify-content-center my-4">
                <h3 className='text-center header-text'>Top Dishes of Your Resturant</h3>
            </div>
            {isLoading ? (
                <div className="container">
                    <div className="row">
                        {
                            [...Array(footItemsLength)].map((_, index) => (
                                <SkeletonTheme key={index} baseColor="#ebebeb" highlightColor="#eeaf9d">
                                    <div className="col-md-3 col-12 gap-3 mb-3 food-item">
                                        <div className="card shadow-sm rounded">
                                            <div className="food-item-img-container overflow-hidden">
                                                <h2 className="card-img-top">
                                                    <Skeleton height={200} />
                                                </h2>
                                            </div>
                                            <div className="card-body food-item-info">
                                                <div className="food-item-rating">
                                                    <div className='card-title'>
                                                        <Skeleton />
                                                    </div>
                                                    <p>
                                                        <Skeleton />
                                                    </p>
                                                </div>
                                                <div className="food-item-description d-flex justify-content-around align-items-center">
                                                    <div className="d-flex gap-1">
                                                        <Skeleton />
                                                    </div>
                                                    <div className='food-item-price d-flex align-items-center'>
                                                        <Skeleton />
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-end mt-3 align-items-center'>
                                                    <Skeleton />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SkeletonTheme>
                            ))
                        }
                    </div>
                </div>
            ) : isError ? (
                <div className='p-4 row text-center'>
                    <div className="alert alert-danger">
                        <h3 className=''>{error.message || "Something went wrong"}</h3>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        {footitems.map((item) => {
                            if (category === "all" || category === item.category) {
                                return <FoodCard
                                    key={item._id}
                                    item={item}
                                    isLoading={isLoading}
                                    isError={isError}
                                    error={error} />
                            }
                        })}

                    </div>
                </div>
            )}

            {/* <div className="container">
                {footitems ?
                    <>
                        <div className="row">
                            {footitems.map((item) => {
                                if (category === "all" || category === item.category) {
                                    return <FoodCard
                                        key={item._id}
                                        item={item}
                                        isLoading={isLoading}
                                        isError={isError}
                                        error={error} />
                                }
                            })}

                        </div>
                    </> :
                    <div className='p-4 row'>
                        <div className="alert-danger">
                            {error.message || "Something went wrong"}
                        </div>
                    </div>
                    }
            </div> */}
        </div>
    )
}

export default FoodItem