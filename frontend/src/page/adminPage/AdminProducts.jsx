import React, { useEffect, useState } from 'react'
import '../../pageCss/admin.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allProduct, deleteProducts } from '../../api/productApi';
import { API } from '../../config';
import Swal from 'sweetalert2';

export const AdminProducts = () => {
  const [products,setProducts]=useState([])
  const [deletedUpdate,setDeletedUpdate]=useState(false)
  useEffect(()=>{
    allProduct()
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setProducts(data)
      }
    })
  },[deletedUpdate])

  const handleDelete=(id)=>{
    setDeletedUpdate(false)
    Swal.fire({
      title:"Delete Category?",
      text:"Are you sure you want to delete",
      confirmButtonText:"Yes",
      showCancelButton:true,
      cancelButtonColor:"red"
    })
    .then(result=>{
      if(result.isConfirmed){
        deleteProducts(id)
        .then(data=>{
          if(data.error){
            toast.error(data.error)
          }else{
            setDeletedUpdate(true)
            toast.success(data.message)
          }
      })
      }
    }
      
    )
  }
  return (
    <>
    <div className='admin-cat'>
      <ToastContainer position='top-right'/>
        <u><h1>products</h1></u>
        <Link to={'/admin/products/addproducts'}>
        <button className='add-cat'>add new product</button>
        </Link>
        <u><p>existing products</p></u>
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Images</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Sizes Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((item,i)=>{
                return <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <img src={`${API}/${item.images}`} alt={item.title} className='admin-image'/>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.stock}</td>
                    <td>{item.category?.title}</td>
                    <td>{item.sizes}</td>
                    <td>
                      <Link to={`/admin/products/updateproducts/${item._id}`}>
                      <button className='update'>Update</button>
                      </Link>
                      <button className='remove' onClick={()=>handleDelete(item._id)}>Remove</button>
                    </td>
                </tr>
              })
            }
          </tbody>
        </table>
    </div>
    </>
  )
}
