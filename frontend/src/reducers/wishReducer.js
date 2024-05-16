import Swal from "sweetalert2"
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "./wishConstants"


const wishReducer=(state={},action)=>{
    switch(action.type){
        case ADD_TO_WISHLIST:{
            let new_wishlist=action.payload
            let itemExits=state.wishList_items.find(item=>item.product===new_wishlist.product)
            if(itemExits){
                Swal.fire({
                    showConfirmButton: false,
                    timer: 1500,
                    icon:"warning",
                    title: "This product is already in your favourite",
                })
                return {...state}
            }else{
                Swal.fire({
                    showConfirmButton: false,
                    timer: 1500,
                    icon:"success",
                    title: "This product added to your favourite list!!",
  
                })
                return {...state,wishList_items:[...state.wishList_items, new_wishlist]}
            }
        }

        case REMOVE_FROM_WISHLIST:{
            let product_wish=action.payload
            Swal.fire("Alert","This product is removed from your wishlist!!","info")
            return {...state, wishList_items: state.wishList_items.filter(item=>item.product!==product_wish)}
        }

        default:{
            return state
        }
    }
}

export default wishReducer