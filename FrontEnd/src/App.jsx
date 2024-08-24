import React from 'react'
import './App.css'
import Layout from './Components/Layout'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Cart from './Components/ShopingCart/Cart'
import Products from './Components/Products/Products'
import Index from './Components/Home/Index'
import About from './Components/About/About'
const App = () => {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route path='home' element={<Index />} />
        <Route path='products' element={<Products />} />
        <Route path='cart' element={<Cart />} />
        <Route path='about' element={<About />} />
      </Route>
    )
  )

  return (
    <div>
     <RouterProvider router={routes}/>
    </div>
  )
}

export default App