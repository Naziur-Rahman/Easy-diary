
import logo from "../../assets/images/easy-diary.png"
import { NavLink } from 'react-router-dom'
import { FaTachometerAlt } from 'react-icons/fa'
import { IoIosNotifications } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaPen } from "react-icons/fa";
const SideBar = () => {
  return (
    <div className=
    'bg-gray-100 text-gray-900 px-4 fixed w-16 md:w-64 border-r border-gray-300 h-screen'>
      <div>
      <img src={logo} alt="easy Dairy logo" className='h-20 md:h-32 py-4 m-auto ' />
      </div>
    <ul className='flex flex-col mt-3 text-xl'>
        <NavLink to={"compress"} className="flex items-center py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <FaPen />
            <span className='hidden md:inline '>Compress</span>
        </NavLink>
        <NavLink className="flex items-center py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
            <FaTachometerAlt></FaTachometerAlt>
            <span className='hidden md:inline '>Dashboard</span>
        </NavLink>
        <NavLink className="flex items-center py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
            <IoIosNotifications ></IoIosNotifications>
            <span className='hidden md:inline '>Notification</span>
        </NavLink>
        <NavLink to={"history"} className="flex items-center py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
            <FaHistory></FaHistory>
            <span className='hidden md:inline '>History</span>
        </NavLink>
        <NavLink to={"/send"} className="flex items-center py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <IoIosSend />
            <span className='hidden md:inline '><p>Sent</p></span>
        </NavLink>
        <NavLink to={"/received"} className="flex items-center py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <MdCallReceived />
            <span className='hidden md:inline '>Received</span>
        </NavLink>
        <NavLink to={"/pending"} className="flex items-center py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <MdOutlinePendingActions />
            <span className='hidden md:inline '>Pending</span>
        </NavLink>
        <NavLink to={"/completed"} className="flex items-center py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <GrCompliance />
            <span className='hidden md:inline '>Completed</span>
        </NavLink>
        <NavLink className="flex items-center py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <MdOutlineManageAccounts />
            <span className='hidden md:inline '>Account</span>
        </NavLink>
        <NavLink className="flex items-center  py-[10px] space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-600 hover:text-white">
        <IoMdLogOut />
            <span className='hidden md:inline '>Logout</span>
        </NavLink>
    </ul>
  
    </div>
  )
}

export default SideBar
