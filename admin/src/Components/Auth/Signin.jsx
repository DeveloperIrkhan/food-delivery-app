import React, { useState } from 'react'
import './Auth.css'
import { useSelector } from 'react-redux'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../Components/Spinner/Spinner'
import { toast } from 'react-toastify';
import {
    _token,
    _user,
} from "../../app/Features/Slices/AuthSlice"
import { useSignInMutation, useSignUpMutation } from '../../app/Features/middlewares/AuthAPI'
const Signin = () => {
    const [currentState, setCurrentState] = useState("Login")
    const navigate = useNavigate()
    const [isSignIn] = useSignInMutation();
    const [isSignUp] = useSignUpMutation();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const token = useSelector(_token);

    const HandleSubmitForm = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (currentState === "Login") {
            const signinResponse = await isSignIn({ email, password }).unwrap();
            if (signinResponse.success) {
                setEmail("");
                setPassword("");
                toast.success(signinResponse.message);
                navigate("/home")
            }
            else {
                toast.error(signinResponse.message)
                setLoading(false);
            }
        }
        else {
            console.log(currentState)
            const _userData = new FormData();
            _userData.append('name', username);
            _userData.append('email', email);
            _userData.append('password', password);
            if (image) {
                _userData.append('image', image);
            }
            const signupResponse = await isSignUp(_userData).unwrap();
            if (signupResponse.success) {
                setUsername("");
                setEmail("")
                setPassword("");
                setImage("")
                // dispatch(LoggedInUser(_userData));
                setLoading(false);
                toast.success(signupResponse.message)
                navigate("/home")
            }
            else {
                toast.error(signupResponse.message)
                setLoading(false);
            }
        }
    }


    return (
        <div className='main-container'>
            {loading ? <Spinner /> : <></>}
            {!token ? <>
                <div className="login-popup col-lg-4 col-md-8 col-12 p-md-5 p-4">
                    <form onSubmit={HandleSubmitForm} className="login-popup-container">
                        <div className="login-popup-title">
                            <h3>{currentState}</h3>
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
                </div>
            </>
                :
                <>
                {navigate("/home")}
                </>}
        </div>
    )
}

export default Signin