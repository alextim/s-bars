/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';

const wrapperStyle = (t) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: t.space[4],
  paddingBottom: t.space[5],
});

const itemStyle = (t) => ({
  marginBottom: t.space[2],
  marginRight: t.space[2],
  padding: `${t.space[1]} ${t.space[2]}`,
  fontSize: t.fontSizes[0],
  textDecoreation: 'none',
  backgroundColor: t.colors.muted,
});

const TagList = ({ tags, count = false }) => {
  if (!tags) {
    return null;
  }
  return (
    <div css={wrapperStyle}>
      {Object.keys(tags).map((tag) => (
        <Link key={tag} to={tags[tag].to} css={itemStyle}>
          {tag}
          {count && `: ${tags[tag].count}`}
        </Link>
      ))}
    </div>
  );
};

export default React.memo(TagList);
