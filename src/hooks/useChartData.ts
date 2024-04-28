import { useCallback, useState } from 'react';
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

      const keywordCounts: { [keyword: string]: number } = {};
      const keywords = query.toLowerCase().match(/\b(\w+)\b/g) || [];

      papers.forEach((paper: any) => {
        keywords.forEach((keyword: any) => {
          let countInTitle = 0;
          let countInAbstract = 0;
          if (paper.title) {
            countInTitle = (
              paper.title.match(new RegExp(`\\b${keyword}\\b`, 'gi')) || []
            ).length;
          }

          if (paper.abstract) {
            countInAbstract = (
              paper.abstract.match(new RegExp(`\\b${keyword}\\b`, 'gi')) || []
            ).length;
          }

          keywordCounts[keyword] =
            (keywordCounts[keyword] || 0) + countInTitle + countInAbstract;
        });
      });

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
