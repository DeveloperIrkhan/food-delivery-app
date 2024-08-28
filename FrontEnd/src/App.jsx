import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './Components/Layout'
import Signup from './Pages/Auth/Signup'
import Signin from './Pages/Auth/Signup'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import './Index.css'
import ExploreMenu from './Pages/MenuSection/ExploreMenu'
import Home from './Pages/Home/Home'
function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route path='home' element={<Home />} />
          <Route path='user-cart' element={<Cart />} />
          <Route path='place-Order' element={<PlaceOrder />} />
          <Route path='explore-menu' element={<ExploreMenu />} />
        </Route>
        <Route path='Signup' element={<Signup />} />
        <Route path='Signin' element={<Signin />} />
      </>
    )
  )
  return (
    <>
      <div>
        <RouterProvider router={routes} />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
