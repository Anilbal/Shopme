import React from 'react'
import { API } from '../../config'
import './relatedproducts.css'
import { Link } from 'react-router-dom'

const RelatedProducts = ({item}) => {
  return (
    <> 
        <div className="related-product" key={item._id}>
            <Link to={`/product/${item._id}`}>
              <img src={`${API}/${item.images}`} alt="" />
              </Link>
              <div className="related-details">
                <h3>{item.title}</h3>
                <p><b>Price: </b>Rs.{item.price}</p>
              </div>
            
            </div>
    </>
  )
}

export default RelatedProducts