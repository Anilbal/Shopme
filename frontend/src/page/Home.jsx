import React from 'react'
import Carousel from '../components/Carousel/Carousel'
import HomeProducts from '../components/products/HomeProducts'
import Review from '../components/ReactCarousel/Review'
import FollowBy from '../components/ReactCarousel/FollowBy'


const Home = () => {
  return (
    <>
    <Carousel/>
    <HomeProducts/>
    {/* <Review/> */}
    <FollowBy/>
     </>
  )
}

export default Home