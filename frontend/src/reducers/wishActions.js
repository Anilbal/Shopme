import { getProductsById } from "../api/productApi"
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "./wishConstants"


export const addToWishList=(product_id)=>async(dispatch,getState)=>{
    let  data=await getProductsById(product_id)
    let payload={
        product:data._id,
        title:data.title,
        price:data.price,
        images:data.images,
        stock:data.stock
    }
    dispatch({type:ADD_TO_WISHLIST,payload: payload })
    localStorage.setItem('wishList_items',JSON.stringify(getState().wishlist.wishList_items))
}

export const removeFromWishList=(product_id)=>async(dispatch,getState)=>{
    await dispatch({type: REMOVE_FROM_WISHLIST,payload: product_id})
    localStorage.setItem('wishList_items',JSON.stringify(getState().wishlist.wishList_items))
}