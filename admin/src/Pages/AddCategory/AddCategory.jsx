import React, { useState } from 'react'
import HeadingTitle from '../../Components/HeadingTitle'
import { assets } from '../../assets/assets'
import axios from 'axios'
import Spinner from '../../Components/Spinner/Spinner'
import { toast } from 'react-toastify'
const AddCategory = () => {
    const categoryurl = "http://localhost:4000/api/category/add";
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const data = new FormData();
            data.append("name", name)
            data.append("description", description)
            data.append("price", Number(price))
            data.append("image", image)
            const response = await axios.post(categoryurl, data)
            toast.success(response.data.message)
            setImage(false)
            setLoading(false)
            setName("")
            setDescription("")
            setPrice("")

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
                <HeadingTitle HeadingText={"Add New Category"} />
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

export default AddCategory