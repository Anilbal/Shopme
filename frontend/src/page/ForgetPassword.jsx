import React, { useState } from 'react'
import { forgetPassword } from '../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pageCss/forgetpassword.css'
const ForgetPassword = () => {
    const [email,setEmail]=useState('')
    const [error,setError]=useState('')
    const [success,setSuccess]=useState(false)

    const handleClick=(e)=>{
        e.preventDefault()
        forgetPassword(email)
        .then(data=>{
            if(data.error){
                setError(data.error)
                toast.error(data.error)
                setSuccess(false)
            }else{
                setSuccess(true)
                toast.success(data.message)
                setError('')
            }
        })
    }

  return (
    <>
         <div className='reset-page'>
      <ToastContainer position='top-right'/>
        <div className="reset-details">
            <h2>Forget Your Password</h2>
            <form>
                <label htmlFor="email">Email</label>
                <input type="text" id='email' placeholder='Enter your email' onChange={(e)=>{
                  setEmail(e.target.value)
                }}/>
            </form>
            <button className='reset-btn' onClick={handleClick}>Reset Password</button>
        </div>
    </div>   
    </>
  )
}

export default ForgetPassword