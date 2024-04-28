import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { CiSearch } from 'react-icons/ci';
import { IoIosCloudDownload } from 'react-icons/io';
import { IoReaderOutline } from 'react-icons/io5';
import Moment from 'react-moment';
import { KeywordChart } from '../components/KeywordChart';
import Pagination from '../components/Pagination';
import { normalizeQuery } from '../helpers';
import useChartData from '../hooks/useChartData';
import paperService from '../services/PaperService';

const Main = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [papers, setPapers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingAnalytics, setIsShowingAnalytics] = useState(false);

  const { resetChartData, chartData, updateChartData } = useChartData();

  const fetchPapers = useCallback(
    _.debounce(
      async (query: string, currentPage: number, itemsPerPage: number) => {
        setIsLoading(true);
        try {
          const offset = (currentPage - 1) * itemsPerPage;
          const normalizedQuery = normalizeQuery(query);
          console.log({ normalizedQuery });
          const response = await paperService.searchPaperByText(
            normalizedQuery,
            offset,
            itemsPerPage,
          );
          setPapers(response.results);
          setTotalItems(response.totalHits);
          updateChartData(response.results, query);
        } catch (error) {
          setError('Failed to fetch papers');
          console.error('Failed to fetch data:', error);
        } finally {
          setIsLoading(false);
        }
      },
      300,
    ),
    [currentPage, itemsPerPage, debouncedQuery],
  );

  useEffect(() => {
    const handler = _.debounce(() => {
      setDebouncedQuery(query);
    }, 500);

    handler();
    return handler.cancel;
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setPapers([]);
      resetChartData();
      setTotalItems(0);
      return;
    }

    fetchPapers(debouncedQuery, currentPage, itemsPerPage);
    return () => {
      fetchPapers.cancel(); // cancel the debounced call on component unmount
    };
  }, [fetchPapers, debouncedQuery, currentPage, itemsPerPage, resetChartData]);

  // auto focus on search field when doing CMD+K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault();
        document.getElementById('search-field')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="main">
      <div className="search-field">
        <h1>Knowledge Base</h1>
        <div className="relative">
          <CiSearch className="absolute search-icon" />
          <input
            id="search-field"
            type="text"
            className="search-input"
            placeholder="Search for papers (e.g., drone AND (package OR delivery))"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {isLoading && (
        <div className="loading-container-skeleton">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              gap: '10px',
              width: isShowingAnalytics ? '75%' : '100%',
              marginTop: '10px',
            }}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <ContentLoader
                key={index}
                speed={2}
                width={290}
                height={200}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={{ margin: '1rem' }}
              >
                <rect x="0" y="0" rx="0" ry="0" width="290" height="200" />
              </ContentLoader>
            ))}
          </div>
          {isShowingAnalytics && (
            <div
              style={{
                width: '25%',
              }}
            >
              <ContentLoader
                speed={2}
                width={290}
                height={300}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={{ margin: '1rem', position: 'fixed', top: '40%' }}
              >
                <rect x="0" y="0" rx="0" ry="0" width="290" height="300" />
              </ContentLoader>
            </div>
          )}
        </div>
      )}

      {!isLoading && totalItems === 0 && (
        <div className="no-results-container">
          <h2>No results found</h2>
          {error && <h2 className="error">{error}</h2>}
        </div>
      )}

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
                let link = paper.links?.find(
                  (link: any) => link.type === 'reader',
                )
                  ? paper.links?.find((link: any) => link.type === 'reader').url
                  : paper.links?.length > 0
                  ? paper.links[0].url
                  : null;

                if (!link) {
                  link = paper.downloadUrl || '#';
                }

                return (
                  <a
                    className="card card-1"
                    key={paper.id}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="top">
                      <div>
                        <h3 title={paper.title}>{paper.title}</h3>
                        <p>
                          <Moment format="MMMM Do, YYYY">
                            {paper.publishedDate}
                          </Moment>
                        </p>
                      </div>
                    </div>
                    <div className="bottom">
                      <p
                        title={paper.authors.map((author: any) => author.name)}
                      >
                        {paper.authors
                          .map((author: any) => author.name)
                          .join(', ')}
                      </p>
                      <div className="actions">
                        <div className="icon-container">
                          <IoIosCloudDownload
                            title="Download Paper"
                            onClick={(e: any) => {
                              e.preventDefault();
                              window.open(paper.downloadUrl, '_blank');
                            }}
                            className="icon"
                            color="#757575"
                            cursor="pointer"
                          />
                        </div>
                        <div className="icon-container">
                          <IoReaderOutline
                            title="Read Abstract"
                            onClick={(e: any) => {
                              e.preventDefault();
                              alert(paper.abstract);
                            }}
                            className="icon"
                            color="#757575"
                            cursor="pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                );
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
          className="button"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '150px',
          }}
          onClick={() => setIsShowingAnalytics(!isShowingAnalytics)}
        >
          {isShowingAnalytics ? 'Hide Analytics' : 'View Analytics'}
        </button>
      )}
    </div>
  );
};

export default Main;
