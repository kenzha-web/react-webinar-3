import React, { useState } from 'react';
import "./style.css";
import { cn as bem } from "@bem-react/classname";

const cn = bem('Paginator');

function pagination(currentPage, totalPages, offset = 3) {
  const pages = [];

  pages.push(1);

  if (currentPage === 1 || currentPage === 2) {
    for (let i = 2; i <= Math.min(3, totalPages); i++) {
      pages.push(i);
    }
    if (totalPages > 3) {
      pages.push('...');
    }
  }

  else if (currentPage === 3) {
    for (let i = 2; i <= Math.min(4, totalPages); i++) {
      pages.push(i);
    }
    if (totalPages > 4) {
      pages.push('...');
    }
  }

  else if (currentPage > 3 && currentPage <= totalPages - 3) {
    pages.push('...');
    pages.push(currentPage - 1, currentPage, currentPage + 1);
    pages.push('...');
  }

  else if (currentPage === totalPages - 2) {
    pages.push('...');
    pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  }

  else if (currentPage > totalPages - 3) {
    if (totalPages > 4) {
      pages.push('...');
    }
    for (let i = totalPages - 2; i <= totalPages; i++) {
      if (i > 1) pages.push(i);
    }
  }

  if (totalPages > 1 && pages[pages.length - 1] !== totalPages) {
    pages.push(totalPages);
  }

  return pages;
}

let Paginator = ({ totalItemsCount, pageSize, currentPage, onChangePage }) => {
  const [showAllPages, setShowAllPages] = useState(false);

  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  const displayPageLimit = showAllPages ? pagesCount : 25;

  const handlePageChange = (page) => {
    if (page === 18 || page === 25) {
      setShowAllPages(true);
    }
    onChangePage(page - 1);
  };

  return (
    <div className={cn()}>
      {pagination(currentPage + 1, displayPageLimit, 3).map((p, index) => {
        return typeof p === 'number' ? (
          <span
            key={index}
            className={cn({ ['selected-page']: currentPage + 1 === p }, 'page-number')}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </span>
        ) : (
          <span key={index} className={cn('dots')}>
            {p}
          </span>
        );
      })}
    </div>
  );
};

export default Paginator;
