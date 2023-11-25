import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getStatistics } from '../utils';
import { lineChart } from '../constants';

const LineChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const { operations, categories } = useSelector((state) => state.auth);

  if (!operations?.length) {
    return (
      <div className="w-[380px] h-[260px] p-4 bg-white/70 rounded-md shadow-md">
        <p className="my-2 text-center">Нет данных</p>
      </div>
    );
  }

  const { labels, stats } = getStatistics(operations, categories);

  const lineChartData = lineChart(labels, stats);

  return (
    <div className="w-[470px] h-[260px] p-4 bg-white/70 rounded-md shadow-md text-lg">
      <Bar data={lineChartData.data} options={lineChartData.options} />
    </div>
  );
};

export default LineChart;
