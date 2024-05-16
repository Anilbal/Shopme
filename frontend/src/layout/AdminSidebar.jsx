import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './adminsidebar.css'
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { HiMiniUsers } from "react-icons/hi2";
import { MdContentPasteSearch } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiSolidLogInCircle } from "react-icons/bi";
import Swal from 'sweetalert2';
import { logOut } from '../api/userApi';


const AdminSidebar = () => {
    const [active,setActive]=useState('dashboard')

    const activeDashboard=(i)=>{
        setActive(i)
    }

    const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const loggingOut = () => {
    logOut()
    .then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setSuccess(true);
      }
    })
  }

  const redirect = () => {
    if (success) {
        Swal.fire({
            title: "Are you sure?",
            text: "You want  to logout this account!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Logout!",
                text: "Your acoount has been logout!!",
                icon: "success"
              })
              navigate('/')
            }
          });
    }
  };
  return (
    <div className='sidebar'>
      {redirect()}
       <div className="sidebar-dashboard">
         <p>home</p>
         
         <div className={active==="dashboard"?"icons-admin active-admin":"icons-admin"} onClick={()=>activeDashboard('dashboard')}>
         <i><FaHome /></i>
        <li><Link to='/admin' className={active==="dashboard"?"link-text active":"link-text"}>Dashboard</Link></li>
         </div>
        
       </div>
        <div className="sidebar-components">
            <p>pages</p>
            <div className="sidebar-pages">
                <div onClick={()=>activeDashboard('categories')} className={active==="categories"?"icons-admin active-admin":"icons-admin"}>
                <i><BiSolidCategory /></i>
                <li><Link to={'/admin/categories'} className={active==="categories"?"link-text active":"link-text"}>Categories</Link></li>
                </div>
  
                <div onClick={()=>activeDashboard('products')} className={active==="products"?"icons-admin active-admin":"icons-admin"}>
                <i><MdContentPasteSearch /></i>
                <li><Link to={'/admin/products'} className={active==="products"?"link-text active":"link-text"}>Products</Link></li>
                </div>

                <div onClick={()=>activeDashboard('users')} className={active==="users"?"icons-admin active-admin":"icons-admin"}>
                <i><HiMiniUsers /></i>
                <li><Link to={'/admin/users'} className={active==="users"?"link-text active":"link-text"}>Users</Link></li>
                </div>

                <div onClick={()=>activeDashboard('orders')} className={active==="orders"?"icons-admin active-admin":"icons-admin"}>
                <i><BsFillCartCheckFill /></i>
                <li><Link to={'/admin/orders'} className={active==="orders"?"link-text active":"link-text"}>Orders</Link></li>
                </div>

                <div onClick={()=>loggingOut()} className='icons-admin' style={{cursor:"pointer"}}>
                <i><BiSolidLogInCircle /></i>
                <li className={active==="logout"?"link-text active":"link-text"}>Logout</li>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminSidebar