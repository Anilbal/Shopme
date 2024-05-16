import React, { useEffect, useState } from 'react'
import { API } from '../config'
import { useParams } from 'react-router-dom'
import { productByCategory } from '../api/productApi'
import '../pageCss/Collection.css'

const AccessCollection = () => {
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
        <div className="collection-shoes">
            <div className="carousel-shoes">
              <h3>New Arrivals</h3>
              <p>Comfortable Wears</p>
            </div>
            <div className="image-shoes">
            <img src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image is loading" className='image-one'/>
            <img src="https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image is loading" className='image-two'/>
            <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image is loading" className='image-one'/>
            </div>
        </div>
        <div className="collection-products">
          <div className="collection-title">
          <div className='title-div'>
            <hr className='hor-line'/>
          <h2>Accessories Collection</h2>
          </div>
          <p>Total Available Products : {productLength}</p>
          </div>
          <div className="collection-grid">
            {
                products.map((item)=>{
                    return <div className='products-grid' key={item._id}>
                    <img src={`${API}/${item.images}`} alt={item.title} />
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

export default AccessCollection