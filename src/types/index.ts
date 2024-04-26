export type Paper = {
  id: string;
  title: string;
  authors: Array<{ name: string }>;
  datePublished: string;
  abstract: string;
};
