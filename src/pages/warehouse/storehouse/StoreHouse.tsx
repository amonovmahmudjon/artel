import UserTable from "./components/UserTable"
import SupplierFilter from "./components/SupplierFilter"
import ChoosedDate from "@/components/filters/Date/ChoosedDate"


function StoreHouse() {
  
    return (
        <div >
            <div className='flex gap-5 bg-white p-4 rounded-xl border border-gray-100 mb-2'>
                <SupplierFilter />
                <ChoosedDate />
            </div>
            <div>
                <UserTable  />
            </div>
        </div>

    )
}
export default StoreHouse