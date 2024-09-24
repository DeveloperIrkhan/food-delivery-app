import "./menu.css"
import { _isLoading, useGetCategoriesQuery } from "../../app/features/gettingCategories and Fooditems/categorySlice"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { API_ENDPOINTS } from '../../API EndPoints/API_ENDPOINTS'
import { useEffect } from "react"
import { useSelector } from "react-redux"
const CategoriesMenu = ({ category, setCategory }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery();
    // let isLoading = useSelector(_isLoading)
    useEffect(() => {
    }, [isLoading]);
    return (
        <div id='explore-menu' className="d-flex justify-content-center align-items-center flex-column mt-5">
            <h3 className="header-text my-4">Explore Our Delicious Menu</h3>
            <div className="col-md-8 col-12 d-flex text-center flex-column m-auto">
                <div className="col-md-8 col-12 d-flex text-center flex-column m-auto">
                    <p className='paragraph-text'>Our Delicious Menu offers a variety of mouth-watering dishes crafted with the finest ingredients.
                        From savory appetizers to delightful main courses and indulgent desserts, each item is prepared to satisfy your taste buds and leave you craving more.
                    </p>
                </div>
            </div>
            {isLoading ?
                <SkeletonTheme baseColor="#ebebeb" highlightColor="#eeaf9d">
                    <div className="container d-flex justify-content-center">
                        <div className="row justify-content-center">
                            {[...Array(7)].map((_, index) => (
                                <div key={index} className="menu-item col-md-2 col-4 d-flex flex-column align-items-center mb-4">
                                    <Skeleton circle={true} height={150} width={150} />
                                    <p className="menu_name mt-2">
                                        <Skeleton width={80} />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </SkeletonTheme>
                :
                <div>
                    <div className="container d-flex justify-content-center">
                        <div className="row justify-content-center">
                            {
                                categories?.categories.map((item, index) => (
                                    <div
                                        onClick={() => setCategory(prev => prev === item._id ? "all" : item._id)}
                                        className="menu-item col-md-2 col-4 d-flex flex-column align-items-center mb-4"
                                        key={index}>
                                        <img className={`img img-fluid ${category === item._id ? "img-active" : ""}`}
                                            src={`${API_ENDPOINTS.getImages}/${item.image}`} alt={"img"} />
                                        <p className={`menu_name mt-2 ${category === item._id ? "text-active" : ""}`}>{item.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }

        </div>

    )
}

export default CategoriesMenu