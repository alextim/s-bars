/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';

const wrapperStyle = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: t.space[4],
  paddingBottom: t.space[5],
});

const itemStyle = (t) => ({
  fontSize: t.fontSizes[0],
});

const CategoryList = ({ categories, count = false }) => {
  if (!categories) {
    return null;
  }
  return (
    <div css={wrapperStyle}>
      {Object.keys(categories).map((to) => (
        <Link key={to} to={to} css={itemStyle}>
          {categories[to].title}
          {count && `: ${categories[to].count}`}
        </Link>
      ))}
    </div>
  );
};

export default React.memo(CategoryList);
