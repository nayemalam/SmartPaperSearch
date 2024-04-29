import { Paper } from '../types';

export const normalizeQuery = (query: string) => {
  return query
    .replace(/\s*(AND|OR)\s*/gi, ' $1 ') // Ensure space around AND and OR
    .replace(/(\(|\))/g, ' $1 ') // Ensure space around parentheses
    .trim()
    .replace(/\s+/g, ' '); // Convert multiple spaces to a single space
};

export const getKeywordCounts = (
  papers: Paper[],
  query: string,
): { [keyword: string]: number } => {
  const keywordCounts: { [keyword: string]: number } = {};
  const keywords = Array.from(
    new Set(query.toLowerCase().match(/\b(\w+)\b/g) || []),
  );

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

  return keywordCounts;
};
