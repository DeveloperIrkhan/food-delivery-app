import React, { useState } from 'react'
import './Auth.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import * as Icon from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoginModal, LoggedInUser, SetToken } from '../../app/features/AuthSlice'
import Spinner from '../../Components/Spinner/Spinner'
import { toast } from 'react-toastify';
const Signin = () => {
  const [currentState, setCurrentState] = useState("Login")
  const dispatch = useDispatch();
  const hideModal = (boolValue) => {
    dispatch(hideLoginModal(boolValue))
  }

  const isModelOpen = useSelector(state => state.authSlice.showLogin)
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const _api_url = "http://localhost:4000/api/userauth"
 
  const HandleSubmitForm = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (currentState === "Login") {
      const _userData = {
        email: email,
        password: password
      }
      const newUrl = _api_url + "/Signin"
      const response = await axios.post(newUrl, _userData)
      if (response.data.success) {
        dispatch(SetToken(response.data.token));
        const existingUser = {
          name: response.data.exsistingUser.name,
          email: response.data.exsistingUser.email,
          image: response.data.exsistingUser.image,
          userRole: response.data.exsistingUser.userRole,
        }
        setLoading(false);
        dispatch(LoggedInUser(existingUser));
        localStorage.setItem("userToken", response.data.token)
        localStorage.setItem("user", JSON.stringify(existingUser));
        localStorage.setItem("user", JSON.stringify(existingUser))
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
      const _userData = new FormData();
      _userData.append('name', username);
      _userData.append('email', email);
      _userData.append('password', password);
      if (image) {
        _userData.append('image', image);
      }
      console.log("request data", _userData)
      const newUrl = _api_url + "/Signup"
      const response = await axios.post(newUrl, _userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.data.success) {
        const newUser = {
          name: response.data.user.name,
          email: response.data.user.email,
          image: response.data.user.image,
          userRole: response.data.user.Role,
        }
        localStorage.setItem("userToken", response.data.token)
        localStorage.setItem("user", JSON.stringify(newUser))
        dispatch(LoggedInUser(newUser));
        dispatch(SetToken(response.data.token));
        setUsername("");
        setEmail("")
        setPassword("");
        setImage("")
        setLoading(false);
        toast.success(response.data.message)
        hideModal(false)
      }
      else {
        toast.error(response.data.message)
        setLoading(false);
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
            {currentState === "Signup" ?
              <div className="d-flex flex-column justify-content-center align-items-center">
                <label htmlFor="image">
                  <img className={`${image ? "upload-selfie-image" : "uploadimg-selfie"}`}
                    src={image ? URL.createObjectURL(image) : assets.UploadImage}
                    alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  name="image"
                  id="image"
                  hidden required />
                <p htmlFor="Image" className='fw-bold text-danger'>Upload Selfie</p>
              </div> :
              <></>}
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
                    type="password"
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