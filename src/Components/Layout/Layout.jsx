import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../SideBar/Navbar'
const Layout = () => {
  return (
    <>
    <SideBar></SideBar>
    <Outlet></Outlet>
    </>
  )
}

export default Layout
