import React, { useEffect } from 'react'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import Signin from './Components/Auth/Signin'
import AddFood from './Pages/AddFood/AddFood'
import ListFoods from './Pages/ListFoods/ListFoods'
import Orders from './Pages/Orders/Orders'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Cookies from 'js-cookie'
import AddCategory from './Pages/AddCategory/AddCategory'
import { useDispatch } from 'react-redux'
import { SetToken, LoggedInUser } from './app/Features/Slices/AuthSlice'
const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Signin />} />
        <Route path='/home' element={<Layout />}>
          <Route path='add-category' element={<AddCategory />} />
          <Route path='add-food' element={<AddFood />} />
          <Route path='list-food' element={<ListFoods />} />
          <Route path='list-order' element={<Orders />} />
        </Route>
      </>
    )
  )
  const accessToken = Cookies.get('accessToken');
  const dispatch = useDispatch();
  useEffect(() => {
    const GetToken = () => {
      if (localStorage.getItem("user"))
        dispatch(LoggedInUser(JSON.parse(localStorage.getItem("user"))));
      if (accessToken) {
        dispatch(SetToken(accessToken))
      }
    };
    GetToken();
  }, [])
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={routes} />
    </div>
  )
}

export default App