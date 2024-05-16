import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { authenticate, userLogin } from '../../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [success,setSuccess]=useState(false)
  const navigate=useNavigate()

  
  const handleClick=(e)=>{
    e.preventDefault()
    userLogin(email,password)
    .then(data=>{
      if(data.error){
        setError(data.error)
        setSuccess(false)
      }else{
        authenticate(data)
        setSuccess(true)
        navigate('/')
      }
    })
  }

  const showError=()=>{
    if(error){
    return <div className='error'>{error}</div>  
    }
  }

  const showSuccess=()=>{
    if(success){
    return toast.success(success.message)  
    }
  }

  return (
    <div className='login-page'>
      <ToastContainer position='top-right'/>
        <div className="login-details">
            <h2>Log into your Account</h2>
            {showError()}
            {showSuccess()}
            <form>
                <label htmlFor="email">Email</label>
                <input type="text" id='email' placeholder='Enter your email' onChange={(e)=>{
                  setEmail(e.target.value)
                }}/>

                <label htmlFor="password">Password</label>
                <input type="text" id='password' placeholder='Enter your Password' onChange={(e)=>{
                  setPassword(e.target.value)
                }}/>

                <Link to={'/forgetpassword'}> 
                <button className='btn-forget'>Forget Password?</button>
                </Link>
            </form>
            <button className='login-btn' onClick={handleClick}>login</button>
            <p>Doesn't Have account ?<Link to={"/register"}><button>Register here</button></Link></p>
        </div>
    </div>
  )
}

export default Login  