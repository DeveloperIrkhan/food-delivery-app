import React from 'react'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import AddFood from './Pages/AddFood/AddFood'
import ListFoods from './Pages/ListFoods/ListFoods'
import Signup from './Pages/Auth/Signup'
import Signin from './Pages/Auth/Signup'
import Orders from './Pages/Orders/Orders'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route path='add-food' element={<AddFood />} />
          <Route path='list-food' element={<ListFoods />} />
          <Route path='list-order' element={<Orders />} />
        </Route>
        <Route path='Signup' element={<Signup />} />
        <Route path='Signin' element={<Signin />} /></>
    )
  )
  return (
    <div>
      <RouterProvider router={routes} />
      <ToastContainer />
    </div>
  )
}

export default App