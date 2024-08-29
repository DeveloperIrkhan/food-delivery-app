import React, { useState } from 'react'
import './Auth.css'
import * as Icon from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { hideLoginModal } from '../../app/features/AuthSlice'
const Signin = () => {
  const [currentState, setCurrentState] = useState("Signup")
  const dispatch = useDispatch();
  const hideModal = (boolValue) => {
    dispatch(hideLoginModal(boolValue))
  }
  return (
    <div className="login-popup col-md-5 col-10 p-md-5 p-4">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h3>{currentState}</h3>
          <span onClick={() => hideModal(false)} className='cross-button'><Icon.XLg /></span>
        </div>
        <div className="login-popup-input">
          <div class="mb-3">
            {currentState === "Login" ? <></> :
              <>
                <div className="my-2">
                  <label for="name" class="col-form-label">Name</label>
                  <input type="text" class="form-control" id="name" required placeholder='enter your name' />
                </div>
              </>
            }

            <div className="my-2">
              <label for="email" class="col-form-label">Email</label>
              <input type="text" class="form-control" id="email" required placeholder='enter your email' />
            </div>
            <div className="my-2">
              <label for="password" class="col-form-label">Password</label>
              <input type="text" class="form-control" id="password" required placeholder='enter your password' />
            </div>
          </div>
          <div className="row p-0 m-0">
            <button className='btn btn-primary w-50'>
              {currentState === "Signup" ? "Create Account" : "Login"}
            </button>
          </div>
          <div className="row p-0 m-0">
            <div className="d-flex my-3">
              <input type="checkbox" required />
              <p className='mt-3 mx-2'>by continuing, I agree to the term & Conditions</p>
            </div>
            <div className="d-flex">
              {currentState ==="Signup"?
                <>
                  <small className='mt-3 mx-2'>Already have Account? <span className='auth-link'  onClick={()=> setCurrentState("Login")}>SignIn</span></small>
                </>
                :
                <>
                  <small className='mt-3 mx-2'>Create new Account? <span  className='auth-link' onClick={()=> setCurrentState("Signup")}>Signup</span></small>
                </>
              }
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signin