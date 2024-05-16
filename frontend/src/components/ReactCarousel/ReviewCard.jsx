import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { getAllReview } from '../../api/productApi';
const ReviewCard = ({item}) => {
    const [review,setReview]=useState([])
    useEffect(()=>{
        getAllReview(item)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setReview(data)
            }
        })
    },[])
    // console.log(review)
  return (
    <>
    {
        review.length>0 && review.map((item)=>{
            return <div className="review_card" key={item._id}>
            <img src="./images/avatar.jpeg" alt=""/>
             <h4>{item.username}</h4>
             <p>{item.comment}</p>
           <i><CiStar /><CiStar /><CiStar /><CiStar /><CiStar /></i>
           <p> Review Product on:{item.productName}</p>
         </div>
        })
    }
    
    </>
  )
}

export default ReviewCard