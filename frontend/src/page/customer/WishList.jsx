import React from 'react'
import { CiHeart } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import '../../pageCss/WishList.css'
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../config';
import { removeFromWishList } from '../../reducers/wishActions';

const WishList = () => {
  const wishList=useSelector(state=>state.wishlist.wishList_items)

  const dispatch=useDispatch()
  const handleRemove=(id)=>e=>{
    dispatch(removeFromWishList(id))
  }
  return (
    <div className='wishlist'>
        <i><CiHeart /></i>
        <p>My WishList</p>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Product Name</td>
              <td>Product Image</td>
              <td>Unit Price</td>
              <td>Stock Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              wishList.map((item)=>{
                return <tr key={item.product}>
                <td>
                  <button className='wishlist-remove' onClick={handleRemove(item.product)}><MdOutlineDeleteForever /></button>
                </td>
                <td>{item.title}</td>
                <td>
                  <img src={`${API}/${item.images}`} alt={item.title} className='wishList-image' />
                </td>
                <td>Rs. {item.price}</td>
                <td>
                  {item.stock>0?<>in stock</>:<>Out of stock</>}
                </td>
                <td><button className='wishlist-add'>Add To Cart</button></td>
              </tr>
              })
            }
          </tbody>
        </table>
    </div>
  )
}

export default WishList