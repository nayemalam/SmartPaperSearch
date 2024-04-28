import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { ChartDataType } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

type Props = {
  chartData: ChartDataType;
};

export const KeywordChart = ({ chartData }: Props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: '#000',
        formatter: (
          value: {
            x: number;
            y: number;
          },
          context: Context,
        ) => {
          return context.dataset.data[context.dataIndex];
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} className="keyword-chart" />
    </div>
  );
};
