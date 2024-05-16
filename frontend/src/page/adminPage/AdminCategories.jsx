import React, { useEffect, useState } from 'react'
import { deleteCategory, getAllCategories } from '../../api/categoryApi'
import '../../pageCss/admin.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCategories = () => {
  let [category,setCategory]=useState([])
  const [categoryUpdated,setCategoryUpdated]=useState(false)

  useEffect(()=>{
    getAllCategories()
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setCategory(data)
      }
    })
  },[categoryUpdated])

  const handleDelete=id=>{
    setCategoryUpdated(false)
    Swal.fire({
      title:"Delete Category",
      text:"Are you sure you want to delete this category",
      icon:"question",
      showCancelButton:true,
      confirmButtonText:"Yes",
      cancelButtonText:"No",
      cancelButtonColor:"red"
    })
    .then(result=>{
      if(result.isConfirmed)
      {
        deleteCategory(id)
        .then(data=>{
          if(data.error){
            toast.error(data.error)   
          }else{
            setCategoryUpdated(true)
           toast.success('Category Deleted Successfully')
          }
        })
      }
    })
  }
  return (
    <div className='admin-cat'>
      <ToastContainer position='top-right'/>
        <u><h1>categories</h1></u>
        <Link to={'/admin/categories/addnewcategory'}>
        <button className='add-cat'>add new category</button>
        </Link>
        <u><p>existing Category</p></u>
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              category.map((item,i)=>{
                return <tr key={i}>
                    <td>{i+1}</td>
                    <td className='admin-title'>{item.title}</td>
                    <td>
                      <Link to={`/admin/categories/updatecategory/${item._id}`}>
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
  )
}

export default AdminCategories