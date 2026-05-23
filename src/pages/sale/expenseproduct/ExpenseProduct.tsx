import StardEndDate from "@/components/filters/Date/StardEndDate";
import SaleClientTable from "@/pages/sale/expenseproduct/tables/SaleClientTable";
import {
  PlusOutlined,
  ReloadOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { Flex, Button } from "antd";
import api from "@/api/axiosInstance";

function ExpenseProduct() {
  const navigate = useNavigate();
  const handleDownload = async () => {
    try {
      const response = await api.get("client/downloadlist", {
        responseType: "blob",
      });
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "mijozlar_hisoboti.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Yuklashda xato:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between gap-5 bg-white p-4 rounded-xl border border-gray-100 mb-3 ">
        <StardEndDate />
        <Flex justify="space-between" align="center" gap={15}>
          <Button icon={<ReloadOutlined />} />
          <Button
            icon={<VerticalAlignBottomOutlined />}
            onClick={handleDownload}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("add-client")}
          />
        </Flex>
      </div>
      <SaleClientTable />
    </div>
  );
}
export default ExpenseProduct;
