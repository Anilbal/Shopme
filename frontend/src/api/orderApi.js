import { API } from "../config"

export const placeOrder=(order)=>{
    return fetch(`${API}/placeorder`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(order)
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}

// get userOrders
export const getUserOrder=(userId)=>{
    return fetch(`${API}/orderbyuser/${userId}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get order by order id
export const getOrderDetails=(orderId)=>{
    return fetch(`${API}/orderdetails/${orderId}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}