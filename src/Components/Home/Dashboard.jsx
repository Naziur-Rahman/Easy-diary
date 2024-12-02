import Login from '../Login/Login'
import SideBar from '../SideBar/SideBar'
import Navbar from '../SideBar/Navbar'
import Dashboards from './Cards/Dashboards'
const Dashboard = () => {
  return (
    <>
    <div>
      <SideBar></SideBar>
      <div className='grow ml-16 md:ml-64 lg:h-screen bg-gray-100 text-gray-900'>
        <Navbar></Navbar>
        <div>
          <Dashboards></Dashboards>
        </div>
      </div>
    </div>
    </>
   
   
  )
}

export default Dashboard
