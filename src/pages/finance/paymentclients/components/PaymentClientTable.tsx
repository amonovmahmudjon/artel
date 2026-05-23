import { Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { useSearchParams,Link } from "react-router";
import { useAppSelector } from "@/store/hooks";


interface PaymentClientTableType {
  id: number;
  fullName: string;
  fakt: number;
  totalPrice: string;
  currency: number;
  stateId: number;
  phoneNumber: number;
  state: string;
}
const columns: TableColumnsType<PaymentClientTableType> = [
  {
    title: "T/r",
    key: "index",
    width: 50,
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Mijoz",
    dataIndex: "fullName",
    width: 500,
    render: (text,record)=>{
      return(
      <Link to={`${record.id}/${record.fullName}/infoclient`}>{text}</Link>
    )
    }
  },
  {
    title: "Tel nomer",
    dataIndex: "phoneNumber",
    width: 200,
    align:"center",
    render: (text) => {
      const phoneNumber = String(text);
      return phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
    },
  },
  {
    title: "Holati",
    dataIndex: "state",
     align:"center",
    width: 200,
    render: (text, record) => {
      return (
        <Tag
          color={record.stateId === 1 ? "green" : "red"}
          style={{
            borderRadius: "4px",
            fontWeight: "500",
            padding: "2px 10px",
            fontSize: "15px",
          }}
        >
          {text}
        </Tag>
      );
    },
  },
];

function PaymentClientTable() {
  const [searchParams] = useSearchParams();
  const globalOrg = useAppSelector((state) => state.organization.selectedOrgId);
  const { data: ClientData } = useQuery({
    queryKey: ["ClientData", searchParams.toString(), globalOrg],
    queryFn: async () => {
      try {
        const { data } = await api.get("client/getall", {
          params: {
            ...Object.fromEntries(searchParams),
            organizationId: globalOrg,
          },
        });
        return data.results;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="bg-white">
      <Table<PaymentClientTableType>
        columns={columns}
        dataSource={ClientData}
        pagination={{
          defaultPageSize: 50,
          pageSizeOptions: ["10", "20", "50", "100"],
          showSizeChanger: true,
          showTotal: (total) => ` Jami: ${total} ta `,
        }}
        rowKey="id"
        scroll={{ y: "calc(100vh - 280px)" ,x: "max-content"  }}
        size="medium"
      />
    </div>
  );
}
export default PaymentClientTable;
