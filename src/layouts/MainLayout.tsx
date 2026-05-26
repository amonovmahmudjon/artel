import Sidebar from "@/components/sidebar/Sidebar"
import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router"
import { useAppDispatch } from "@/store/hooks"
import { useEffect } from "react"



function MainLayout() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    
  })
  return (
     <div className="flex h-screen overflow-hidden bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-2  custom-scrollbar ">
          <div className='w-full h-full'>
          <Outlet />
          </div>
        </main>
      </div>
    </div>
   )
}
export default MainLayout