import React, { useEffect, useState } from 'react'
import { API } from '../config'
import { Link, useParams } from 'react-router-dom'
import { productByCategory } from '../api/productApi'
import '../pageCss/Collection.css'

const MensCollection = () => {
  const [products,setProducts]=useState([])
  const {id}=useParams()
  useEffect(()=>{
    productByCategory(id)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setProducts(data)
      }
    })
  },[])
  console.log(products)
  const productLength=products.length
  // console.log(productLength)

  return (
    <div className='main-collection'>
        <div className="collection-carousel">
        <div className="carousel-titles">
          <h3>Complete the Look</h3>
          <p>From casual essentials to sophisticated formal wear, we offer a diverse range to elevate your style !!</p>
              <h4>Explore the Latest Men's Collection</h4>
            </div>
            <img src="https://images.unsplash.com/photo-1548058475-62837e19ff9c?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image is loading" />
           
        </div>
        <div className="collection-products">
          <div className="collection-title">
          <div className='title-div'>
            <hr className='hor-line'/>
          <h2>Mens Collection</h2>
          </div>
          <p>Total Available Products : {productLength}</p>
          </div>
          <div className="collection-grid">
            {
                products.map((item)=>{
                    return <div className='products-grid' key={item._id}>
                    <Link to={`/product/${item._id}`}>
                    <img src={`${API}/${item.images}`} alt={item.title} />
                    </Link>
                    <div className='products-details'>
                        <h4>{item.title}</h4>
                        <p>Price:{item.price}</p>
                    </div>
                </div>
                })
            }
          </div>
        </div>
    </div>
  )
}

export default MensCollection