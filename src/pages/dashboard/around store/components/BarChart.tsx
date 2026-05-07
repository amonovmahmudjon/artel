import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
    data: ChartData<"bar">;
    options?: ChartOptions<"bar">;
    height?: number

}


function BarChart   ({data, options, height}: BarChartProps) {
    return (
        <div>
            <Bar data={data} options={options} height={height}/>
        </div>
    )
}



export default BarChart

