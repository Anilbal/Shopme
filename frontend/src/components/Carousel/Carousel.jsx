import React, { useEffect, useState } from 'react'
import './carousel.css'
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import { productForCarousel } from '../../api/productApi';
import { API } from '../../config';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides,setSlides]=useState([])
  useEffect(()=>{
    productForCarousel()
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setSlides(data)
      }
    })
  },[])
  const nextSlide=()=>{
    setCurrentSlide(currentSlide===slides.length-1?0:currentSlide+1)
  }

  const prevSlide=()=>{
    setCurrentSlide(currentSlide===0?slides.length-1:currentSlide-1)
  }
  return (
    <div className='carousel-container'>
      {
        slides.map((item,i)=>{
          return <div className={currentSlide===i?"slider":"slider slider-hidden"} key={i}>

          <img src={`${API}/${item.images}`} alt="" className='slides'
          />
          <div className="carousel-details"
              // transition={{duration:0.2,delay:i*2}}
          >
              <motion.h2 
              initial={{opacity:0,translateX:-100}}
              animate={{opacity:1,translateX:0}}
              transition={{duration:1}}
              key={currentSlide}
              
              >{item.title}</motion.h2>
              <motion.p
                initial={{opacity:0,translateX:100}}
                animate={{opacity:1,translateX:0}}
                transition={{duration:0.9}}
              key={item.description[currentSlide]}
              >{item.description}</motion.p>
              <Link to={`/product/${item._id}`}>
              <motion.button
                initial={{opacity:0,translateY:100}}
                animate={{opacity:1,translateY:0}}
                transition={{duration:0.6}}
                key={currentSlide}
              >
                Shop Now
              </motion.button>
                </Link>
          </div>
          <span className='indicators'>
            {
              slides.map((_,i)=>{
                return <button key={i} onClick={()=>setCurrentSlide(i)} className={currentSlide===i?"indicator":"indicator inactive"}></button>
              })
            }
          </span>
          <button className='arrow pre-btn' onClick={prevSlide}><GrFormPrevious /></button>
          <button className='arrow next-btn' onClick={nextSlide}><GrFormNext /></button>
        </div>
        })
      }
      
    </div>
  )
}

export default Carousel