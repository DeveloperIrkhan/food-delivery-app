import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './Components/Layout'
import Cart from './Pages/Cart/Cart'
import './Index.css'
import Home from './Pages/Home/Home'
import Order from './Pages/OurOrders/Order'
import 'react-toastify/dist/ReactToastify.css';
import GoToTopButton from './Components/ScrollingButton/GoToTopButton'
import Signin from './Pages/Auth/Signin'
function App() {
  // const [showLogin, setShowLogin] = useState(false)
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route path='home' element={<Home />} />
          <Route path='user-cart' element={<Cart />} />
          <Route path='user-orders' element={<Order />} />
        </Route>
      </>
    )
  )
  return (
    <>
      <div>
        <ToastContainer />
        <GoToTopButton />
        <RouterProvider router={routes} />
      </div>
    </>
  )
}

export default App
