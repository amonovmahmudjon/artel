import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import { Tag } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message } from "antd";
import { Spin } from 'antd';
import { Link,useNavigate } from "react-router-dom";



interface ProductTableType {
  id: number;
  name: string;
  state: string;
  stateId: number;
  actions: string;
}



function ProductTable() {
  const navigate = useNavigate();

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
    render: (text,record) => (
      <Link to={`edit/${record.id}`}>{text}</Link>
    )
  },
  {
    title: "Ma'lumot",
    dataIndex: "description",
    width: 200,
    render: (text) => (text ? text : "-"),
  },
  {
    title: "Holati",
    dataIndex: "state",
    width: 150,
    render: (text,record) => {
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
    width: 200,
    render: (_, record) => {

      const handleMenuClick: MenuProps["onClick"] = (e) => {
        message.info("Click on menu item.");
        console.log("click", e);
      };

      

      const items: MenuProps["items"] = [
        {
          label: "Tahrirlash",
          key: "1",
          icon: <EditOutlined />,
          onClick: () => {
            navigate(`edit/${record.id}`);
          }
        },
        {
          label: "O'chirish",
          key: "2",
          icon: <DeleteOutlined />,
          danger: true,
        },
      ];

      const menuProps = {
        items,
        onClick: handleMenuClick,
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
            />
          </Dropdown>
        </div>
      );
    },
    
  },
];

  const { data: ProductTableData,isLoading } = useQuery({
    queryKey: ["productTable"],
    queryFn: async () => {
      try {
        const { data } = await api.get("producttype/getall", {
          params: {},
        });
        return data.results;
      } catch (error) {
        console.error(error);
        return;
      }
    },
  });
  return (
<Spin spinning={isLoading}>
    <Table<ProductTableType>
      columns={columns}
      dataSource={ProductTableData}
      pagination={false}
      rowKey="id"
      scroll={{ y: "calc(100vh - 220px)" }}
      tableLayout="fixed"
    />
    </Spin>
  );
}
export default ProductTable;
