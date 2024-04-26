import {
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CiSearch } from 'react-icons/ci';
import { FiExternalLink } from 'react-icons/fi';
import { IoIosCloudDownload } from 'react-icons/io';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';
import { Skeleton } from '../components/Skeleton';
import { normalizeQuery } from '../helpers';
import paperService from '../services/PaperService';

type ChartDataType = ChartData<'bar', number[], string>;

const initialChartData: ChartDataType = {
  labels: [],
  datasets: [
    {
      label: 'Keyword Occurrences',
      data: [],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const Main = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [papers, setPapers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartDataType>(initialChartData);
  const [isShowingAnalytics, setIsShowingAnalytics] = useState(false);

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
          updateChartData(response.results);
        } catch (error) {
          setError('Failed to fetch papers');
          console.error('Failed to fetch data:', error);
        } finally {
          setIsLoading(false);
        }
      },
      300,
    ),
    [currentPage, itemsPerPage, query],
  );

  const keywordColorMap: any = {};

  function getColorForKeyword(keyword: string) {
    if (keywordColorMap[keyword]) {
      return keywordColorMap[keyword];
    }
    const newColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255,
    )}, ${Math.floor(Math.random() * 255)}, 0.5)`;
    keywordColorMap[keyword] = newColor;
    return newColor;
  }

  const updateChartData = (papers: any[]) => {
    const keywordCounts: { [keyword: string]: number } = {};
    const keywords = query.toLowerCase().match(/\b(\w+)\b/g) || [];

    papers.forEach(paper => {
      keywords.forEach(keyword => {
        const countInTitle = (
          paper.title.match(new RegExp(`\\b${keyword}\\b`, 'gi')) || []
        ).length;
        const countInAbstract = (
          paper.abstract.match(new RegExp(`\\b${keyword}\\b`, 'gi')) || []
        ).length;
        keywordCounts[keyword] =
          (keywordCounts[keyword] || 0) + countInTitle + countInAbstract;
      });
    });

    const colors = keywords.map(getColorForKeyword);

    const data: ChartDataType = {
      labels: Object.keys(keywordCounts),
      datasets: [
        {
          label: 'Keyword Occurrences',
          data: Object.values(keywordCounts),
          backgroundColor: colors,
          datalabels: {
            align: 'end',
            anchor: 'end',
          },
        },
      ],
    };

    setChartData(data);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        anchor: 'center' as const,
        align: 'center' as const,
        textAlign: 'center' as const,
        // offset: -50,
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
      setChartData(initialChartData);
      return;
    }

    fetchPapers(debouncedQuery, currentPage, itemsPerPage);
    return () => {
      fetchPapers.cancel(); // cancel the debounced call on component unmount
    };
  }, [fetchPapers, debouncedQuery, currentPage, itemsPerPage]);

  return (
    <div className="main">
      <div className="search-field">
        <h1>Knowledge Base</h1>
        <div className="relative">
          <CiSearch className="absolute search-icon" />
          <input
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
              marginTop: '50px',
            }}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton
                key={index}
                style={{
                  height: '200px',
                  margin: '1rem',
                  width: '290px',
                }}
              />
            ))}
          </div>
          {isShowingAnalytics && (
            <div
              style={{
                width: '25%',
              }}
            >
              <Skeleton
                style={{
                  height: '300px',
                  margin: '1rem',
                  width: '300px',
                  position: 'fixed',
                  top: '40%',
                }}
              />
            </div>
          )}
        </div>
      )}

      {!isLoading && totalItems === 0 && (
        <div className="no-results-container">
          <h2>No results found</h2>
          {error && <h2>{error}</h2>}
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
              papers.map(paper => (
                <div
                  className="card card-1"
                  key={paper.id}
                  onClick={() => {
                    const link = paper.links?.find(
                      (link: any) => link.type === 'reader',
                    )
                      ? paper.links?.find((link: any) => link.type === 'reader')
                          .url
                      : paper.links?.length > 0
                      ? paper.links[0].url
                      : null;

                    if (link) {
                      return window.open(link, '_blank');
                    } else {
                      toast.error('No link available');
                    }
                  }}
                >
                  <div className="top">
                    <div>
                      <h3 title={paper.title}>{paper.title}</h3>
                      <p>
                        <Moment format="MMMM Do YYYY">
                          {paper.publishedDate}
                        </Moment>
                      </p>
                    </div>
                  </div>
                  <div className="bottom">
                    <p title={paper.authors.map((author: any) => author.name)}>
                      {paper.authors
                        .map((author: any) => author.name)
                        .join(', ')}
                    </p>
                    <div className="actions">
                      <div className="icon-container">
                        <IoIosCloudDownload
                          onClick={() =>
                            window.open(paper.downloadUrl, '_blank')
                          }
                          className="icon"
                          color="#757575"
                          cursor="pointer"
                          width="20"
                          height="20"
                        />
                      </div>
                      <div className="icon-container">
                        <FiExternalLink
                          onClick={() => {
                            const link = paper.links?.find(
                              (link: any) => link.type === 'reader',
                            )
                              ? paper.links?.find(
                                  (link: any) => link.type === 'reader',
                                ).url
                              : paper.links?.length > 0
                              ? paper.links[0].url
                              : null;

                            if (link) {
                              return window.open(link, '_blank');
                            } else {
                              toast.error('No link available');
                            }
                          }}
                          className="icon"
                          color="#757575"
                          cursor="pointer"
                          width="20"
                          height="20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>

          {isShowingAnalytics && (
            <div
              style={{
                height: '300px',
                width: '300px',
                alignSelf: 'center',
              }}
            >
              <Bar
                data={chartData}
                options={options}
                style={{ position: 'fixed', top: '40%' }}
              />
            </div>
          )}
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
