import React, { useState } from 'react'
import './Auth.css'
import axios from 'axios'
import * as Icon from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoginModal } from '../../app/features/AuthSlice'
import Spinner from '../../Components/Spinner/Spinner'
import { toast, ToastContainer } from 'react-toastify';
const Signin = () => {
  const [currentState, setCurrentState] = useState("Signup")
  const dispatch = useDispatch();
  const hideModal = (boolValue) => {
    dispatch(hideLoginModal(boolValue))
  }
  const isModelOpen = useSelector(state => state.authSlice.showLogin)
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const _api_url = "http://localhost:4000/api/userauth"
  const HandleSubmitForm = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (currentState === "Login") {
      const _userData = {
        username: email,
        password: password
      }
      const newUrl = _api_url + "/Signin"
      const response = await axios.post(newUrl, _userData)
      console.log("info", response.data)
      if (response.data.success) {
        setLoading(false);
        console.log(response);
        setEmail("");
        setPassword("");
        toast.success(response.data.message);
        hideModal(false)
      }
      else {
        toast.error(response.data.message)
        setLoading(false);

      }

    }
    else {
      const _userData = {
        name: username,
        email: email,
        password: password
      }
      const newUrl = _api_url + "/Signup"
      const response = await axios.post(newUrl, _userData)
      if (response.data.success) {
        setLoading(false);
        setUsername("");
        setEmail("")
        setPassword("");
        console.log(response);
        toast.success(response.data.message)
        hideModal(false)
      }
      else {
        toast.error(response.data.message)
      }
    }
  }


  return (
    <>
      {loading ? <Spinner /> : <></>}
      {isModelOpen ? <>
        <div className="login-popup col-md-5 col-10 p-md-5 p-4">
          <form onSubmit={HandleSubmitForm} className="login-popup-container">
            <div className="login-popup-title">
              <h3>{currentState}</h3>
              <span onClick={() => hideModal(false)} className='cross-button'><Icon.XLg /></span>
            </div>
            <div className="login-popup-input">
              <div className="mb-3">
                {currentState === "Login" ? <></> :
                  <>
                    <div className="my-2">
                      <label htmlFor="name" className="col-form-label">Name</label>
                      <input name='name'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        placeholder='enter your name' />
                    </div>
                  </>
                }

                <div className="my-2">
                  <label htmlFor="email" className="col-form-label">Email</label>
                  <input name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    placeholder='enter your email' />
                </div>
                <div className="my-2">
                  <label htmlFor="password" className="col-form-label">Password</label>
                  <input name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="text"
                    className="form-control"
                    id="password"
                    required
                    placeholder='enter your password' />
                </div>
              </div>
              <div className="row p-0 m-0">
                <button type='submit' className='btn btn-primary w-50'>
                  {currentState === "Signup" ? "Create Account" : "Login"}
                </button>
              </div>
              <div className="row p-0 m-0">
                <div className="d-flex my-3">
                  <input id='term' name='term' type="checkbox" required />
                  <label htmlFor='term' className='mx-2'>by continuing, I agree to the term & Conditions</label>
                </div>
                <div className="d-flex">
                  {currentState === "Signup" ?
                    <>
                      <small className='mt-3 mx-2'>Already have Account? <span className='auth-link' onClick={() => setCurrentState("Login")}>SignIn</span></small>
                    </>
                    :
                    <>
                      <small className='mt-3 mx-2'>Create new Account? <span className='auth-link' onClick={() => setCurrentState("Signup")}>Signup</span></small>
                    </>
                  }
                </div>
              </div>
            </div>
          </form>
        </div></> : <></>}

    </>
  )
}

export default Signin