import { useState } from 'react';
import { Card } from '../components/Card';
import { KeywordChart } from '../components/KeywordChart';
import { MainLoadingSkeleton } from '../components/MainLoadingSkeleton';
import { NoResults } from '../components/NoResults';
import Pagination from '../components/Pagination';
import { SearchField } from '../components/SearchField';
import useChartData from '../hooks/useChartData';
import useSearch from '../hooks/useSearch';

const Main = () => {
  const [isShowingAnalytics, setIsShowingAnalytics] = useState(false);

  const { chartData, updateChartData } = useChartData();

  const {
    query,
    setQuery,
    results: papers,
    totalItems,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  } = useSearch({
    updateChartDataFunction: updateChartData,
    defaultQuery: '',
    defaultPage: 1,
    defaultItemsPerPage: 10,
    debounceDelay: 300,
  });

  return (
    <div className="main">
      <SearchField query={query} setQuery={setQuery} />

      {isLoading && (
        <MainLoadingSkeleton isShowingAnalytics={isShowingAnalytics} />
      )}

      {!isLoading && totalItems === 0 && <NoResults error={error} />}

      {totalItems > 0 && !isLoading && papers.length > 0 && (
        <div className="container">
          <div
            className="cards"
            style={{
              width: isShowingAnalytics ? '75%' : '100%',
            }}
          >
            {!isLoading &&
              totalItems > 0 &&
              papers.map(paper => {
                return <Card key={paper.id} paper={paper} />;
              })}

            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>

          {isShowingAnalytics && <KeywordChart chartData={chartData} />}
        </div>
      )}

      {totalItems > 0 && !isLoading && papers.length > 0 && (
        <button
          className="button analytics-button"
          onClick={() => setIsShowingAnalytics(!isShowingAnalytics)}
        >
          {isShowingAnalytics ? 'Hide Analytics' : 'View Analytics'}
        </button>
      )}
    </div>
  );
};

export default Main;
