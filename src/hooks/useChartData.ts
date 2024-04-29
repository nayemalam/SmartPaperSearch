import { useCallback, useState } from 'react';
import { getKeywordCounts } from '../helpers';
import { ChartDataType } from '../types';

const initialData: ChartDataType = {
  labels: [],
  datasets: [
    {
      label: 'Keyword Trends',
      data: [],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const useChartData = () => {
  const [chartData, setChartData] = useState(initialData);

  const resetChartData = useCallback(() => {
    setChartData(initialData);
  }, []);

  const updateChartData = useCallback(
    (papers, query) => {
      if (!papers.length || !query) {
        resetChartData();
        return;
      }

      const keywordCounts: { [keyword: string]: number } = getKeywordCounts(
        papers,
        query,
      );

      const labels = Object.keys(keywordCounts);

      const data: ChartDataType = {
        labels,
        datasets: [
          {
            label: 'Keyword Occurrences',
            data: Object.values(keywordCounts),
            // TODO: generate random colors and maintain them for each keyword
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
            datalabels: {
              align: 'center',
              anchor: 'center',
            },
          },
        ],
      };

      setChartData(data);
    },
    [resetChartData],
  );

  return {
    resetChartData,
    chartData,
    updateChartData,
  };
};

export default useChartData;
