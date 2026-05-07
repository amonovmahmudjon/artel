import { useNavigate } from "react-router-dom";
import { BellOutlined, TranslationOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedOrgId } from "@/store/features/organizationSlice";


function Navbar() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const selectedOrgId = useAppSelector((state) => state.organization.selectedOrgId);
    const onSelectChange = (value: number) => {
    dispatch(setSelectedOrgId(value)); // Redux-ni yangilash
  };


    const { data: organizations, isLoading } = useQuery({
        queryKey: ["organizations"],
        queryFn: async () => {
            try {
                const response = await api.get("manual/organizationselectlist")

                const responsedData = response.data.map((item: any) => ({
                    value: item.id,
                    label: item.name,
                }))
                return responsedData

            } catch (error) {
                console.error(error)
                return []
            }

        },
        
    })


    const logOut = () => {
        localStorage.removeItem("login")
        navigate("account/login")

    }

    return (
        <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="relative w-96">


            </div>
            <div className="flex items-center gap-6">
                <div className="relative cursor-pointer">
                    <Select showSearch={{
                        optionFilterProp: 'label',
                    }}
                        style={{ width: 250, height: 40 }}
                        loading={isLoading}
                        placeholder="Search to Select"
                        value={selectedOrgId || undefined}
                        onChange={onSelectChange}
                        options={organizations || []} />
                    <BellOutlined />
                </div>

                <button className="text-red-500 hover:bg-gray-950" onClick={logOut}>Chiqish</button>

                <div className="flex items-center gap-3 cursor-pointer">
                    <TranslationOutlined />
                    <span className="text-sm font-semibold text-gray-700">Bonnie Green</span>
                </div>
            </div>
        </nav>
    )
}
export default Navbar