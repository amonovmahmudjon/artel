import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axiosInstance';
import { useSearchParams } from 'react-router';
import { useAppSelector } from '@/store/hooks';


;

interface PaymentClientTableType {
    id: number;
    name: string;
    fakt: number;
    totalPrice: string;
    currency: number;
}
const columns: TableColumnsType<PaymentClientTableType> = [
    {
        title: 'T/r',
        key: "index",
        width: 50,
        render: (_: any, __: any, index: number) => index + 1,
    },
    {
        title: 'Mijoz',
        dataIndex: 'fullName',
        width: 500,
    },
    {
        title: 'Tel nomer',
        dataIndex: 'phoneNumber',
        width: 200
    },
    {
        title: 'Holati',
        dataIndex: 'state',
        width: 200,
    },
];



function PaymentClientTable() {
    const [searchParams] = useSearchParams()
    const globalOrg = useAppSelector((state)=> state.organization.selectedOrgId)
    const { data: ClientData } = useQuery({
        queryKey: ['ClientData', searchParams.toString(),globalOrg],
        queryFn: async () => {
            try {
                const { data } = await api.get("client/getall", {
                    params: {
                        ...Object.fromEntries(searchParams),
                        organizationId: globalOrg
                    },
                })
                console.log("data", data)
                return data.results

            } catch (error) {
                console.error(error)

            }
        }

    })
    return(
        <div className='bg-white'>
            <Table<PaymentClientTableType>
                            columns={columns}
                            dataSource={ClientData}
                            pagination={{ pageSize: 50 }}
                            rowKey="id"
                            scroll={{ y: "calc(100vh - 280px)" }}
                        />

        </div>
    )
}
export default PaymentClientTable