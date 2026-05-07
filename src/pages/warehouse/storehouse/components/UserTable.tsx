import type { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { useSearchParams } from "react-router";
import { useAppSelector } from "@/store/hooks";
import { Table } from "antd";

interface UserTableType {
  id: number;
  name: string;
  count: number;
  totalPrice: string;
  currency: string;
  currencyId: number;
}

const columns: TableColumnsType<UserTableType> = [
  {
    title: "T/r",
    key: "index",
    width: 50,
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Mahsulot nomi",
    dataIndex: "name",
    width: 500,
  },
  {
    title: "Fakt",
    dataIndex: "count",
    width: 200,
    align: "center"
  },
  {
    title: "Jami narxi",
    dataIndex: "totalPrice",
    width: 200,
    align: "center",
    render: (val, rec) => {
      return `${Number(val).toLocaleString()} ${rec.currency}`;
    },
  },
];

function UserTable() {
  const orgId = useAppSelector((state) => state.organization.selectedOrgId);
  const [searchParams] = useSearchParams();
  const { data: UserTableData } = useQuery({
    queryKey: ["UserTableData", searchParams.toString(), orgId],
    queryFn: async () => {
      try {
        const { data } = await api.get("warehouse/getproducttypeforwarehouse", {
          params: {
            ...Object.fromEntries(searchParams),
            organizationId: orgId,
          },
        });
        return data && data.results;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Table<UserTableType>
      columns={columns}
      dataSource={UserTableData}
      pagination={false}
      rowKey="id"
      scroll={{ y: "calc(100vh - 280px)" }}
      summary={(pageData) => {
        let totalCount = 0;
        const totalPricesCurrency: Record<string, number> = {};

        pageData.forEach((product: any) => {
          totalCount += Number(product.count) || 0;

          const price = Number(product.totalPrice) || 0;
          const currency = product.currency;

          if (totalPricesCurrency[currency]) {
            totalPricesCurrency[currency] += price;
          } else {
            totalPricesCurrency[currency] = price;
          }
        });

        return (
          <Table.Summary fixed="bottom">
            <Table.Summary.Row style={{ backgroundColor: '#fafafa', fontWeight: 'bold' }}>
              
              <Table.Summary.Cell index={0} colSpan={2}>
                Jami:
              </Table.Summary.Cell>

              <Table.Summary.Cell index={2} align="center">
                {totalCount.toLocaleString()} ta
              </Table.Summary.Cell>

              <Table.Summary.Cell index={3} align="center">
                
                {Object.entries(totalPricesCurrency).map(([currency, total]) => (
                  <div key={currency}>
                    {total.toLocaleString()} {currency}
                  </div>
                ))}
              </Table.Summary.Cell>

            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
}

export default UserTable;
