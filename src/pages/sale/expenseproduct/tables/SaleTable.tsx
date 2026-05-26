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
    <div className="text-ms text-color-base bg-white">
      <Table<SaleTableData>
        columns={columns}
        dataSource={dataSource}
        size="small"
        pagination={false}
        rowKey="id"
        scroll={{ y: "calc(100vh - 360px)", x: "max-content" }}
        summary={(pageData) => {
          const totalSum = pageData.reduce((sum, product) => {
            return sum + (Number(product.salePrice) || 0);
          }, 0);

          return (
            <Table.Summary fixed="bottom">
              <Table.Summary.Row
                style={{ backgroundColor: "#fafafa", fontWeight: "bold"}}
              >
                <Table.Summary.Cell index={0} colSpan={3}>
                  Jami:
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="center">
                  {totalSum.toLocaleString()} UZS
                </Table.Summary.Cell>
             <Table.Summary.Cell index={4}>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
            
          );
        }}
      />
    </div>
  );
}
export default SaleTable;
