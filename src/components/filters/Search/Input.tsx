import { Input, Space } from "antd";
import { useSearchParams } from "react-router";



const { Search } = Input;


function ClientSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = (value: any) => {
    if (value) {
      searchParams.set("search", value);
    }else{
        searchParams.delete("search")
    } 
    setSearchParams(searchParams);
  };
  return (
    <div>
      <Space vertical>
        <Search
          placeholder="Mahsulot nomini qidiring.."
          onSearch={filter}
          enterButton
          allowClear
        
        />
      </Space>
    </div>
  );
}
export default ClientSearch;
