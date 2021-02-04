import React from 'react';
import { Link } from 'gatsby';

import { useLocale } from '../../i18n/i18n-context';
import i18n from '../../i18n';

// https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
function pagination(currentPage, pageCount, delta = 2) {
  const separate = (a, b) => [
    a,
    ...({
      0: [],
      1: [b],
      2: [a + 1, b],
    }[b - a] || ['...', b]),
  ];

  return Array(delta * 2 + 1)
    .fill()
    .map((_, index) => currentPage - delta + index)
    .filter((page) => page > 0 && page <= pageCount)
    .flatMap((page, index, { length }) => {
      if (!index) {
        return separate(1, page);
      }
      if (index === length - 1) {
        return separate(page, pageCount);
      }

      return [page];
    });
}

const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
  margin: '3rem 0',
};

const paginationNumberStyle = (t) => ({
  height: '2.5rem',
  margin: `0px ${t.space[1]}`,
  minWidth: '2.5rem',
  textAlign: 'center',
  transition: 'box-shadow .2s',
  ':hover': {
    boxShadow: '0 2px 0 0 #5f6368',
    textDecoration: 'none',
  },
});

const activeStyle = {
  color: '#000',
  boxShadow: '0 2px 0 0 #000',
};

const PostPagination = ({ currentPage, numPages, subpath }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : `/${(currentPage - 1).toString()}`;
  const nextPage = `/${(currentPage + 1).toString()}`;
  const pages = pagination(currentPage, numPages);

  const { locale } = useLocale();
  return (
    <div css={wrapperStyle}>
      {!isFirst && (
        <Link to={i18n.localizePath(`${subpath}${prevPage}`, locale)} rel="prev">
          {'<'}
        </Link>
      )}
      {pages.map((page) => {
        if (typeof page !== 'number') {
          return <span key="ellipsis">{page}</span>;
        }
        return (
          <Link
            key={`pagination-number${page}`}
            to={i18n.localizePath(`${subpath}${page === 1 ? '' : `/${page}`}`, locale)}
            css={(t) => ({
              ...paginationNumberStyle(t),
              ...(page === currentPage ? activeStyle : {}),
            })}
          >
            {page}
          </Link>
        );
      })}
      {!isLast && (
        <Link
          to={i18n.localizePath(`${subpath}${nextPage}`, locale)}
          rel="next"
          css={paginationNumberStyle}
        >
          {'>'}
        </Link>
      )}
    </div>
  );
};

export default PostPagination;
