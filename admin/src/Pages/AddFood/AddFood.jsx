import { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import HeadingTitle from '../../Components/HeadingTitle'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { useGetAllCategoriesQuery } from "../../app/Features/middlewares/CategoryAPI";
import { useInsertNewFoodMutation } from "../../app/Features/middlewares/FoodsAPI";
const AddFood = () => {
  const [name, setName] = useState("");
  const [Loading, setLoading] = useState(false)
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState([]);
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  const [isNewFood] = useInsertNewFoodMutation()
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const newFood = new FormData();
      newFood.append("name", name)
      newFood.append("description", description)
      newFood.append("price", Number(price))
      newFood.append("image", image)
      newFood.append("category", category)
      const response = await isNewFood(newFood);
      setImage("")
      setName("")
      setDescription("")
      setPrice("")
      if (response.data.success) {
        toast.success(response.data.message)
      }
      else {
        toast.success(response.data.message)
      }

    } catch (error) {
      toast.error(error)
      console.log("Got error while inserting new Food", error)
    }
    finally {
      setLoading(false)
    }
  }
  if (isLoading || Loading) {
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
            {!isLoading && <div className="add-category-price">
              <div className="add-category flex-col mt-3">
                <label className='form-label'>Product category</label>
                <select
                  placeholder="Select a cetegory"
                  onChange={(e) => { setCategory(e.target.value) }}
                  className='form-control'
                  id="">
                  {categories?.categories.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>}
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