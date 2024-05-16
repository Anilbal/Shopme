import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../api/userApi'
import { placeOrder } from '../../api/orderApi'

const PaymentSuccess = () => {
    let {user}=isAuthenticated()
    let shipping_info=JSON.parse(localStorage.getItem("shipping_info"))
    let [error,setError]=useState("")
    let [success,setSuccess]=useState(false)

    useEffect(()=>{
        let order={
            orderItems:JSON.parse(localStorage.getItem('cart_items')),
            user:user._id,
            ...shipping_info,

        }
        placeOrder(order)
        .then(data=>{
            if(data.error){
                setError(true)
                setSuccess(false)
            }else{
                setSuccess(true)
                setError("")
            }
        })
    },[])

    const showError=()=>{
        if(error){
            return <div>{error}</div>
        }
    }

    const showSuccess=()=>{
        if(success){
            return <div>Order Place Successfully..</div>
        }
    }
  return (
    <>
    {showError()}
    {showSuccess()}
    </>
  )
}

export default PaymentSuccess