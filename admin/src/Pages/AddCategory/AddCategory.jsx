import React, { useState } from 'react'
import HeadingTitle from '../../Components/HeadingTitle'
import { assets } from '../../assets/assets'
import Spinner from '../../Components/Spinner/Spinner'
import { toast } from 'react-toastify'
import { useInsertCategoryMutation } from '../../app/Features/middlewares/CategoryAPI'
const AddCategory = () => {
    const [name, setName] = useState("");
    const [InsertCategory, { isLoading }] = useInsertCategoryMutation();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            console.log("image", image)
            setLoading(true)
            const newCategory = new FormData();
            newCategory.append("name", name)
            newCategory.append("description", description)
            newCategory.append("image", image)
            const response = await InsertCategory(newCategory);
            if (response.data.success) {
                toast.success(response.data.message)
                setLoading(false)
                setName("")
                setImage("")
                setDescription("")
            }
            else {
                setLoading(false)
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log("Got error while inserting new Category", error)
        }
        finally {
            setLoading(false)
        }

    }
    if (loading || isLoading) {
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