import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { calculateIncome, calculateOutcome } from '../utils';
import { pieChart } from '../constants';

const PieChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { operations, categories } = useSelector((state) => state.auth);

  if (!operations?.length) {
    return (
      <div className="w-[380px] h-[260px] p-4 bg-white/70 rounded-md shadow-md">
        <p className="my-2 text-center">Нет данных</p>
      </div>
    );
  }

  const pieChartData = pieChart(
    calculateIncome(operations, categories),
    calculateOutcome(operations, categories)
  );

  return (
    <div className="w-[380px] h-[260px] p-4 bg-white/70 rounded-md shadow-md">
      <Doughnut
        data={pieChartData}
        width="30%"
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default PieChart;
