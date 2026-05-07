import Sidebar from "@/components/sidebar/Sidebar"
import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router"



function MainLayout() {
  return (
     <div className="flex h-screen overflow-hidden bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-2  custom-scrollbar ">
          <div className='mx-auto max-w-7xl'>
          <Outlet />
          </div>
        </main>
      </div>
    </div>
   )
}
export default MainLayout