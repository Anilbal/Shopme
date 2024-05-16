import React, { useState } from "react";
import "../../../pageCss/adminFun.css";
import { addCategory } from "../../../api/categoryApi";
import { isAuthenticated } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  let { token } = isAuthenticated();
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(category, token).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setSuccess(true);
        setError("");
      }
    });
  };

  const showError = () => {
    if (error) {
      return <div>{error}</div>;
    }
  };
  const showSuccess = () => {
    if (success) {
      navigate('/admin/categories')
    }
  };
  return (
    <div className="add-category">
      {showSuccess()}
      <u>
        <h2>adding new category </h2>
      </u>

      <form className="admin-addCat">
        <label htmlFor="add-cat">new category name</label>
        <input
          type="text"
          id="add-cat"
          placeholder="Enter new category name"
          onChange={(e) => setCategory(e.target.value)}
        />
      </form>
      <p>{showError()}</p>
      <button onClick={handleSubmit}>Add new category</button>
    </div>
  );
};

export default AddCategory;
