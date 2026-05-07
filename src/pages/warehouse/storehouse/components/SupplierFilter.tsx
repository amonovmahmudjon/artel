import { Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { useSearchParams } from "react-router";

function SupplierFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: suppliers } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      try {
        const response = await api.get("manual/counterpartyselectlist");
        const responseData = response.data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        return responseData;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });
  const handleSupplyChange = (value: any | undefined) => {
    value
      ? searchParams.set("counterPartyId", value)
      : searchParams.delete("counterPartyId");
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Select
        value={searchParams.get("counterPartyId") ? Number(searchParams.get("counterPartyId")) : undefined}
        showSearch={{
          optionFilterProp: "label",
        }}
        style={{ width: 200 }}
        placeholder="Yetkazib beruvchini tanlang"
        options={suppliers}
        onChange={handleSupplyChange}
        allowClear
      />
    </div>
  );
}
export default SupplierFilter;
