import "./menu.css"
import Spinner from '../../Components/Spinner/Spinner'
import { useGetCategoriesQuery } from "../../app/features/gettingCategories and Fooditems/categorySlice"
import { API_ENDPOINTS } from '../../API EndPoints/API_ENDPOINTS'
const CategoriesMenu = ({ category, setCategory }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery();
    console.log(categories)
    return (
        <div id='explore-menu' className="d-flex justify-content-center align-items-center flex-column mt-5">
            {isLoading ? <Spinner /> : ""}
            <h3 className="header-text my-4">Explore Our Delicious Menu</h3>
            <div className="col-md-8 col-12 d-flex text-center flex-column m-auto">
                <p className='paragraph-text'>Our Delicious Menu offers a variety of mouth-watering dishes crafted with the finest ingredients.
                    From savory appetizers to delightful main courses and indulgent desserts, each item is prepared to satisfy your taste buds and leave you craving more.</p>
            </div>
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

    )
}

export default CategoriesMenu