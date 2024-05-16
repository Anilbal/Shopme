import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../api/categoryApi";
import { prices } from "./Prices";
import './filterproducts.css'
const FilterSection = ({handleFilter}) => {
  const [category,setCategory]=useState([])
  const [checked,setChecked]=useState([])
  const [price,setPrice]=useState([])


  useEffect(()=>{
    getAllCategories()
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setCategory(data)
      }
    })
  },[])


  const categoryChange=(e)=>{
    let newChecked=[...checked]
    let selected=e.target.value 
    let exists=newChecked.findIndex(item=>item==selected)
    if(exists!==-1){
      newChecked.splice(exists,1)
    }else{
      newChecked.push(selected)
    }
    setChecked(newChecked)
    handleFilter(newChecked,"category")
  }

  const priceChange=(e)=>{
    let selected=e.target.value 
    let searchprice=prices.find(item=>item.id==selected)
    let value=searchprice.value
    setPrice(value)
    handleFilter(value,"price")
    
  }

  return (
    <div className="products-filter">
      <input type="text" name="search" placeholder="Search" />

      <div className="category-filter">
        <u><h2 style={{textTransform:"uppercase"}}>Category</h2></u>
        {
          category.map((item)=>{
            return <form className="category-value" key={item._id}>
            <input type="checkbox" id={item.title} name={item.title} value={item._id} onChange={categoryChange}/>
            <label for={item.title}>{item.title}</label>
            </form>
          })
        }
        </div>


        <div className="price-filter">
          <u><h2>Price</h2></u>
          {
            prices.map((item)=>{
              return  <div className="price-value" key={item.id}>
              <input type="radio" id={item.id} name='price' value={item.id}  onChange={priceChange}/>
                <label htmlFor={item.id}>{item.title}</label>
              </div>
            })
          }
        </div>
        <button>Clear Filter</button>

    </div>
  );
};

export default FilterSection;
