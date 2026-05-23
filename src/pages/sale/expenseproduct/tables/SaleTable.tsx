import { Table, type TableColumnsType } from "antd";
import { type SaleTableData } from "@/interface/interface";
import { numberSpacing } from "@/utils/utils";
import { DeleteOutlined } from "@ant-design/icons";

interface SaleTableProps {
  dataSource: SaleTableData[];
  onDelete: any;
}

function SaleTable({ dataSource, onDelete }: SaleTableProps) {
  const columns: TableColumnsType<SaleTableData> = [
    {
      title: "T/r",
      key: "index",
      render: (_, __, index: number) => index + 1,
    },
    {
      title: "Mahsulot nomi",
      dataIndex: "name",
    },
    {
      title: "SAP kodi",
      dataIndex: "serialNumber",
    },
    {
      title: "Narx",
      dataIndex: "salePrice",
      render: (text) => numberSpacing(text) + " USZ",
    },
    {
      title: "Amallar",
      key: "action",
      align: "center",
      render: (_, record) => {
        return (
          <DeleteOutlined
            onClick={() => onDelete(record.id)}
            style={{ color: "red" }}
          />
        );
      },
    },
  ];

  return (
    <div className="text-ms text-color-base">
      <Table<SaleTableData>
        columns={columns}
        dataSource={dataSource}
        size="small"
        pagination={false}
        rowKey="id"
        scroll={{ y: "calc(100vh - 360px)", x: "max-content" }}
      />
    </div>
  );
}
export default SaleTable;
