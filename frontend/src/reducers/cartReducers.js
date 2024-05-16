import Swal from "sweetalert2"
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO, UPDATE_CART } from "./cartConstants"

const cartReducer=(state={},action)=>{
    switch(action.type){
        case ADD_TO_CART:{
            let new_Product=action.payload
            let itemExits=state.cart_items.find(item=>item.product===new_Product.product)
            if(itemExits){
                Swal.fire({
                    title:"Alert!",
                    text:"Item already in cart. Please go to cart page to see your item",
                    icon:"question"
                })
                return state
            }else{
                Swal.fire('Congrats',"Item added to cart","success")
                return {...state, cart_items:[...state.cart_items, new_Product]}
            }

        }

        case REMOVE_FROM_CART:{
            let product=action.payload
            Swal.fire("Alert","Item is removed from cart","info")
            return {...state, cart_items: state.cart_items.filter(item=>item.product!==product)}
        }

        case EMPTY_CART:{
            Swal.fire("Alert","Cart is empty","info")
            return {...state, cart_items:[]}
        }

        case UPDATE_CART:{
            return {
                ...state,
                cart_items:state.cart_items.map(item=>{
                    return item.product===action.payload.product?action.payload:item
                })
            }
        }

        case SAVE_SHIPPING_INFO:{
            return {...state, shipping_info:action.payload}
        }

        default:{
            return state
        }
    }
}

export default cartReducer