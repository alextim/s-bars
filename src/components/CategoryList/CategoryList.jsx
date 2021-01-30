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
      {Object.keys(categories).map((cat) => (
        <Link key={cat} to={categories[cat].to} css={itemStyle}>
          {cat}
          {count && `: ${categories[cat].count}`}
        </Link>
      ))}
    </div>
  );
};

export default React.memo(CategoryList);
