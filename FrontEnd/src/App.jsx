import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './Components/Layout'
import Cart from './Pages/Cart/Cart'
import './Index.css'
import ExploreMenu from './Pages/MenuSection/ExploreMenu'
import Home from './Pages/Home/Home'
import GoToTopButton from './Components/ScrollingButton/GoToTopButton'
function App() {
  // const [showLogin, setShowLogin] = useState(false)
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route path='home' element={<Home />} />
          <Route path='user-cart' element={<Cart />} />
          <Route path='explore-menu' element={<ExploreMenu />} />
        </Route>
      </>
    )
  )
  return (
    <>
      <div>
        <GoToTopButton />
        <RouterProvider router={routes} />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
