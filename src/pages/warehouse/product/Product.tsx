import Filter from "@/pages/warehouse/product/components/Filter";
import ProductTable from "@/pages/warehouse/product/components/ProductTable";

function Product() {
    return (
        <div>
        <div className=' bg-white rounded-2xl mb-4'>
                <Filter />
            </div>
            <ProductTable />
            </div>
    )
}
export default Product