import React, { useState, useEffect } from 'react';
import classes from './Pagination.module.scss';

interface PaginationProps {
  items: {
    id: number;
    name: string;
    elementCategory: string;
    elementClassification: string;
    status: string;
    date: string;
    modifiedBy: string;
  }[];
  itemsPerPage: number;
  render: (
    items: {
      id: number;
      name: string;
      elementCategory: string;
      elementClassification: string;
      status: string;
      date: string;
      modifiedBy: string;
    }[],
  ) => React.ReactNode;
  handleNoOfItems: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  outOfRange: boolean;
}

const Pagination = ({
  items,
  itemsPerPage,
  render,
  handleNoOfItems,
  outOfRange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const calculateTotalPages = Math.ceil(items.length / itemsPerPage);
    setTotalPages(calculateTotalPages);
  }, [items, itemsPerPage]);

  const updateDisplayedItems = (): {
    id: number;
    name: string;
    elementCategory: string;
    elementClassification: string;
    status: string;
    date: string;
    modifiedBy: string;
  }[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPageButtons = (): React.ReactNode => {
    const pageButtons = [];
    for (let page = 1; page <= totalPages; page++) {
      pageButtons.push(
        <button
          style={
            currentPage === page
              ? {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '14px',
                  background: '#2D416F',
                  padding: '5px',
                  borderRadius: '4px',
                  border: 'none',
                  width: '30px',
                  height: '32px',
                  color: 'white',
                }
              : {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '14px',
                  background: '#E5E5E5',
                  padding: '5px',
                  borderRadius: '4px',
                  border: 'none',
                  width: '30px',
                  height: '32px',
                }
          }
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>,
      );
    }
    return pageButtons;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {render(updateDisplayedItems())}

      {/* Pagination controls */}
      <div className={classes.pagination}>
        <div className={classes.pagination__showing_container}>
          <span className={classes.pagination__showing_container__text}>
            Showing
          </span>
          <select
            className={classes.pagination__showing_container__size}
            onChange={handleNoOfItems}
          >
            <option>
              {outOfRange
                ? 'Out of Range'
                : items.slice(
                    (currentPage - 1) * itemsPerPage,
                    (currentPage - 1) * itemsPerPage + itemsPerPage,
                  ).length}
            </option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10].map((num, idx) => (
              <option key={idx}>{num}</option>
            ))}
          </select>
          <span className={classes.pagination__showing_container__text}>
            out of {items.length}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <button
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '14px',
              background: '#E5E5E5',
              padding: '5px',
              borderRadius: '4px',
              border: 'none',
              width: '30px',
              height: '32px',
            }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>

          {/* Cast the result of renderPageButtons() to an array before using slice */}
          {(renderPageButtons() as React.ReactElement[]).slice(
            Math.max(0, currentPage - 2),
            currentPage + 1,
          )}

          <button
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '14px',
              background: '#E5E5E5',
              padding: '5px',
              borderRadius: '4px',
              border: 'none',
              width: '30px',
              height: '32px',
            }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
