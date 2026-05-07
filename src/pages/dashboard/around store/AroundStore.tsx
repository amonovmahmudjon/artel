import Balance from "./components/Balance"
import TotalBalance from "./components/TotalBalance"
import { useAppSelector } from "@/store/hooks";
import BarChart from "./components/BarChart";
import { useQuery } from "@tanstack/react-query"
import api from "@/api/axiosInstance";
import { useState } from "react";
import { DatePicker } from 'antd';
import {  Radio } from 'antd';
import dayjs from "dayjs";

import { Spin } from "antd"



function AroundStore() {
  const selectId = useAppSelector((state) => state.organization.selectedOrgId);
  const [timeGroupingBy, setTimeGroupingBy] = useState(0);
  const [years, setYears] = useState(dayjs())

  const { data: salesSummary, isLoading } = useQuery({
    queryKey: ["salesSummary", selectId,timeGroupingBy,years],
    queryFn: async () => {
      const response = await api.get("api/dashboard/sales-summary", {
        params: { 
          OrganizationId: selectId,
          TimeGroupingBy: timeGroupingBy,
          Year: years.year(),
        //   Month: 4,
        //   StartDate:
        //   EndDate:
        }
      });
      return response.data;
    },
    enabled: !!selectId 
  });

  const dataSourse = timeGroupingBy === 1 ? salesSummary?.dailySales : salesSummary?.monthlySales
  const chartData = {
    // dataSourse? shundagi so'ro'q biz datasoursega tengladik apidan keladigan oy bilan kunlarni, ulardan ma'lumot kelgancha obyekt bo'sh bo'ladiku, shu bo'sh dan ma'lumot qidirmaydi qachon ma'lumot kelsa qidiradi
    labels: dataSourse?.map((item: any) => {
      const dateObj = dayjs(item.date); 
      if (timeGroupingBy === 1) {
        return dateObj.format("D"); 
      } else {
    
        return dateObj.format("MMMM"); 
      }
    }) || [],
// [] bu massiv agar apidan ma'lumot kelmay qolsa xatolik chiqmay grafikni bo'sh ko'rsatib turadi 
   
    datasets: [
      {
        label: timeGroupingBy === 1 ? 'Kunlik savdo' : 'Oylik savdo',
        data: dataSourse?.map((item: any) => item.totalAmount) || [],
        backgroundColor: "oklch(43.2% 0.095 166.913)", 
        borderRadius: 5,
      }
    ],
  };

  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { display: true }, 
      tooltip: { enabled: true }  
    },
    scales: {
      y: { beginAtZero: true } 
    }
  };


  
    return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-2 rounded-2xl border border-gray-200 flex flex-col lg:flex-row gap-6 ">
        <div className="flex-none">
          {selectId && <TotalBalance selectedId={selectId}/>}
        </div>
        <div className="flex-1">
          {selectId && <Balance selectedId={selectId}/>}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-200 min-h-450px">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Savdo ko'rsatkichlari</h3>
          
          <div className="flex gap-4 items-center">
            <Radio.Group 
              value={timeGroupingBy} 
              onChange={(e) => setTimeGroupingBy(e.target.value)} 
              buttonStyle="solid"
            >
              <Radio.Button value={1}>Kunlik</Radio.Button>
              <Radio.Button value={0}>Oylik</Radio.Button>
            </Radio.Group>

            <DatePicker 
              picker={timeGroupingBy === 1 ? "month" : "year"} 
              value={years} 
              allowClear={false} 
              onChange={(date) => date && setYears(date)} 
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-300px">
            <Spin size="large" />
          </div>
        ) : (
        
          <BarChart 
            data={chartData} 
            options={chartOptions} 
            height={350} 
          />
        )}
      </div>
    </div>
  );
}
export default AroundStore

