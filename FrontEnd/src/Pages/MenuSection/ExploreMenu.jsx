import React, { useEffect } from 'react'
import "./menu.css"
import { useDispatch, useSelector } from 'react-redux'
import { RetriveCategories } from '../../app/features/categorySlice'
import { categories } from '../../DummyAPIdata/categoryAPI'
const ExploreMenu = ({ category, setCategory }) => {
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categoryReducer.foodCategory);
    useEffect(() => {
        dispatch(RetriveCategories(categories))
    }, [dispatch]);



    return (
        <div id='explore-menu' className="d-flex justify-content-center align-items-center flex-column mt-5">
            <h3 className="header-text my-4">Explore Our Delicious Menu</h3>
            <div className="col-md-8 col-12 d-flex text-center flex-column m-auto">
                <p className='paragraph-text'>Our Delicious Menu offers a variety of mouth-watering dishes crafted with the finest ingredients.
                    From savory appetizers to delightful main courses and indulgent desserts, each item is prepared to satisfy your taste buds and leave you craving more.</p>
            </div>
            <div className="container d-flex justify-content-center">
                <div className="row justify-content-center">
                    {
                        categoriesList.map((item, index) => (
                            <div
                                onClick={() => setCategory(prev => prev === item.name ? "all" : item.name)}
                                className="menu-item col-md-2 col-4 d-flex flex-column align-items-center mb-4"
                                key={index}>
                                <img className={`img img-fluid ${category === item.name ? "img-active" : ""}`} 
                                src={item.image} alt={item.menu_name} />
                                <p className={`menu_name mt-2 ${category === item.name ? "text-active" : ""}`}>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default ExploreMenu