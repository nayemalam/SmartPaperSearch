import _ from 'lodash';
import { useEffect, useState } from 'react';
import { normalizeQuery } from '../helpers';
import paperService from '../services/PaperService';
import { Paper } from '../types';

type Props = {
  updateChartDataFunction?: (papers: any[], query: string) => void;
  defaultQuery?: string;
  defaultPage?: number;
  defaultItemsPerPage?: number;
  debounceDelay?: number;
};

const useSearch = ({
  updateChartDataFunction,
  defaultQuery = '',
  defaultPage = 1,
  defaultItemsPerPage = 10,
  debounceDelay = 300,
}: Props) => {
  const [query, setQuery] = useState(defaultQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(defaultQuery);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [results, setResults] = useState<Paper[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = _.debounce(() => {
      setDebouncedQuery(query);
    }, debounceDelay);

    handler();
    return () => {
      handler.cancel();
    };
  }, [query, debounceDelay]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setTotalItems(0);
      updateChartDataFunction?.([], '');
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError('');
      try {
        const normalizedQuery = normalizeQuery(debouncedQuery);
        const offset = (currentPage - 1) * itemsPerPage;
        const response = await paperService.searchPaperByText(
          normalizedQuery,
          offset,
          itemsPerPage,
        );
        setResults(response.results);
        setTotalItems(response.totalHits);
        updateChartDataFunction?.(response.results, debouncedQuery);
      } catch (err) {
        setError('Failed to fetch papers');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, currentPage, itemsPerPage, updateChartDataFunction]);

  return {
    query,
    setQuery,
    results,
    totalItems,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
};

export default useSearch;
