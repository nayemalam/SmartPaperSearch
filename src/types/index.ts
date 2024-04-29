import { ChartData } from 'chart.js';

export type Link = {
  type: string;
  url: string;
};

export type Paper = {
  id: string;
  title: string;
  authors: Array<{ name: string }>;
  abstract: string;
  links: Link[];
  downloadUrl: string;
  publishedDate: string;
  // ...
};

export type ChartDataType = ChartData<'bar', number[], string>;
