import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import HeadingTitle from '../../Components/HeadingTitle'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { getAllCategories } from '../../app/Features/CategortySlice'
const AddFood = () => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const categoriesList = useSelector(state => state.CategorySlice.getAllCategories);
  const fetchCategories = async () => {
    try {
      setLoading(true)
      const categoriesResp = await axios.get("http://localhost:4000/api/category/get-all-categories")
      if (categoriesResp.data.success) {
        setLoading(false)
        setCategories(categoriesResp.data.categories)
      }
    } catch (error) {
      toast.error(categoriesResp.data.message)
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const data = new FormData();
      data.append("name", name)
      data.append("description", description)
      data.append("price", Number(price))
      data.append("image", image)
      data.append("category", category)
      const response = await axios.post("http://localhost:4000/api/food/add", data)
      if (response.data.success) {
        toast.success(response.data.message)
      }
      else {
        toast.error(response.data.message)
      }
      setImage(false)
      setLoading(false)
      setName("")
      setDescription("")
      setPrice("")
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
      console.log("Got error while inserting new Food", error.message)
    }
  }
  if (loading) {
    return (<div>
      <Spinner />
    </div>)
  }
  return (
    <>
      <div className='container'>
        <HeadingTitle HeadingText={"Add New Food"} />
      </div>
      <div className="add">
        <form action="" className="col-flex" onSubmit={submitForm}>
          <div className="form-group">
            <div className="add-img-upload flex-col mt-3">
              <label className='form-label'>Upload Image</label>
              <label htmlFor="image">
                <img className={`${image ? "upload-food-image" : "uploadimg"}`}
                  src={image ? URL.createObjectURL(image) : assets.UploadImage}
                  alt="" />
              </label>
              <input onChange={(e) => setImage(e.target.files[0])}
                type="file"
                name="image"
                id="image"
                hidden required />
            </div>
            <div className="add-product-name flex-col mt-3">
              <label className='form-label'>Food Name</label>
              <input onChange={(e) => { setName(e.target.value) }}
                value={name}
                className='form-control'
                type="text"
                name='name'
                placeholder='type here' />
            </div>
            <div className="add-product-description flex-col mt-3">
              <label className="form-label">Description</label>
              <textarea onChange={(e) => { setDescription(e.target.value) }}
                value={description}
                className='form-control'
                type="text"
                name='description'
                placeholder='write conent here' />
            </div>
            <div className="add-category-price">
              <div className="add-category flex-col mt-3">
                <label className='form-label'>Product category</label>
                <select
                  placeholder="Select a cetegory"
                  onChange={(e) => { setCategory(e.target.value) }}
                  className='form-control'
                  id="">
                  {categories.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="add-price flex-col mt-3">
              <label
                className='form-label'>Product Price</label>
              <input className='form-control'
                onChange={(e) => { setPrice(e.target.value) }}
                value={price} type="text"
                name='price'
                placeholder='$20' />
            </div>
            <div className="button-area">
              <button className="my-3 btn btn-success" type='submit'>Add Food</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddFood