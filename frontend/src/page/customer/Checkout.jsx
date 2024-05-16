import React, { useReducer } from 'react'
import '../../pageCss/checkout.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../reducers/cartActions'
const Checkout = () => {
    let cart_items=useSelector(state=>state.cart.cart_items)

    let individualTotal=cart_items.length>0?cart_items.map(item=>{
        return item.quantity*item.price
    }):[]

    let total_cal=individualTotal.length>0?individualTotal.reduce((acc,cur)=>acc+cur):0

    sessionStorage.setItem('total',total_cal)

    let total=sessionStorage.getItem('total')

    const personReducer=(state,e)=>{
         return {...state, [e.target.name]: e.target.value}
    }
    let [receiver,setReceiver]=useReducer(personReducer,
        localStorage.getItem('shipping_info')?JSON.parse(localStorage.getItem('shipping_info')):{})
        

    let {contact_person,street,city,postal_code,state,country,phone}=receiver
    const dispatch=useDispatch()
    const handleShippingInfo=()=>{
        dispatch(saveShippingInfo(receiver))
    }
  return (  
    <div className='checkout'>
        <div className="order_summary">
            <div className="order-view">
                <u>
                <h3>Order Summary:</h3>
                </u>
                <Link to={'/cart'}>
                <button>Edit Cart</button>
                </Link>
            </div>
            {
                cart_items.map((item,i)=>{
                    return <div className="order-details">
                    <h2>Title :- <p>{item.title}</p></h2>
                    <h2>Quantity: <p>{item.quantity}</p></h2>
                    <p>Rs. {item.price*item.quantity}</p>
                </div>
                })
            }
            
            <hr style={{color:"gray"}}/>
            <div className="order-details">
                <h2>Order Total</h2>
                <p>{total}</p>
            </div>
        </div>
        <hr style={{border:"1px solid black"}}/>
        <div className="shipping-info">
            <u>
            <h2>Receiver Info:</h2>
            </u>
            <form className='shipping-form'>
                <div className="shipping-details">
                <label htmlFor="contact">Full Name:</label>
                <input type="text" name='contact_person' id='contact' placeholder='Please enter your full name' onChange={setReceiver} required value={contact_person}/>
                </div>

                <div className="shipping-details">
                <label htmlFor="street">Street:</label>
                <input type="text" name='street' id='street' placeholder='Name your street here...' onChange={setReceiver} value={street} required />
                </div>
                    
                <div className="city-info">
                <div className="shipping-details"> 
                <label htmlFor="city">City:</label>
                <input type="text" name='city' id='city' placeholder='Place your city here..'onChange={setReceiver} value={city}required/>
                </div>

                <div className="shipping-details">   
                <label htmlFor="postal_code">Postal Code:</label>
                <input type="text" name='postal_code' id='postal_code' placeholder='Please enter postal code..' onChange={setReceiver} value={postal_code} required/>
                </div>
                </div>

                <div className="shipping-details">   
                <label htmlFor="State">State:</label>
                <input type="text" name='state' id='state' placeholder='Please enter your state..' onChange={setReceiver} value={state} required/>
                </div>

                <div className="shipping-details">    
                <label htmlFor="country">Country:</label>
                <input type="text" name='country' id='country' placeholder='Please enter your country name..'onChange={setReceiver} value={country} required/>
                </div>
                 
                <div className="shipping-details">  
                <label htmlFor="phone">Phone:</label>
                <input type="text" name='phone' id='phone' placeholder='Please enter your phone number' onChange={setReceiver} value={phone} required/>
                </div>
            </form>
            <Link to={'/payment'}>
            <button onClick={handleShippingInfo} className='proceed-btn'>Proceed To Payment</button>
            </Link>
        </div>
    </div>
  )
}

export default Checkout