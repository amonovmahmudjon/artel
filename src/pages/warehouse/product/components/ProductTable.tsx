import { App, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { Tag } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message } from "antd";
import { Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/utils";
import {  Modal, Space } from 'antd';

interface ProductTableType {
  id: number;
  name: string;
  state: string;
  stateId: number;
  actions: string;
}

function ProductTable() {
  const navigate = useNavigate();
  
  const queryClient = useQueryClient();
  // const {modal} = App.useApp()
  const [modal, contextHolder] = Modal.useModal();

  const organizationId = useAppSelector(
    (state) => state.organization.selectedOrgId,
  );

  const { data: ProductTableData, isLoading,refetch } = useQuery({
    queryKey: ["ProductTableData", organizationId],
    queryFn: async () => {
      try {
        const { data } = await api.get("producttype/getall", {
          params: {
            organizationId: organizationId,
          },
        });
        return data.results;
      } catch (error) {
        console.error(error);
        return;
      }
    },
  });
  const {mutate,isPending} =useMutation({
    mutationFn: (id:number) => api.delete(`sale/delete/${id}`),
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey:["ProductTableData"]})
      notifySuccess("Muvaffaqiyatli o'chirildi")
    },
    onError:(error) => {
      notifyError(`Xatolik yuz berdi${ error}`)
    }

  })
  const columns: TableColumnsType<ProductTableType> = [
    {
      title: "T/r",
      key: "index",
      dataIndex: "index",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Nomi",
      dataIndex: "name",
      width: 500,
      render: (text, record) => <Link to={`edit/${record.id}`}>{text}</Link>,
    },
    {
      title: "Ma'lumot",
      dataIndex: "description",
      width: 200,
      align:"center",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Holati",
      dataIndex: "state",
      align:"center",
      width: 150,
      render: (text, record) => {
        return (
          <Tag
            color={record.stateId === 1 ? "green" : "red"}
            style={{
              borderRadius: "4px",
              fontWeight: "500",
              padding: "2px 5px",
              fontSize: "12px",
            }}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Amallar",
      width: 200,
      align:"center",
      render: (_, record) => {

        const items: MenuProps["items"] = [
          {
            label: "Tahrirlash",
            key: "1",
            icon: <EditOutlined />,
            onClick: () => {
              navigate(`edit/${record.id}`);
            },
          },
          {
            label: "O'chirish",
            key: "2",
            icon: <DeleteOutlined />,
            danger: true,
            onClick: () => {
              modal.confirm({
                title: "Diqqat",
                content: "Ushbu ma'lumotni o'chirishga aminmisiz?",
                onOk:() => mutate(record.id)
              })
            }
          },
        ];

        const menuProps = {
          items
        };

        return (
          <div>
            <Dropdown menu={menuProps} placement="bottom">
              <Button
                icon={
                  <MoreOutlined
                    style={{
                      fontSize: "18px",
                      color: "#595959",
                    }}
                    
                  />
                }
                loading={isPending}
              />
            </Dropdown>
          </div>
        );
      },
    },
  ];
  
  return (
    <Spin spinning={isLoading}>
      
      <div className="bg-white">
        {contextHolder}
      <Table<ProductTableType>
        columns={columns}
        dataSource={ProductTableData}
        pagination={{
          defaultPageSize: 50,
          showSizeChanger: true,
          showTotal: (total) => ` Jami: ${total} ta `,
        }}
        rowKey="id"
        scroll={{ y: "calc(100vh - 270px)", x: "max-content" }}
        tableLayout="fixed"
        size="middle"
      />
      </div>
    </Spin>
  );
}
export default ProductTable;
