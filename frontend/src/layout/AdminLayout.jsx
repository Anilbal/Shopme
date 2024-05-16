import React from 'react'
import { Outlet } from 'react-router-dom'
import './adminlayout.css'
import AdminSidebar from './AdminSidebar'
const AdminLayout = () => {
  return (
    <div className='adminLayout'>
        <div className="admin-sidebar">
            <AdminSidebar/>
        </div> 
        <div className="admin-outlet">
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout