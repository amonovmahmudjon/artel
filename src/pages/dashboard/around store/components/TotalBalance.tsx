import api from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query"
import { Spin } from "antd";


function TotalBalance ({ selectedId }: { selectedId: number }) {

    const { data: balanceData, isLoading } = useQuery({
        queryKey: ["storeBalance", selectedId],
        queryFn: async () => {
            try {
                const response = await api.get("storebalance/get", {
                    params: { OrganizationId: selectedId }
                })
                if(response.data.results){
                    return response.data.results
                }
                return [];
                

            } catch (error) {
                console.error(error)
                return []
                
            }
        },
        enabled: !!selectedId
    })
     if (isLoading) {
        return <div> <Spin /> </div>
    }
    const data = balanceData?.[0]
    return(
        
        
        <div className="bg-gray-100 p-4 rounded-2xl border border-gray-100 flex items-center gap-4 h-full ">
            

            <div className="flex flex-col">

                <p className="text-gray-500 font-semibold ">
                    {data?.organization || "Tashkilot tanlanmagan"}
                </p>
                
                <h4 className="text-lg font-black text-gray-800  mt-1">
                    {data?.totalBalance.toFixed(2) } $
                   
                </h4>
            </div>
        </div>
    )
}
export default TotalBalance