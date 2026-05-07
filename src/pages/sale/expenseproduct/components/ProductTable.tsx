import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token as any;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
          }
        }
      }
    `,
  };
});

interface ProductTableType {
 id: number;
 docNumber: string;
 storeClient: string;
 sellingPrice: number;
 soldPrice: number;
 address: string;
 docDate: string;
 storeEmployee: string;
 state: string;
}

const columns: TableColumnsType<ProductTableType> = [
  {
    title: 'T/r',
    key: "index",
    width: 50,
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: 'Hujjat raqami',
    width: 100,
    dataIndex: 'docNumber',
    fixed: 'start',
  },
  {
    title: 'Mijoz',
    dataIndex: 'storeClient',
    key: '1',
    width: 150,
  },
  {
    title: 'Sotuv narxi',
    dataIndex: 'sellingPrice',
    key: '2',
    width: 150,
  },
  {
    title: 'Sotilgan narxi',
    dataIndex: 'soldPrice',
    key: '3',
    width: 150,
  },
  {
    title: 'Valyutada to\'lov',
    dataIndex: 'sumUsd',
    key: '4',
    width: 150,
  },
  {
    title: 'So\'mda to\'lov',
    dataIndex: 'sumUzs',
    key: '5',
    width: 150,
  },
  {
    title: 'Sana',
    dataIndex: 'docDate',
    key: '6',
    width: 150,
  },
  {
    title: 'Sotuvchi',
    dataIndex: 'storeEmployee',
    key: '7',
    width: 150,
  },
  { 
    title: 'Holati',
    dataIndex: 'state',
    key: '8'
 },
  {
    title: 'Amallar',
    key: 'operation',
    fixed: 'end',
    width: 100,
    render: () => <a>action</a>,
  },
];

function ProductTable() {
    const { styles } = useStyle();
   
        const { data: ProductTableData } = useQuery({
            queryKey: ['ProductTableData'],
            queryFn: async () => {
                try {
                    const { data } = await api.get("sale/getall", {
                       params:{
                        // OrganizationId:

                       }

                        
                    })
                    console.log("data", data)
                    return data?.results
    
                } catch (error) {
                    console.error(error)
                    console.log("xatolik")
    
                }
            }
        })
    
  return (
    <div>
         <Table<ProductTableType>
      className={styles.customTable}
      columns={columns}
      dataSource={ProductTableData}
      scroll={{ x: 'max-content', y: 55 * 5 }}
    />

    </div>
  )
}
export default ProductTable