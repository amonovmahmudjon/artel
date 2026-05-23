import api from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Spin, Card } from "antd";
import {
  type SaleClientTableType,
  type SaleClientChildTable,
} from "@/interface/interface";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { numberSpacing } from "@/utils/utils";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function ViewList() {
  const params = useParams();
  const dateFormat = dayjs().format("DD.MM.YYYY HH:mm:ss");
  const columns: TableColumnsType<SaleClientChildTable> = [
    {
      title: "T/r",
      key: "index",
      width: 50,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Mahsulot turi",
      width: 100,
      dataIndex: "productType",
      fixed: "start",
    },
    {
      title: "Mahsulot nomi",
      dataIndex: "product",
      width: 150,
      key: 1,
    },
    {
      title: "Seriya raqami",
      dataIndex: "serialNumber",
      width: 150,
      key: 2,
    },
    {
      title: "Sotuv narxi",
      dataIndex: "sellingPrice",
      width: 150,
      key: 3,
      render: (text) => numberSpacing(text) + " UZS",
    },
    {
      title: "Sotilgan narx",
      dataIndex: "soldPrice",
      width: 150,
      key: 4,
      render: (text) => numberSpacing(text) + " UZS",
    },
    {
      title: "Amallar",
      dataIndex: "productTable",
      width: 100,
      fixed: "end",
    },
  ];
  const { data: ViewList, isLoading } = useQuery<SaleClientTableType>({
    queryKey: ["ViewList"],
    queryFn: async () => {
      const { data } = await api.get(`sale/get/${params.id}`);
      return data;
    },
  });
  return (
    <Spin spinning={isLoading}>
      <Card>
        <div className="flex justify-between">
          <div className="flex justify-evenly gap-30">
            <div className="inline">
              <h2>
                <b>Chiqim varag'i</b>
              </h2>
              <h3>
                Hujjat raqami: <span>{ViewList?.docNumber}</span>
              </h3>
              <h3>
                Haridor: <span>{ViewList?.storeClient}</span>
              </h3>
              <h3>
                Sana: <span>{dayjs(ViewList?.docDate).format(dateFormat)}</span>
              </h3>
              <h3>
                Sotuvchi: <span>{ViewList?.storeEmployee}</span>
              </h3>
              <h3>
                Holati: <span>{ViewList?.status}</span>
              </h3>
            </div>
            <div>
              <h2>To'lovlar</h2>
              {ViewList?.payments.map((item) => (
                <div>
                  <h3>
                    {item.paymentSystemType}:{" "}
                    <span>{numberSpacing(item.amount)}</span>{" "}
                    <span>{item.currencyId === 1 ? "UZS" : "$"}</span>
                  </h3>
                </div>
              ))}
            </div>
            <div>
              <h2>Mijoz ma'lumotlari</h2>
              <h3>
                Ismi: <span>{ViewList?.storeClient}</span>
              </h3>
              <h3>
                Tel nomeri: <span>{ViewList?.clientNumber}</span>
              </h3>
            </div>
            <div>Ma'lumot</div>
          </div>
          <div>
            <EditOutlined />
          </div>
        </div>
      </Card>
      <div className="bg-white mt-2">
        <Table<SaleClientChildTable>
          columns={columns}
          dataSource={ViewList?.tables}
          scroll={{ y: "calc(100vh - 390px)", x: " max-content " }}
          pagination={{
            defaultPageSize: 50,
            pageSizeOptions: ["10", "20", "50", "100"],
            showSizeChanger: true,
            showTotal: (total) => ` Jami: ${total} ta `,
          }}
          rowKey="id"
          size="middle"
        />
      </div>
    </Spin>
  );
}
export default ViewList;
