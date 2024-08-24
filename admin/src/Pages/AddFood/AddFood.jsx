import React, { useState } from 'react'
import HeadingTitle from '../../Components/HeadingTitle'
import { assets } from '../../assets/assets'
import { useInsertNewFoodMutation } from '../../app/Features/apiSlice'
import Spinner from '../../Components/Spinner/Spinner'
const AddFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  //   category: "salad",
  //   price: ""
  // })

  const [InsertNewFood] = useInsertNewFoodMutation();

  // const onChangeHandler = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setFormData((data) => ({ ...data, [name]: value }))
  // }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const data = new FormData();
      data.append("name", name)
      data.append("description", description)
      data.append("category", category)
      data.append("price", Number(price))
      data.append("image", image)
      await InsertNewFood(data)
      setName("")
      setCategory("salad")
      setDescription("")
      setPrice("")
      setImage(false)
      setLoading(false)
    } catch (error) {
      console.log("Got error while inserting new Food", error)
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
            <div className="add-img-upload flex-col">
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
            <div className="add-product-name flex-col">
              <label className='form-label'>product name</label>
              <input onChange={(e) => { setName(e.target.value) }}
                value={name}
                className='form-control'
                type="text"
                name='name'
                placeholder='type here' />
            </div>
            <div className="add-product-description flex-col">
              <p>product description</p>
              <textarea onChange={(e) => { setDescription(e.target.value) }}
                value={description}
                className='form-control'
                type="text"
                name='description'
                placeholder='write conent here' />
            </div>
            <div className="add-category-price">
              <div className="add-category flex-col">
                <label className='form-label'>Product category</label>
                <select onChange={(e) => { setCategory(e.target.value) }}
                  className='form-control'
                  name={category}
                  id="">
                  <option value="salad">salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cakes">Cakes</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
            </div>
            <div className="add-price flex-col">
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