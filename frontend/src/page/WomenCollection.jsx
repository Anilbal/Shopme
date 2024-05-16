import React, { useEffect, useState } from 'react'
import { API } from '../config'
import { Link, useParams } from 'react-router-dom'
import { productByCategory } from '../api/productApi'
import '../pageCss/Collection.css'

const WomenCollection = () => {
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
            <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image is loading" />
            <div className="carousel-title">
              <h3>Trendy Tops</h3>
              <p>Explore our curated selection of the latest trends in women's fashion!!</p>
              <h4>Find the perfect match to your style</h4>
            </div>
        </div>
        <div className="collection-products">
          <div className="collection-title">
          <div className='title-div'>
            <hr className='hor-line'/>
          <h2>Women Collection</h2>
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

export default WomenCollection