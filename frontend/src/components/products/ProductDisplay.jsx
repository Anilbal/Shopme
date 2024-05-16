import React, { useEffect, useState } from "react";
import "./productdisplay.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { addNewReview, getProductsById, getRelatedProducts} from '../../api/productApi'
import {  useParams } from "react-router-dom";
import { API } from "../../config";
import RelatedProducts from "./RelatedProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from "../../api/userApi";
import { addToWishList } from "../../reducers/wishActions";


const ProductDisplay = () => {
    const [product,setProduct]=useState({})
    const [relatedProduct,setRelatedProduct]=useState([])
    const[number,setNumber]=useState(1)
    const [sizes,setSizes]=useState(1)
    const {id}=useParams()
    const [review,setReview]=useState([])
    const [rating,setRating]=useState("")
    const [comment,setComment]=useState('')
    const {token}=isAuthenticated()
    const [updatedReview,setUpdatedReview]=useState(false)
    const dispatch=useDispatch()


    useEffect(()=>{
      getProductsById(id)
      .then(data=>{
        if(data.error){
          console.log(data.error)
        }else{
          setProduct(data)
          setReview(data.reviews)
        }
      })
      getRelatedProducts(id)
      .then(data=>{
        if(data.error){
          console.log(data.error)
        }else{
          setRelatedProduct(data)
        }
      })

    },[id,updatedReview])
    const increase=()=>{
      if(number<1){
        setNumber(1)
      }else{
        setNumber(number+1)
      }
    }
    const decrease=()=>{
      if(number>1){
        setNumber(number-1)
      }else{
        setNumber(1)
      }
    }
    
    const handleToogle=(index)=>{
      setSizes(index)
    }

    const handleAddToCart=()=>{
      dispatch(addToCart(id,1))
    }

    const handleAddToWishlist=()=>{
      dispatch(addToWishList(id))
    }
    const handleRating=(e)=>{
      let newValue=e.target.value
      if(!isNaN(newValue) && newValue>=1 && newValue<=5){
        setRating(newValue)
      }
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      addNewReview(id,token,rating,comment)
      .then(data=>{
          if(data.error){
            setUpdatedReview(false)
              toast.error(data.error)
          }else{
            setUpdatedReview(true)
              toast.success("Review added successfully")
          }   
      })
  }




  return (
    <>
    <ToastContainer position="top-right"/>
    <div className="product-display">
      <div className="image-div">
        <div className="main-images">
          <img src={`${API}/${product.images}`} alt="" className="image_main" />
        </div>
      </div>
      <div className="details">
        <h2>{product.title}</h2>
        <ul>
          <li className="star-btn">
            <FaStar />
          </li>
          <li className="star-btn">
            <FaStar />
          </li>
          <li className="star-btn">
            <FaStar />
          </li>
          <li className="star-btn">
            <FaStar />
          </li>
          <li className="star-btn">
            <FaStarHalfAlt />
          </li>
        </ul>
        <p>Price: Rs.{product.price}</p>
        <p>
          {product.description}
        </p>

        <div className="size-button">
          <h4>Select Size</h4>
          <div className="buttons">
            <button onClick={()=>handleToogle(1)} className={sizes===1?"button-size active":"button-size"}>S</button>
            <button onClick={()=>handleToogle(2)} className={sizes===2?"button-size active":"button-size"}>M</button>
            <button onClick={()=>handleToogle(3)} className={sizes===3?"button-size active":"button-size"}>L</button>
            <button onClick={()=>handleToogle(4)} className={sizes===4?"button-size active":"button-size"}>XL</button>
            <button onClick={()=>handleToogle(5)} className={sizes===5?"button-size active":"button-size"}>XXL</button>
          </div>
        </div>
        <div className="cart-value">
        <button onClick={decrease}>-</button>
        <p>{number}</p>
        <button onClick={increase}>+</button>
        <div className="heart-size" onClick={handleAddToWishlist}><FaHeart /></div>
        </div>
        <button className="add-to-cart" onClick={handleAddToCart}>add to cart</button>
        <hr />
        <div className="new-review">
          <h3>Add Review:</h3>
          <form>
            <label for="rating">Rating</label>
            <input type="number" name="rating" min='1' max='5' placeholder="1" value={rating} id="rating" onChange={handleRating}/>
            <label for="comment">Comment</label>
            <textarea type="text" name="comment" id="comment" onChange={(e)=>setComment(e.target.value)} placeholder="Enter your review here.."/>
          </form>
          <button onClick={handleSubmit}>Add review</button>
        </div>
      </div>
    </div>
    <div className="review">
            <h2>Reviews:</h2>
                {
                  review.length>0 ?(review.map((item)=>{
                    return <div key={item._id}>
                      <div  className="list-review">
                      <div className="review-title">
                      <h4>Reviewed By: {item.username}</h4>
                      <p>Rating:{item.rating}</p>
                      </div>
                      <div className="review-desc">
                      <h4>Product Title:{item.productName}</h4>
                      <p>{item.comment}</p>
                      </div>
                    </div>
                      <hr />
                    </div>
                    
                  })):<p className="none-review">No review yet!!</p>
                }
            </div>
    <div className="related-products">
      <u><h2>Related Products:</h2></u>
      <div className="related-main">

      {
        relatedProduct.length>0?
        relatedProduct.slice(0,4).map((item)=>{
          return <RelatedProducts item={item} key={item._id}/>
        }):
        <p className="related-not">There is not related products Available</p>
      }
      </div>
      
    </div>
    </>
  );
};

export default ProductDisplay;
