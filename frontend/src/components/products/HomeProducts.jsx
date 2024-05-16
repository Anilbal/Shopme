import React, { useEffect, useState } from 'react'
import "./homeproducts.css"
import { allProduct, getLimitedProducts } from '../../api/productApi'
import { API } from '../../config'
import { Link } from 'react-router-dom'
const HomeProducts = () => {

    const [products,setProducts]=useState([])
    const [limit,setLimit]=useState(9)
    useEffect(()=>{
        getLimitedProducts(limit)
        .then(data=>{
            setProducts(data)
            // console.log(data)
        })
        .catch(error=>console.log(error))
    },[])
  return (
    <div className='products_home'>
        <div className="items_home">
        <h2>Recommended For You</h2>
        <p>The number of goods in stock is limited</p>
        </div>
        <div className="lists">
            {
                products.map((item)=>{
                    return <div className="products_lists" key={item._id}>
                    <img src={`${API}/${item.images}`} alt={item.title} />
                    <div className="content_list">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <p>Price:{item.price}</p>
                        <Link to={`/product/${item._id}`}>
                        <button>Quick Shop</button>
                        </Link>
                    </div>
                </div>
                })
            }
        </div>
    </div>
  )
}

export default HomeProducts