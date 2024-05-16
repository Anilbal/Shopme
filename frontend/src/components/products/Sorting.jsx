import React, { useState } from "react";
import { IoListSharp } from "react-icons/io5";
import { RiLayoutGridFill } from "react-icons/ri";
import './sorting.css'
import { API } from "../../config";
import { Link } from "react-router-dom";


const Sorting = ({products,handleSortBy,handleOrderBy}) => {
  const [view,setView]=useState(true)
  const handleView=()=>{
    setView(!view)
  }

  return (
    <>
      <div className="main-div">
        <div className="icons-section">
          <div className="grid-list">
            <li onClick={()=>handleView(view)} className={view===true?"grid-listBtn active":"grid-listBtn"}>
              <RiLayoutGridFill />
            </li>
            <li onClick={()=>handleView(view)} className={!view===true?"grid-listBtn active":"grid-listBtn"}>
            <IoListSharp />
            </li>
          </div>
          <div className="sort-section">
            <label for="sort">sort by:</label>
            <select name="sort" id="sort" onChange={handleSortBy}>
            <option value={'createdAt'} onChange={handleSortBy}>New Added</option>
              <option value={'price'} onChange={handleSortBy}>Price</option>  
              <option value={'asc'} onChange={handleOrderBy}>A - Z</option>
              <option value={'desc'} onChange={handleOrderBy}>Z- A</option>
            </select>
          </div>
        </div>
        <div className="products-section">
          {
            view===true?<>
              <div className="grid-view">
          {
            products.map((item)=>{
              return <div className="grid-products" key={item._id}>
                <Link to={`/product/${item._id}`}>
              <img src={`${API}/${item.images}`} alt="" />
              </Link>
              <div className="grid-details">
                <h3>{item.title}</h3>
                <p>Price:{item.price}</p>
              </div>
              
            </div>
            })
          }
        </div>
            </>:<>
            <div className="list-view">
          {
            products.map((item)=>{
              return <div className="list-products">
              <img src={`${API}/${item.images}`} alt="" />
              <div className="list-details">
                  <h2>{item.title}</h2>
                  <p>Description: {item.description}</p>
                  <p>Price: {item.price}</p>
                  <Link to={`/product/${item._id}`}>
                  <button>add to cart</button>
                  </Link>
              </div>
            </div>
            })
          }
        </div>
            </>
          }
        
        
      </div>
      </div>

      
    </>
  );
};

export default Sorting;
