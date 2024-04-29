import SearchImage from '../assets/images/search.png';

type Props = {
  error?: string;
  query?: string;
};

export const NoResults = ({ error, query }: Props) => {
  return (
    <div className="no-results-container">
      <img src={SearchImage} alt="No results found" />
      <h2>No results found {query && `for "${query}"`}</h2>
      {error && <h2 className="error">{error}</h2>}
    </div>
  );
};
