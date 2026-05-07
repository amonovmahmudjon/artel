import TwoChoosedDate from "@/components/filters/Date/TwoChoosedDate"
import ProductTable from "@/pages/sale/expenseproduct/components/ProductTable"


function ExpenseProduct() {
  return (
      <div >
            <div className='flex gap-5 bg-white p-4 rounded-xl border border-gray-100'>
                 <TwoChoosedDate />
            </div>
            <ProductTable />
            

        </div>
  )
}
export default ExpenseProduct