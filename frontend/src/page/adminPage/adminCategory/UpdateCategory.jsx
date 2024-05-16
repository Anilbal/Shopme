import React, { useEffect, useState } from "react";
import "../../../pageCss/adminFun.css";
import { useParams } from "react-router-dom";
import { getCategoryDetailsById, updateCategory } from "../../../api/categoryApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdateCategory = () => {
  const [category, setCategory] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { id } = useParams();


  useEffect(()=>{
    getCategoryDetailsById(id)
    .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
            setCategory(data.title)
        }
      })
  },[id])
  const handleSubmit = (e) => {
    e.preventDefault()
    updateCategory(category, id)
    .then((data) => {
      if (data.error) {
        setError(data.error)
        setSuccess(false)
      } else {
        setSuccess(true)
        setError("")
      }
    })
  }

  const showError = () => {
    if (error) {
      return <div>{error}</div>
    }
  };
  const showSuccess = () => {
    if (success) {
      toast.success("Category updated successfully")
    }
  };
  return (
    <div className="add-category">
      <ToastContainer position="top-right" />
      {showSuccess()}
      <u>
        <h2>updating category details </h2>
      </u>

      <form className="admin-addCat">
        <label htmlFor="add-cat">new category name</label>
        <input
          type="text"
          id="add-cat"
          placeholder="Enter new category name"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
      </form>
      <p>{showError()}</p>
      <button onClick={handleSubmit}>update category</button>
    </div>
  )
}

export default UpdateCategory;
