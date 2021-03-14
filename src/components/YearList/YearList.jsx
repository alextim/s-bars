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

const YearList = ({ years, count = false }) => {
  if (!years) {
    return null;
  }
  return (
    <div css={wrapperStyle}>
      {Object.keys(years).map((y) => (
        <Link key={y} to={years[y].to} css={itemStyle}>
          {y}
          {count && `: ${years[y].count}`}
        </Link>
      ))}
    </div>
  );
};

export default React.memo(YearList);
