import { FilterFilled } from "@ant-design/icons";
import { Button } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useNavigate } from "react-router";

function Filter() {
    const navigate = useNavigate()
  return (
    <div>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "15px 20px",
          borderRadius: "8px",
          border: "1px solid #f0f0f0",
          borderBottom: "none",
        }}
      >
        <Flex justify="space-between" align="center">
          <Button icon={<FilterFilled />} className="">
            Filter
          </Button>
          <Flex  justify="space-between" align="center" gap={15} >
            <Button icon={<ReloadOutlined />} />
            <Button type="primary" icon={<PlusOutlined />}  onClick={()=> navigate("add")}/>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
export default Filter;
