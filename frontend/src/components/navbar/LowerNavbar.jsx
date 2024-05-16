import React, {  useEffect, useRef, useState } from "react";
import "./lowernavbar.css";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import {  isAuthenticated, logOut } from "../../api/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RiAdminFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { getAllCategories } from "../../api/categoryApi";
import Swal from "sweetalert2"
import { GiHamburgerMenu } from "react-icons/gi";


const LowerNavbar = () => {
  const [success, setSuccess] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);
  const navigate = useNavigate();
  let { user } = isAuthenticated();
  
  let collRef=useRef()
  let profileRef=useRef()
  const redirect = () => {
    if (success) {
      // setSuccess(false)
      navigate("/login");
    }
  };

  let cart_count = useSelector((state) => state.cart.cart_items.length);
  let wishlist_count = useSelector((state) => state.wishlist.wishList_items.length);

  // !chaning navbar bg color while scrolling
  const [bgColor,setBgColor]=useState(false)
  const changeColor=()=>{
    if(window.scrollY>=10){
      setBgColor(true)
    }else{
      setBgColor(false)
    }
  }
  window.addEventListener('scroll',changeColor)


  // category ids 
  const [category,setCategory]=useState([])
  useEffect(()=>{
    getAllCategories()
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setCategory(data)
      }
    })
    
    document.addEventListener('mousedown',(event)=>{
      if(!collRef.current.contains(event.target)){
        setOpenCollection(false)
      }
    })

    document.addEventListener('mousedown',(event)=>{
      if(!profileRef.current.contains(event.target)){
        setOpenProfile(false)
      }
    })
  },[])

  const loggingOut=()=>{
    logOut()
    .then(data => {
      if (data.error) {
        toast.error(data.error)
      } else {
        Swal.fire({
          title:"Logout successfully",
          icon:"Success"
        })
        navigate('/')
      }
    });
  }
  return (
    <>
      <ToastContainer position="top-right" />
      {redirect()}
      <div className={bgColor?"nav-container navbar-bg":"nav-container"}>
          <h2 className="logo">Shop Me</h2>
        <div className={bgColor?"collection collection-color":"collection"} >
          <ul ref={collRef}>
            {/*! home page  */}
          <Link to={"/"} className="react-link">
            <li>
              Home
            </li>
            </Link>

            {/* products page */}
            <Link to={"/products"} className="react-link">
            <li>
              Products
            </li>
            </Link>

            {/* collection page */}
           
            <div className="home-collection"   onClick={()=>setOpenCollection(!openCollection)}>
            <li>
              Collection
            </li>{
              openCollection &&(

                <div className="user-collection">
                  {
                    category.map((item)=>{
                      return <Link to={`/${item.title}/${item._id}`} className="collection-cate" key={item._id}>
                      <span>{item.title}</span>
                    </Link>
                    })
                  }
                       
                      </div>
              )
            }
            </div>

            {/* about us page */}
            <Link to={"/aboutUs"} className="react-link">
            <li>
              About us
            </li>
            </Link>

            {/* contact us page */}
            <Link to={"/contact"} className="react-link">
            <li>
              Contact
            </li>
            </Link>
          </ul>
        </div>
        <div className="items_icons" ref={profileRef}>
          <ul>

            {/* search icons */}
          <li>
              <CiSearch />
            </li>

            <Link to={'/wishlist'}className="react-link">
            <li className="cart">
            <FaHeart />
              <div className={wishlist_count===0?"cart-num cart-none":"cart-num"}>{wishlist_count > 0 && wishlist_count}</div>
            </li>
            </Link>
            
            <Link to={"/cart"} className="react-link">
              <li className="cart">
                <CiShoppingCart />
                <div className={cart_count===0?"cart-num cart-none":"cart-num"}>{cart_count > 0 && cart_count}</div>
              </li>
            </Link>

            {user ?
              <>
              {
                user.role===1?
                <>
                <Link to={'/admin'}>
                <li>
                <RiAdminFill />
                </li>
                </Link>
                </>
                :
                <>
                 <div
                style={{ position: "relative" }}
                onClick={()=>setOpenProfile(!openProfile)}
              >
                  <li>
                    <CiUser />
                  </li>
                  {openProfile && (
                  <div className="userProfile">
                    <Link to={`/userprofile/${user._id}`} className="userprofile-icons">
                      <span>Profile</span>
                    </Link>
                    <Link to={`/useredit/${user._id}`} className="userprofile-icons">
                      <span>Edit Account</span>
                    </Link>
                    
                    <span >
                      <p onClick={loggingOut}>Logout</p>
                    </span>
                  </div>
                )}
              </div>
                </>
              }

              </>:
              <>
                <Link to={"/login"}>
              <li>
              <CiLogout />
              </li>
                </Link>
              </>
            }
          </ul>
        </div>
        <div className="hamburger">
        <GiHamburgerMenu />
        </div>
      </div>
    </>
  );
};

export default LowerNavbar;
