import React, { useEffect } from 'react'
import Spinner from '../../Components/Spinner/Spinner'
import { toast } from 'react-toastify';
import * as Icon from 'react-bootstrap-icons'
import { useGetAllFoodQuery, useRemoveFoodMutation } from '../../app/Features/middlewares/FoodsAPI';
const ListFoods = () => {

  const { data, error, isLoading, refetch } = useGetAllFoodQuery();
  const [removeFood] = useRemoveFoodMutation();
  if (isLoading) return (<div><Spinner /> </div>)
  const deleteEntry = async (id) => {
    try {
      if (isLoading) return (<div><Spinner /> </div>)
      await removeFood(id)
      toast.success(`record is deleted successfully`);
      refetch()
    } catch (error) {
      toast.error(`Error while deleting record`);
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        {data.foods.map((foodItem) => (
          <div key={foodItem._id} className='col-12 col-md-4 mb-4'>
            <div className='card' style={{ width: '100%' }}>
              <img
                className="card-img-top img-thumbnail img-thumbnails"
                src={`http://localhost:4000/images/${foodItem.image}`}
                alt={foodItem.name}
              />
              <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                <p className='card-text'>{foodItem.description}</p>
                <div className='d-flex justify-content-end'>
                  <Icon.Trash className='icon-delete'
                    onClick={() => deleteEntry(foodItem._id)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ListFoods