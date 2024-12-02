import Navbar from "../SideBar/Navbar"
const Compress = () => {
  return (
   <>
   <div className="ml-16 md:ml-64">
    <Navbar></Navbar>
   <div className='ml-16 md:ml-64'>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
<div className="items-center justify-center m-auto">
<button className="btn " onClick={()=>document.getElementById('my_modal_3').showModal()}>Write your letter</button>
</div>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>
    </div>
   </div>
   </>
  )
}

export default Compress
