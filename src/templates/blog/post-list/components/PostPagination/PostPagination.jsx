/* eslint-disable no-console */
import { Link } from 'gatsby';

import { space } from '@/theme/space';
import colors from '@/theme/colors';

import { currentLink, prevLink, nextLink } from './page-link-params';

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

const styleWrap = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
  margin: '3rem 0',
};

const stylePaginationNumber = {
  height: '2.5rem',
  margin: `0 ${space[1]}`,
  minWidth: '2.5rem',
  textAlign: 'center',
  transition: 'box-shadow .2s',
  ':hover': {
    boxShadow: `0 2px 0 0 ${colors.highlight}`,
    textDecoration: 'none',
  },
};

const styleActive = {
  color: colors.highlight,
  boxShadow: `0 2px 0 0 ${colors.highlight}`,
};

const PostPagination = ({ currentPage, numPages, slug }) => {
  if (numPages <= 1) {
    return null;
  }
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const pages = pagination(currentPage, numPages);

  return (
    <div css={styleWrap}>
      {!isFirst && <Link to={prevLink(currentPage, slug)}>{'<'}</Link>}
      {pages.map((page) => {
        if (typeof page !== 'number') {
          return <span key="ellipsis">{page}</span>;
        }
        return (
          <Link
            key={page}
            to={currentLink(page, slug)}
            css={{
              ...stylePaginationNumber,
              ...(page === currentPage ? styleActive : {}),
            }}
          >
            {page}
          </Link>
        );
      })}
      {!isLast && (
        <Link to={nextLink(currentPage, slug)} css={stylePaginationNumber}>
          {'>'}
        </Link>
      )}
    </div>
  );
};

export default PostPagination;
