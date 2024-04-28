import ContentLoader from 'react-content-loader';

type Props = {
  isShowingAnalytics?: boolean;
};

export const MainLoadingSkeleton = ({ isShowingAnalytics }: Props) => {
  return (
    <div className="loading-container-skeleton">
      <div
        className="card-skeleton-container"
        style={{
          width: isShowingAnalytics ? '75%' : '100%',
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
            className="card-skeleton"
          >
            <rect x="0" y="0" rx="0" ry="0" width="290" height="200" />
          </ContentLoader>
        ))}
      </div>
      {isShowingAnalytics && (
        <div className="chart-skeleton-container">
          <ContentLoader
            speed={2}
            width={290}
            height={300}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            className="chart-skeleton"
          >
            <rect x="0" y="0" rx="0" ry="0" width="290" height="300" />
          </ContentLoader>
        </div>
      )}
    </div>
  );
};
