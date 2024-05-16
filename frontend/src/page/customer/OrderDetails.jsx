import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderDetails } from '../../api/orderApi'
import { API } from '../../config'

const OrderDetails = () => {
    let {id}=useParams()
    let [order,setOrder]=useState([])

    useEffect(()=>{
        getOrderDetails(id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setOrder(data)
            }
        })
        .catch(error=>console.log(error))
    },[])
    console.log(order)
  return (
    <>
         <div style={{padding:"50px"}}>
            <h2>Order Details:</h2>
            <div style={{height:"100%",width:"100%",border:"1px solid black",padding:"50px",margin:"20px"}}>
                <h1>Order Id: {order._id}</h1>
                    <h2>Order Items:{
                        order?.orderItems?.map(item=>{
                            return <div key={item._id}>
                            <img src={`${API}/${item.product.images}`} alt="" style={{height:"180px",width:"300px"}}/>
                            <h2>Title: {item.product.title}</h2>
                            <h2>Quantity:{item.quantity}</h2>
                            </div>
                        })
                    }</h2>
            </div>
         </div>
    </>
  )
}

export default OrderDetails