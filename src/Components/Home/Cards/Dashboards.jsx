
import Cards from './Cards'
import { IoIosSend } from "react-icons/io";
import { MdCallReceived } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
const Dashboards = () => {
  return (
    <div className='grow p-8'>
      <h1 className='text-2xl mb-4'>Easy Diary Dash Board</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <Cards icon={<IoIosSend/>} title="Send" value= "50"/>
        <Cards icon={<MdCallReceived/>} title="Received" value= "20"/>
        <Cards icon={<MdOutlinePendingActions/>} title="Pending" value= "7"/>
        <Cards icon={<GrCompliance/>} title="Complete" value= "50"/>

       
      </div>
    </div>
  )
}

export default Dashboards
