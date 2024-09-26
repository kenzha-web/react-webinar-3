import React from 'react';
import "./style.css";
import {cn as bem} from "@bem-react/classname";

const cn = bem('Paginator');

function pagination(currentPage, totalPages, offset = 0) {
  const pages = [];

  pages.push(1);

  if (offset > 0 && currentPage > offset) {
    pages.push('...');
  } else {
    pages.push(...Array.from({length: offset}, (_, i) => i + 2));
  }

  if (currentPage > offset && currentPage <= totalPages - offset) {
    pages.push(currentPage - 1, currentPage, currentPage + 1);
  }

  if (offset > 0 && totalPages - currentPage >= offset) {
    pages.push('...');
  } else {
    pages.push(...Array.from({length: offset}, (_, i) => totalPages - ((offset - i))));
  }

  pages.push(totalPages);

  return pages;
}

let Paginator = ({ totalItemsCount, pageSize, currentPage, onChangePage }) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  console.log(pagination(currentPage + 1, pagesCount, 3), {currentPage})

  return (
    <div className={cn()}>
      {pagination(currentPage + 1, pagesCount, 3).map((p, index) => {
        return typeof p === 'number' ? (
          <span
            key={index}
            className={cn({ ['selected-page']: currentPage + 1 === p }, 'page-number')}
            onClick={() => onChangePage(p - 1)}
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




