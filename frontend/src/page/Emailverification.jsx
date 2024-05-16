import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pageCss/emailverify.css'
const Emailverification = () => {
    let params=useParams()
    let token=params.token
    const [error,setError]=useState('')
    const [success,setSuccess]=useState(false)

    useEffect(()=>{
        verifyEmail(token)
        .then(data=>{
            if(data.error){
                setError(data.error)
                toast.error(data.error)
                setSuccess(false)
            }else{
                setSuccess(data.message)
                toast.success(data.message)
                setError('')
            }
        })
        .catch(error=>console.log(error))
    },[])

    const showError=()=>{
        if(error){
        return <div className='error'>{error}</div>  
        }
      }

    const showSuccess=()=>{
        if(success){
        return <div className='success'>{success}</div>  
        }
      }
  return (
    <>
        <ToastContainer position='top-right'/>
        <div className='email_verify'>
            <div className="main-verify">
                <h2>Welcome to Shop Me </h2>
                <hr />
                <h3>{success?showSuccess():showError()}</h3>
                <Link to={'/login'}>
                <button className='btn-verify'>Go to Login page</button>
                </Link>
            </div>
        </div>
    </>
   
  )
}

export default Emailverification