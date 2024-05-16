import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../config'
import '../../pageCss/cart.css'
import { FaChevronLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { removeFromCart, updateCart } from '../../reducers/cartActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    let cart_items=useSelector(state=>state.cart.cart_items)
    let cart_count=useSelector(state=>state.cart.cart_items.length)
    const dispatch=useDispatch()
    const handleRemove=id=>e=>{
        dispatch(removeFromCart(id))
    }

    const handleDecrease=item=>e=>{
        let quantity=item.quantity
        if(quantity<=1){
            toast.error('Sorry! item cannot be decreased further')
        }else{
            let updateProduct={...item,quantity:quantity-1}
            dispatch(updateCart(updateProduct))
        }
    }

    const handleIncrease=item=>e=>{
        let quantity=item.quantity
        if(quantity>item.stock){
            toast.error('Sorry! Item is Out of stock')
        }else{
            let updateProduct={...item,quantity:quantity+1}
            dispatch(updateCart(updateProduct))
        }
    }


        let individualTotal=cart_items.length>0?cart_items.map(item=>{
            return item.quantity*item.price
        }):[]

        let total_cal=individualTotal.length>0?individualTotal.reduce((acc,cur)=>acc+cur):0

        sessionStorage.setItem('total',total_cal)

        let total=sessionStorage.getItem('total')
  return (
    <div className='cart-main'>
        <ToastContainer position='top-right'/>
        <u>
        <h2>Your Cart (<p>{cart_count} items</p>)</h2>
        </u>{
            cart_count?<>
        <div className="cart-details">
        <table className='cart-table'>
            <thead>
                <tr>
                    <td className='cart-head'>Id</td>
                    <td colSpan={2} className='cart-head'>Product</td>
                    <td className='cart-head'>Price</td>
                    <td className='cart-head'>Quantity</td>
                    <td className='cart-head'>Total</td>
                    <td className='cart-head'>Action</td>
                </tr>
            </thead>
            <tbody>
                {
                    cart_items.map((item,i)=>{
                        return <tr key={item.product}>
                            <td>{i+1}</td>
                            <td>
                                <img src={`${API}/${item.images}`} alt="" className='cart-image'/>
                            </td>
                            <td><h3>{item.title}</h3></td>
                            <td>Rs. {item.price}</td>
                            <td>
                                <button className='cart-btnFn' onClick={handleDecrease(item)}>-</button>
                                {item.quantity}
                                <button className='cart-btnFn' onClick={handleIncrease(item)}>+</button>
                            </td>
                            <td>Rs. {item.price*item.quantity}</td>
                            <td>
                                <button className='cart-remove' onClick={handleRemove(item.product)}>Remove</button>
                            </td>
                        </tr>
                    })
                }
                
            </tbody>
        </table>
        <div className="total-cart">
            <p>Sub Total:- Rs. {total}</p>
            <p>Discount:- Rs.   -</p>
            <hr />
            <p>Grand Total:- Rs. {total}</p>
        </div>
        </div>
        <div className="cart-info">
            <Link to={'/products'}>
            <button className='cart-btn'><FaChevronLeft /> Continue Shopping</button>
            </Link>
            <Link to={'/checkout'}>
            <button className='cart-btn'>Proceed to checkout <FaAngleRight /></button>
            </Link>
        </div>

            </>:<>
            <p style={{padding:"50px",fontSize:"30px",color:"red"}}>No items Available in cart. Please go to products page to add your products !!</p>
            <Link to={'/products'}>
            <button className='cart-button'>Go to Products Page</button>
            </Link>
            </>
        }
    </div>
  )
}

export default Cart