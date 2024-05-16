import React, { useEffect, useState } from 'react'
import '../../../pageCss/adminFun.css'
import { getAllCategories } from '../../../api/categoryApi'
import { isAuthenticated } from '../../../api/userApi'
import { useNavigate } from 'react-router-dom'
import {addNewProducts} from '../../../api/productApi'

const AddProducts = () => {
    const [products,setProducts]=useState({
        title:"",
        price:"",
        description:'',
        images:"",
        stock:"",
        sizes:"",
        category:"",
        formData:new FormData

    })
    const [categories,setCategories]=useState([])
    const [error,setError]=useState('')
    const [success,setSuccess]=useState(false)
    let {token}=isAuthenticated()
    console.log(token)
    const navigate=useNavigate()
    useEffect(()=>{
        getAllCategories()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setCategories(data)
            }
        })
    },[])

    let {formData}=products

    const handleChange=(e)=>{
        if(e.target.name==="images"){
            formData.set(e.target.name,e.target.files[0])
        }else{
            setProducts({...products,[e.target.name]:e.target.value})
            formData.set(e.target.name,e.target.value)
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        addNewProducts(token,formData)
        .then(data=>{
            if(data.error){
                setError(data.error)
                setSuccess(false)
            }else{
                setSuccess(true)
                setError('')
            }   
        })
    }

    const showError=()=>{
        if(error){
            return <h2 style={{color:"red"}}>{error}</h2>
        }
    }

    const showSuccess=()=>{
        if(success){
        navigate('/admin/products')
        }
    }

  return (
    <div className='admin-products'>
        {showSuccess()}
        <u>
        <h2>Add New Product :</h2>
        </u>
        <form className='admin-form'>
            <label htmlFor="title">Product Name</label>
            <input type="text" name="title" id="title" placeholder='Enter Product Name' onChange={handleChange}/>

            <label htmlFor="price">Product Price</label>
            <input type="number" name="price" id="price" placeholder='Enter Product Price' onChange={handleChange}/>

            <label htmlFor="images">Product Image</label>
            <input type="file" name="images" id="images" placeholder='Choose Product Image' onChange={handleChange}/>

            <label htmlFor="desc">Product Description</label>
            <textarea name='description' id='desc' onChange={handleChange} className='textarea-admin' placeholder='Write Description here....'/>

            <label htmlFor="stock">Stock</label>
            <input type="number" name="stock" id="stock" placeholder='Enter Number Of Stock' onChange={handleChange}/>

            <label htmlFor="size">Sizes</label>
            <input type="text" name="sizes" id="size" placeholder='Enter sizes available' onChange={handleChange}/>

            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={handleChange} className='select-admin'>
                <option selected disabled>Choose Category</option>
                {
                    categories.map((item)=>{
                        return <option value={item._id} key={item._id}>{item.title}</option>
                    })
                }
            </select>
            {showError()}
        </form>
        <button onClick={handleSubmit}>add product</button>
    </div>
  )
}

export default AddProducts