import React from 'react'
import LowerNavbar from '../components/navbar/LowerNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const Layout = () => {
  return (
    <>
     <LowerNavbar/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default Layout