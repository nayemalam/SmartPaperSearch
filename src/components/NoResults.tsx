type Props = {
  error?: string;
};

export const NoResults = ({ error }: Props) => {
  return (
    <div className="no-results-container">
      <h2>No results found</h2>
      {error && <h2 className="error">{error}</h2>}
    </div>
  );
};
