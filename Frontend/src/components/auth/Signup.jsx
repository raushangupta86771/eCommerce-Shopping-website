import React from 'react'
import "./signup.css"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';


const Signup = () => {
  const [spinner, setSpinner] = React.useState(false);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "", cpassword: "", name: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  const handleSignup = async (e) => {
    setSpinner(true);

    e.preventDefault();
    const response = await fetch('http://localhost:5000/auth/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password, name: credentials.name }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      console.log(json.user._id)
      localStorage.setItem('userId', json.user._id);
      setSpinner(false);
      navigate('/'); //redirecting to "/" endpoint
    }
    else {
      alert("Invalid details")
    }
  }

  const handleLogin = async (e) => {
    setSpinner(true);
    e.preventDefault();
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      // console.log(json.user._id)
      localStorage.setItem('userId', json.user._id);
      setSpinner(false);
      navigate('/');; //redirecting to "/" endpoint
    }
    else {
      setSpinner(false);
      alert("Invalid details")
    }
  }

  return (
    <>
      {
        spinner ? <Spinner /> :
          <div className='Signup'>

            <div className="section">
              <div className="container ad-si">
                <div className="row full-height justify-content-center">
                  <div className="col-12 text-center align-self-center py-5">
                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
                      <Link href="#" className="btn-s mb-3" to="/">Home</Link>
                      <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                      <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                      <label htmlFor="reg-log"></label>
                      <div className="card-3d-wrap mx-auto">
                        <div className="card-3d-wrapper">
                          <div className="card-front">
                            <div className="center-wrap">
                              <div className="section text-center">
                                <h4 className="mb-4 pb-3">Log In</h4>
                                <div className="form-group">
                                  <input type="email" name="email" onChange={handleChange} value={credentials.email} className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                                  <i className="input-icon uil uil-at"></i>
                                </div>
                                <div className="form-group mt-2">
                                  <input type="password" name="password" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" onChange={handleChange} value={credentials.password} />
                                  <i className="input-icon uil uil-lock-alt"></i>
                                </div>
                                <a href="#" className="btn-s mt-4" onClick={handleLogin}>Login</a>
                                <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                              </div>
                            </div>
                          </div>
                          <div className="card-back">
                            <div className="center-wrap">
                              <div className="section text-center">
                                <h4 className="mb-4 pb-3">Sign Up</h4>
                                <div className="form-group">
                                  <input type="text" name="name" className="form-style" onChange={handleChange} value={credentials.name} placeholder="Your Full Name" id="logname" autoComplete="off" />
                                  <i className="input-icon uil uil-user"></i>
                                </div>
                                <div className="form-group mt-2">
                                  <input type="email" name="email" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" onChange={handleChange} value={credentials.email} />
                                  <i className="input-icon uil uil-at"></i>
                                </div>
                                <div className="form-group mt-2">
                                  <input type="password" name="password" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" onChange={handleChange} value={credentials.password} />
                                  <i className="input-icon uil uil-lock-alt"></i>
                                </div>
                                <div className="form-group mt-2">
                                  <input type="password" name="cpassword" className="form-style" placeholder="Confirm Password" id="logpass" autoComplete="off" onChange={handleChange} value={credentials.cpassword} />
                                  <i className="input-icon uil uil-lock-alt"></i>
                                </div>
                                <a href="#" className="btn-s mt-4" onClick={handleSignup}>Create Account</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Signup;