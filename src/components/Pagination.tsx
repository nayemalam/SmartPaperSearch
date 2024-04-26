import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

type Props = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (number: number) => void;
};

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <div>
        <label htmlFor="itemsPerPage">Results per page</label>
        <select
          value={itemsPerPage}
          onChange={e => onItemsPerPageChange(parseInt(e.target.value, 10))}
        >
          {[10, 20, 30, 50].map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px',
        }}
      >
        {currentPage > 1 && (
          <button
            className="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalItems === 0}
          >
            <GoChevronLeft />
          </button>
        )}
        {/* {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={index + 1 === currentPage ? 'active' : ''}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))} */}
        <p className="page">
          Page {currentPage} of {totalPages.toLocaleString()}
        </p>
        <button
          className="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalItems === 0}
        >
          <GoChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
