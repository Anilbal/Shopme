import React, { useEffect, useRef, useState } from 'react'
import { addNewProducts, getProductsById, updateProducts } from '../../../api/productApi'
import { useNavigate, useParams } from 'react-router-dom'
import { isAuthenticated } from '../../../api/userApi'
import { getAllCategories } from '../../../api/categoryApi'
import { API } from '../../../config'

const UpdateProducts = () => {
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
    let {id}=useParams()
    const [categories,setCategories]=useState([])
    const [error,setError]=useState('')
    const [success,setSuccess]=useState(false)
    let {token}=isAuthenticated()
    let category_ref=useRef()
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
        getProductsById(id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setProducts({...products, ...data})
                category_ref.current.value=data.category?._id 
                // console.log(data)
            }
        })
    },[])

    let {formData,title,price,description,stock,sizes,images,category}=products

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
        updateProducts(token,id,formData)
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
    <h2>Update Product :</h2>
    </u>
    <form className='admin-form'>
        <label htmlFor="title">Product Name</label>
        <input type="text" name="title" id="title" placeholder='Enter Product Name' onChange={handleChange}
        value={title}/>

        <label htmlFor="price">Product Price</label>
        <input type="number" name="price" id="price" placeholder='Enter Product Price' onChange={handleChange} value={price}/>

        <label htmlFor="images">Product Image</label>
        <img src={`${API}/${images}`} alt="" className='update-image'/>
        <input type="file" name="images" id="images" placeholder='Choose Product Image' onChange={handleChange} />

        <label htmlFor="desc">Product Description</label>
        <textarea name='description' id='desc' onChange={handleChange} className='textarea-admin' placeholder='Write Description here....' value={description}/>

        <label htmlFor="stock">Stock</label>
        <input type="number" name="stock" id="stock" placeholder='Enter Number Of Stock' onChange={handleChange} value={stock}/>

        <label htmlFor="size">Sizes</label>
        <input type="text" name="sizes" id="size" placeholder='Enter sizes available' onChange={handleChange} value={sizes}/>

        <label htmlFor="category">Category</label>
        <select name="category" id="category" onChange={handleChange} className='select-admin' ref={category_ref}>
            <option selected disabled>Choose Category</option>
            {
                categories.map((item)=>{
                    return <option value={item._id} key={item._id}>{item.title}</option>
                })
            }
        </select>
        {showError()}
    </form>
    <button onClick={handleSubmit}>update product</button>
</div>
  )
}

export default UpdateProducts