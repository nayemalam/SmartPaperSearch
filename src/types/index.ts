import { ChartData } from 'chart.js';

export type Paper = {
  id: string;
  title: string;
  authors: Array<{ name: string }>;
  datePublished: string;
  abstract: string;
};

export type ChartDataType = ChartData<'bar', number[], string>;
