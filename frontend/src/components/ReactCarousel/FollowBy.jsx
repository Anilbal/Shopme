import React from 'react'
import './followby.css'
import { FaInstagram } from "react-icons/fa6";


const FollowBy = () => {
  return (
    <div className='follow_page'>
       <p>#@ Shop By Instagram</p>
       <div className="insta_image">
        <div className="sub_images">
            <img src="./images/mens.jpg" alt="" />
            <i><FaInstagram /></i>
        </div>
        <div className="sub_images">
            <img src="./images/women.jpg" alt="" />
            <i><FaInstagram /></i>

        </div>
        <div className="sub_images">
            <img src="./images/shoes.jpg" alt="" />
            <i><FaInstagram /></i>

        </div>
        <div className="sub_images">
            <img src="./images/mensC.jpg" alt="" />
            <i><FaInstagram /></i>

        </div>
        <div className="sub_images">
            <img src="./images/womenC.jpg" alt="" />
            <i><FaInstagram /></i>

        </div>
        <div className="sub_images">
            <img src="./images/shoes.jpg" alt="" />
            <i><FaInstagram /></i>
        </div>
       </div>
    </div>
  )
}

export default FollowBy