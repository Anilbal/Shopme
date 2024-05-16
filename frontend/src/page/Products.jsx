import React, { useEffect, useState } from 'react'
import FilterSection from '../components/products/FilterSection'
import Sorting from '../components/products/Sorting'
import {  getFilteredProducts } from '../api/productApi'
const Products = () => {
  let [sortBy,setSortBy]=useState('')
  let [order,setOrder]=useState("asc")
  let [limit,setLimit]=useState(20)
  const [products,setProducts]=useState([])
  const [filter,setFilter]=useState({
    category:[],price:[]
  })
  useEffect(()=>{
    getFilteredProducts(filter,sortBy,limit,order)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setProducts(data)
      }
    })
    .catch(error=>console.log(error))
  },[filter,sortBy,limit])

  const handleFilter=(filters,filterBy)=>{
    setFilter({...filter,[filterBy]:filters})
  }

  const handleSortBy=(e)=>{
    setSortBy(e.target.value)
  }
  const handleOrderBy=(e)=>{
    setOrder(e.target.value)
  }
  return (
    <div className='products-page'>
        <div>
            <FilterSection handleFilter={handleFilter}/>
        </div>
        <div className="product-sort">
            <div className="sort-filter">
                 <Sorting products={products} handleSortBy={handleSortBy} handleOrderBy={handleOrderBy}/>
            </div>
        </div>
    </div>
  )
}

export default Products