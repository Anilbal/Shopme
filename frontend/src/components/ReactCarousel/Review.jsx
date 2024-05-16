import React, { useEffect, useState } from 'react'
import './review.css'
import Carousel from 'react-multi-carousel';
import {getLimitedProducts } from '../../api/productApi';
import ReviewCard from './ReviewCard';


const Review = () => {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };

      const [products,setProducts]=useState([])
      const [limit,setLimit]=useState(3)
      useEffect(()=>{
        getLimitedProducts(limit)
        .then(data=>{
          if(data.error){
            console.log(data.error)
          }else{
            setProducts(data)
          }
        })
      },[])
      // const firstProduct=s
  return (
    <>
        <div className="reviews">
        <div className="review_details">
        <h2>LET CUSTOMERS SPEAK FOR US</h2>
        <p>From **** reviews</p> 
            </div> 
        <Carousel responsive={responsive}
        //  infinite={true}
        //  autoPlay={true}
         autoPlaySpeed={6000}
        >
          <div className='review-grid'>
          {products.map((item)=>{
        return <ReviewCard item={item._id} key={item._id}/>
          })}
          </div>
        </Carousel>
      </div>
    </>
  )
}

export default Review