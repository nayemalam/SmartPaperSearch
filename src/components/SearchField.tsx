import { useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';

type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export const SearchField = ({ query, setQuery }: Props) => {
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
  );
};
