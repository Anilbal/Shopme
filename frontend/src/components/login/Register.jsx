import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { register } from '../../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const[username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const [success,setSuccess]=useState(false)

    const handleClick=(e)=>{
      e.preventDefault()
      register(username,email,password)
      .then(data=>{
        if(data.error){
          setError(data.error)
          setSuccess(false)
        }else{
          setSuccess(true)
          toast.success("Verification Link has been sent")
          setError("")
        }
      })
    }

    const showError=()=>{
      if(error){
      return <div className='error'>{error}</div>  
      }
    }

  return (
    <>
    <ToastContainer position='top-right'/>
    <div className='login-page'>
        <div className="login-details">
            <h2>Create Your Account</h2>
            {showError()}
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' placeholder='Enter your Username' onChange={(e)=>{
                  setUsername(e.target.value)
                }}/>

                <label htmlFor="email">Email</label>
                <input type="text" id='email' placeholder='Enter your email' onChange={(e)=>{
                  setEmail(e.target.value)}}/>

                <label htmlFor="password">Password</label>
                <input type="text" id='password' placeholder='Enter your Password' onChange={(e)=>{
                  setPassword(e.target.value)
                }}/>
            </form>
            <button className='login-btn' onClick={handleClick}>register</button>
            <p>Already Have account ?<Link to={'/login'}><button>Login here</button></Link></p>
        </div>
    </div>
    </>
  )
}

export default Register  