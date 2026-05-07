import { useQuery } from "@tanstack/react-query"
import api from "@/api/axiosInstance"
import { Spin } from 'antd';
import { BankOutlined, WalletOutlined, ShoppingCartOutlined, TruckOutlined } from "@ant-design/icons";



function Balance({ selectedId }: { selectedId: number }) {
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
    const balanceItems = [
     
        {
            id: 2,
            title: "Bank balans",
            value: data?.bankBalance,
            icon: <BankOutlined />,
        },
        {
            id: 3,
            title: "Kassa balans",
            value: data?.cashboxBalance,
            icon: <WalletOutlined />,
        },
        {
            id: 4,
            title: "Mahsulot narxi",
            value: data?.stockProductSum,
            icon: <ShoppingCartOutlined />,
        },
        {
            id: 5,
            title: "Yetkazib beruvchi qarz",
            value: data?.debtFromCounterParty,
            icon: <TruckOutlined />,
        },
       
    ]
    console.log("Balance data:", balanceData);
   

    return (
             <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between gap-10 " >
            {balanceItems.map((item) => (
                <div key={item.id} className="bg-gray-100 p-4 rounded-xl flex items-center gap-4 border-gray-100" >
                    <div className="flex justify-evenly">
                    <div className="w-15 h-15  bg-white rounded-xl flex items-center justify-center text-blue-600 text-2xl  border border-gray-50">{item.icon}</div>
                    <div className="flex flex-col gap-1 overflow-hidden">       <p className="text-gray-500 text-10px font-semibold   m-1 ">  {item.title} </p>  
                    <h4 className=" font-bold text-gray-800 m-1 flex  gap-1">{item.value.toFixed(2)} $</h4></div>
                    </div>
                </div>
            ))}

        </div>
    
    )
}
export default Balance