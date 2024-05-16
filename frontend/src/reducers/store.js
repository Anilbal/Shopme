import { applyMiddleware, combineReducers, createStore } from "redux";
import cartReducer from "./cartReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import wishReducer from "./wishReducer";

const rootReducer=combineReducers({
    cart:cartReducer,
    wishlist:wishReducer
})

const initialData={
    cart:{
        cart_items:localStorage.getItem('cart_items')?JSON.parse(localStorage.getItem('cart_items')):[],
        shipping_info:localStorage.getItem('shipping_info')?JSON.parse(localStorage.getItem('shipping_info')):{}
    },
    wishlist:{
        wishList_items:localStorage.getItem('wishList_items')?JSON.parse(localStorage.getItem('wishList_items')):[],
    }
}

const middleware=[thunk]

export const store=createStore(rootReducer,initialData,composeWithDevTools(applyMiddleware(...middleware)))