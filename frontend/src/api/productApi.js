import { API } from "../config"

// getting products by category id
export const productByCategory=(id)=>{
    return fetch(`${API}/productbycategory/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// all products

export const allProduct=()=>{
    return fetch(`${API}/allproduct`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// delete products
export const deleteProducts=(id)=>{
    return fetch(`${API}/deleteproduct/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            // "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}


// add products
export const addNewProducts=(token,products)=>{
    return fetch(`${API}/addproduct`,{
        method:"POST",
        headers:{
            // "Content-type":"application/json",
            "Authorization":`Bearer ${token}`,
        },
        body:products
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get products details by id
export const getProductsById=(id)=>{
    return fetch(`${API}/productbyid/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// update products
export const updateProducts=(token,id,products)=>{
    return fetch(`${API}/updateproduct/${id}`,{
        method:"PUT",
        headers:{
            // "Content-type":"application/json",
            "Authorization":`Bearer ${token}`,
        },
        body:products
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get filtered products
export const getFilteredProducts=(filters,sortBy,limit,order)=>{
    return fetch(`${API}/filteredproduct?sortBy=${sortBy}&limit=${limit}&order=${order}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({filters})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get limit products
export const getLimitedProducts=(limit)=>{
    return fetch(`${API}/getlimitproduct?limit=${limit}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get related products
export const getRelatedProducts=(id)=>{
    return fetch(`${API}/getrelatedproducts/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}


// products reviews
export const getAllReview=(id)=>{
    return fetch(`${API}/getallreviews/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// new review
export const addNewReview=(id,token,rating,comment)=>{
    return fetch(`${API}/newreview/${id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({rating,comment})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

//products for carousel
export const productForCarousel=()=>{
    return fetch(`${API}/findbycarousel`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}