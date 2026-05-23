import { Card, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { useAppSelector } from "@/store/hooks";
import TwoChoosedDate from "@/components/filters/Date/StardEndDate";
import { useSearchParams } from "react-router";
import dayjs from "dayjs";
import type { PaymentHistoryData } from "@/interface/interface";
import { numberSpacing } from "@/utils/utils";

function PaymentHistory() {
  const organizationId = useAppSelector(
    (state) => state.organization.selectedOrgId,
  );
  const [searchParams] = useSearchParams();
  const columns: TableColumnsType<PaymentHistoryData> = [
    {
      title: "T/r",
      dataIndex: "id",
      width: 70,
      align: "center",
    },
    {
      title: "Firma va kassa nomi",
      width: 150,
      dataIndex: "cashbox",
      align: "center",
    },
    {
      title: "Mijoz",
      dataIndex: "client",
      width: 150,
      align: "center",
    },
    {
      title: "To'lov sanasi",
      dataIndex: "createdDate",
      width: 150,
      align: "center",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "Miqdor",
      dataIndex: "amount",
      width: 150,
      align: "center",
      render: (text, record) => {
        const formattedNumber = numberSpacing(text);
        return formattedNumber + (record.currencyId === 1 ? " UZS" : " USD");
      },
    },
    {
      title: "To'lov turi",
      dataIndex: "paymentSystemType",
      width: 150,
      align: "center",
    },
    {
      title: "Operatsiya turi",
      dataIndex: "operationType",
      width: 150,
      align: "center",
    },
    {
      title: "Ma'lumot",
      dataIndex: "description",
      width: 150,
      align: "center",
      render: (text) => (text ? text : "--"),
    },
    {
      title: "Holati",
      dataIndex: "state",
      width: 100,
      align: "center",
      render: (text, record) => (
        <Tag
          color={record.stateId === 1 ? "green" : "red"}
          style={{
            borderRadius: "4px",
            fontWeight: "500",
            padding: "2px 10px",
            fontSize: "13px",
          }}
        >
          {text}
        </Tag>
      ),
    },
  ];
  const { data: PaymentHistory } = useQuery({
    queryKey: ["PaymentHistory", searchParams.toString(), organizationId],
    queryFn: async () => {
      try {
        const { data } = await api.get("transaction/getall", {
          params: {
            ...Object.fromEntries(searchParams),
            organizationId: organizationId,
          },
        });
        console.log("data", data);
        return data?.results;
      } catch (error) {
        console.error(error);
        console.log("xatolik");
      }
    },
  });

  return (
    <>
      <div className="bg-white rounded-xl ">
        <div className="p-2">
          <TwoChoosedDate />
        </div>
        <div>
          <Table<PaymentHistoryData>
            columns={columns}
            dataSource={PaymentHistory}
            scroll={{ y: "calc(100vh - 380px)" }}
            pagination={false}
            //   defaultPageSize: 100,
            //   pageSizeOptions: ["10", "20", "50", "100"],
            //   showSizeChanger: true,
            //   showTotal: (total) => ` Jami: ${total} ta `,
            rowKey="id"
            summary={(pageData) => {
        const totalPricesCurrency: Record<string, number> = {};

        pageData.forEach((product: any) => {

          const price = Number(product.amount) || 0;
          const currency = product.currency;

          if (totalPricesCurrency[currency]) {
            totalPricesCurrency[currency] += price;
          } else {
            totalPricesCurrency[currency] = price;
          }
        });

        return (
          <Table.Summary fixed="bottom">
            <Table.Summary.Row style={{  fontWeight: 'bold' }}>
              
              <Table.Summary.Cell index={0} colSpan={4}>
                Jami:
              </Table.Summary.Cell>

              <Table.Summary.Cell index={4} className="" >
                
                {Object.entries(totalPricesCurrency).map(([currency, total]) => (
                  <div key={currency} >
                    {total.toLocaleString()} {currency}
                  </div>
                ))}
              </Table.Summary.Cell>

            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
            
          />
        </div>
      </div>
    </>
  );
}
export default PaymentHistory;
