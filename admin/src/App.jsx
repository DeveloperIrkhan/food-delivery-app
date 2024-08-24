import React from 'react'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import AddFood from './Pages/AddFood/AddFood'
import ListFoods from './Pages/ListFoods/ListFoods'
import Orders from './Pages/Orders/Orders'
const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='add-food' element={<AddFood />} />
        <Route path='list-food' element={<ListFoods />} />
        <Route path='list-order' element={<Orders />} />
      </Route>
    )
  )
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App