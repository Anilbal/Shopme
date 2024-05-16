import {API} from "../config"

// get all category
export const getAllCategories=()=>{
    return fetch(`${API}/allcategory`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}


// adding new category
export const addCategory=(title,token)=>{
    return fetch(`${API}/addcategory`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({title})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get category details by id
export const getCategoryDetailsById=(id)=>{
    return fetch(`${API}/categorybyid/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}
//update category
export const updateCategory=(title,id)=>{
    return fetch(`${API}/updatecategory/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            // "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({title})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// delete category
export const deleteCategory=(id)=>{
    return fetch(`${API}/deletecategory/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            // "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}