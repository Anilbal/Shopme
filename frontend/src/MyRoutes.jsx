import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Products from './page/Products'
import Checking from './page/Checking'
import Register from './components/login/Register'
import Login from './components/login/Login'
import Emailverification from './page/Emailverification'
import ForgetPassword from './page/ForgetPassword'
import ResetPassword from './page/ResetPassword'
import ProductDisplay from './components/products/ProductDisplay'
import AdminLayout from './layout/AdminLayout'
import AdminDashboard from './page/adminPage/AdminDashboard'
import AdminCategories from './page/adminPage/AdminCategories'
import { AdminProducts } from './page/adminPage/AdminProducts'
import AdminUser from './page/adminPage/AdminUser'
import AdminOrders from './page/adminPage/AdminOrders'
import PageNotFound from './page/PageNotFound'
import AddCategory from './page/adminPage/adminCategory/AddCategory'
import UpdateCategory from './page/adminPage/adminCategory/UpdateCategory'
import AddProducts from './page/adminPage/adminProducts/AddProducts'
import UpdateProducts from './page/adminPage/adminProducts/UpdateProducts'
import AdminRoute from './selectiveRoute/AdminRoute'
import Layout from './layout/Layout'
import CustomerRoute from './selectiveRoute/CustomerRoute'
import Cart from './page/customer/Cart'
import Checkout from './page/customer/Checkout'
import Payment from './page/customer/Payment'
import PaymentSuccess from './page/customer/PaymentSuccess'
import UserProfile from './page/customer/UserProfile'
import OrderDetails from './page/customer/OrderDetails'
import AboutUs from './page/AboutUs'
import ContactUs from './page/ContactUs'
import UserAccountEdit from './page/customer/UserAccountEdit'
import MensCollection from './page/MensCollection'
import WomenCollection from './page/WomenCollection'
import AccessCollection from './page/AccessCollection'
import WishList from './page/customer/WishList'

const MyRoutes = () => {
  return (
    <>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Layout/>}>
        <Route index  element={<Home/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='mens/:id' element={<MensCollection/>}/>
        <Route path='womens/:id' element={<WomenCollection/>}/>
        <Route path='accessories/:id' element={<AccessCollection/>}/>
        <Route path='aboutUs' element={<AboutUs/>}/>
        <Route path='contact' element={<ContactUs/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='verifyemail/:token' element={<Emailverification/>}/>
        <Route path='forgetpassword' element={<ForgetPassword/>}/>
        <Route path='resetpassword/:token' element={<ResetPassword/>}/>
        <Route path='*' element={<PageNotFound/>}/>


        {/* admin only */}
        <Route path='/' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminLayout/>}>
          <Route  index element={<AdminDashboard/>}/>
          {/* for category */}
          <Route  path='categories' element={<AdminCategories/>}/>
          <Route  path='categories/addnewcategory' element={<AddCategory/>}/>
          <Route  path='categories/updatecategory/:id' element={<UpdateCategory/>}/>
          {/* for products */}
          <Route  path='products' element={<AdminProducts/>}/>
          <Route path='products/addproducts' element={<AddProducts/>}/>
          <Route path='products/updateproducts/:id' element={<UpdateProducts/>}/>

          <Route  path='users' element={<AdminUser/>}/>
          <Route  path='orders' element={<AdminOrders/>}/>
        </Route>
        </Route>

        <Route path='/' element={<CustomerRoute/>}>
        <Route path='product/:id' element={<ProductDisplay/>}/>
        <Route path='wishlist' element={<WishList/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='payment' element={<Payment/>}/>
        <Route path='payment/success' element={<PaymentSuccess/>}/>
        <Route path='userprofile/:id' element={<UserProfile/>}/>
        <Route path='order/:id' element={<OrderDetails/>}/>
        <Route path='useredit/:id' element={<UserAccountEdit/>}/>
        </Route>
        </Route>


        <Route path='/check' element={<Checking/>}/>
       </Routes>
       </BrowserRouter> 
    </>
  )
}

export default MyRoutes