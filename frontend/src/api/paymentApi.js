import { API } from "../config"

export const getStripeKey=()=>{
    return fetch(`${API}/getstripekey`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

export const makePayment=(amount)=>{
    return fetch(`${API}/processpayment`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({amount})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}