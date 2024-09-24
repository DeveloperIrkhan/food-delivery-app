import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './Components/Layout'
import Cart from './Pages/Cart/Cart'
import './Index.css'
import Home from './Pages/Home/Home'
import Order from './Pages/OurOrders/Order'
import 'react-toastify/dist/ReactToastify.css';
import GoToTopButton from './Components/ScrollingButton/GoToTopButton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  LoggedInUser,
  SetToken
} from './app/features/middleware/Authmiddleware'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie';
function App() {
  // const [showLogin, setShowLogin] = useState(false)
  const dispatch = useDispatch();
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
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
  useEffect(() => {
    const GetUserToken = () => {
      if (localStorage.getItem("user"))
        dispatch(LoggedInUser(JSON.parse(localStorage.getItem("user"))));
      if (accessToken)
        dispatch(SetToken(accessToken));
    };
    GetUserToken();
  }, []);
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
