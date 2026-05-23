import { Spin, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { useAppSelector } from "@/store/hooks";
import { Link, useSearchParams } from "react-router";
import { type SaleClientTableType } from "@/interface/interface";
import { DateFormat, notifyError, notifySuccess, numberSpacing } from "@/utils/utils";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

function SaleClientTable() {
  const organizationId = useAppSelector(
    (state) => state.organization.selectedOrgId,
  );
  const [modal, contextHolder] = Modal.useModal();
  const [searchParams] = useSearchParams();

  const columns: TableColumnsType<SaleClientTableType> = [
    {
      title: "T/r",
      key: "index",
      width: 50,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Hujjat raqami",
      width: 100,
      dataIndex: "docNumber",
      fixed: "start",
      align: "center",
      render: (text, record) => {
        return <Link to={`${record.id}/view-list`}>{text}</Link>;
      },
    },
    {
      title: "Mijoz",
      dataIndex: "storeClient",
      key: "1",
      width: 150,
    },
    {
      title: "Sotuv narxi",
      dataIndex: "sellingPrice",
      key: "2",
      width: 150,
      align: "center",
      render: (text) => numberSpacing(text) + " UZS",
    },
    {
      title: "Sotilgan narxi",
      dataIndex: "soldPrice",
      key: "3",
      width: 150,
      align: "center",
      render: (text) => numberSpacing(text) + " UZS",
    },
    {
      title: "Valyutada to'lov",
      dataIndex: "sumUsd",
      key: "4",
      width: 150,
      align: "center",
      render: (text) => (text === 0 ? "" : numberSpacing(text)),
    },
    {
      title: "So'mda to'lov",
      dataIndex: "sumUzs",
      key: "5",
      width: 150,
      align: "center",
      render: (text) => numberSpacing(text) + " UZS",
    },
    {
      title: "Sana",
      dataIndex: "docDate",
      key: "6",
      width: 130,
      align: "center",
      render: (text) => DateFormat(text),
    },
    {
      title: "Sotuvchi",
      dataIndex: "storeEmployee",
      key: "7",
      width: 150,
    },
    {
      title: "Holati",
      dataIndex: "state",
      key: "8",
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
    {
      title: "Amallar",
      key: "operation",
      fixed: "right",
      width: 100,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <Button
              onClick={() => {
                modal.confirm({
                  title: "Haqiqatdan o'chirmoqchimisiz?",
                  content: `${record.storeClient} savatdan olib tashlanadi.`,
                  onOk: () => handleDelete(record.id),
                });
              }}
            >
              {<DeleteOutlined style={{ color: "red" }} />}
            </Button>
          </>
        );
      },
    },
  ];
  const { data: ProductTableData,refetch,isLoading } = useQuery({
    queryKey: ["ProductTableData", organizationId, searchParams.toString()],
    queryFn: async () => {
      try {
        const { data } = await api.get("sale/getall", {
          params: {
            organizationId: organizationId,
            ...Object.fromEntries(searchParams),
          },
        });
        return data?.results;
      } catch (error) {
        console.error(error);
        console.log("xatolik");
      }
    },
  });
  const handleDelete = async (id:number) => {
    try{
      await api.delete(`sale/delete/${id}`)
      refetch()
      notifySuccess("Mufaqqiyatli o'chirildi")
      console.log("api",ProductTableData);
      
    }catch (error){
      console.error(error)
      notifyError(`Xatolik yuz berdi ${ error}`)
    }
  }

  return (
    <Spin spinning={isLoading} size="large">
    <div className="bg-white">
      {contextHolder}
      <Table<SaleClientTableType>
        columns={columns}
        dataSource={ProductTableData}
        scroll={{ y: "calc(100vh - 300px)", x: "max-content" }}
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
export default SaleClientTable;
