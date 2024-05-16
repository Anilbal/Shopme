import React, { useState } from 'react'
import { resetPassword } from '../api/userApi'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResetPassword = () => {
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const [success,setSuccess]=useState(false)
    const {token}=useParams()
    console.log(password)

    const handleClick=(e)=>{
        e.preventDefault()
        resetPassword(password,token)
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
            <h2>Reset Your Password</h2>
            <form>
                <label htmlFor="email">New Password</label>
                <input type="text" id='email' placeholder='Enter your new Password' onChange={(e)=>{
                  setPassword(e.target.value)
                }}/>
            </form>
            <button className='reset-btn' onClick={handleClick}>Reset Password</button>
        </div>
    </div>     
    </>
  )
}

export default ResetPassword