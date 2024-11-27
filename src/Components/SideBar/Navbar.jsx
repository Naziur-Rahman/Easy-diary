import React from 'react'
import { FaRegUser } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className='bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex items-center '>
      <div className='flex justify-between bg-white shadow-md'>
      <input type="text" placeholder="Search your letter" className="input input-bordered w-full max-w-xs" />
        <div className='flex items-center'>
         <h1></h1>
        {/* <FaRegUser /> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
