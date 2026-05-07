import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { type ProductTypeChildrenData } from "@/interface/interface";
import { Tag, Card,Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Popconfirm } from "antd";
import { useState } from "react";
import AddEditProductTypeModal from "@/pages/warehouse/product/components/AddEditProductTypeModal";



interface ProductTypeTableType {
  formik: any;
  tableData: ProductTypeChildrenData[];
}



function ProductTypeTable({ tableData,formik }: ProductTypeTableType) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<ProductTypeChildrenData | null>(null);

  const handleEdit = (record: ProductTypeChildrenData) => {
    setSelectedProductType(record);
    setModalOpen(true);
  }
  const handleCreate = () => {
    setSelectedProductType(null);
    setModalOpen(true);
  }
  const handleDelete = (record: ProductTypeChildrenData) => {
  const currentProducts = [...formik.values.products];

  if (record.id) {
    const updatedProducts = currentProducts.map((item) =>
      item.id === record.id ? { ...item, stateId: 0 } : item
    );
    formik.setFieldValue("products", updatedProducts);
  } else {
    const filteredProducts = currentProducts.filter(
      (item) => item.idIndex !== record.idIndex
    );
    formik.setFieldValue("products", filteredProducts);
  }
};
  const columns: TableColumnsType<ProductTypeChildrenData> = [
  {
    title: "T/r",
    dataIndex: "idIndex",
    width: 60,
  },
  {
    title: "Mahsulot nomi",
    dataIndex: "name",
    width: 200,
  },
  {
    title: "Ma'lumot",
    dataIndex: "description",
    align: "center",
    width: 100,
    render: (text) => (text ? text : "-"),
  },
  {
    title: "SAP kodi",
    dataIndex: "sapCode",
    align: "center",
    width: 150,
  },
  {
    title: "Yetkazib beruvchi",
    dataIndex: "counterParty",
    align: "center",
    width: 150,
  },
  {
    title: "Holati",
    dataIndex: "state",
    align: "center",
    width: 100,
    render: (_, record) => {
      return (
        <Tag
          color={record.new ? "blue": record.stateId === 1 ? "green" : "red"}
          style={{
            padding: "2px 5px",
          }}
        >
          {record.new? "Yangi" :record.stateId === 1 ? "Актив" : "Пассив"}
        </Tag>
      );
    },
  },
  {
    title: "Amallar",
    align: "center",
    width: 100,
    render: (_,record) => {
      return (
       <Space size="middle">
    <Button
      type="primary"         
      icon={<EditOutlined />}  
      onClick={() => handleEdit(record)}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '32px',       
        height: '32px'         
      }}
    />
    <Popconfirm 
      title="O'chirilsinmi?" 
      onConfirm={() => handleDelete(record.idIndex ? record : record)}
    >
      <Button
        danger                 
        icon={<DeleteOutlined />} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '32px', 
          height: '32px' 
        }}
      />
    </Popconfirm>
  </Space>
    )

    }
  },
];
  return (
    <>
    <Card>
      <div className="flex items-center justify-between mb-2 ">
        <h3 style={{ fontSize:15 }}><b> Mahsulot turlari </b></h3>
        <Button onClick={handleCreate}>Yaratish</Button>
      </div>
      <Table<ProductTypeChildrenData>
        columns={columns}
        dataSource={tableData.sort((a:any,b:any) => b.idIndex-a.idIndex)}
        pagination={false}
        scroll={{ y: 190 }}
        tableLayout="fixed"
        rowKey="idIndex"
      />
    </Card>
    <AddEditProductTypeModal open={modalOpen} setOpen={setModalOpen} editItem={selectedProductType} formik={formik}/>
    </>
  )
}
export default ProductTypeTable;
