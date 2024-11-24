import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
    <Outlet></Outlet>
    </>
  )
}

export default Layout
