import React, { useEffect, useState } from 'react'
import '../../pageCss/userprofile.css'
import { getSingleUser, updateUser } from '../../api/userApi'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UserAccountEdit = () => {

  const [getData,setGetData]=useState({
    username:"",
    email:"",
  })
  const [dataUpdated,setDataUpdated]=useState(false)
   
  const {id}=useParams()
  useEffect(()=>{
    getSingleUser(id)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
      }else{
        setGetData(data)
      }
    })
    .catch(error=>console.log(error))
  },[])

  const handleChange=(e)=>{
    let name=e.target.name
    let value=e.target.value
    setGetData({
      ...getData,[name]:value
    })
  }
  let {username,email}=getData
  const handleCLick=(e)=>{
    e.preventDefault()
    updateUser(username,email,id)
    .then(data=>{
      if(data.error){
        toast.error(data.error)
      }else{
        setDataUpdated(true)
        toast.success("User data updated successfully!")
      }
    })
    .catch(error=>console.log(error))
  }
  return (
    <div className='user-Profile'>
      <ToastContainer position='top-right'/>
        <div className="update-profile">
            <h2>Update Profile</h2>
            <form className='user-form'>
              <div className="user-formUpdate">
                <label htmlFor="username">Username</label>
                <input type="text" placeholder='New username'id="username" name='username' value={getData.username} onChange={handleChange} required/>
              </div>

              <div className="user-formUpdate">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder='Email' id='email' name='email' value={getData.email} onChange={handleChange} required/>
              </div>
            </form>
            <button onClick={handleCLick}>Save</button>
            <div className="reset-button">
              <p>Do you want to reset your password?</p>
              <Link to={'/forgetpassword'}>
              <button>Reset here!</button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default UserAccountEdit