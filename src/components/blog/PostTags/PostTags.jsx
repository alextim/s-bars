/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

const wrapperStyle = (t) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: t.space[4],
  paddingBottom: t.space[5],
});

const itemStyle = (t) => ({
  margin: `0 ${t.space[2]}`,
  padding: `${t.space[1]} ${t.space[2]}`,
  fontSize: t.fontSizes[0],
  textDecoreation: 'none',
  backgroundColor: t.colors.muted,
});

const PostTags = ({ tags }) => {
  if (!tags) {
    return null;
  }
  return (
    <div css={wrapperStyle}>
      {tags.map(({ to, title }) => (
        <a key={to} href={to} css={itemStyle}>
          {title}
        </a>
      ))}
    </div>
  );
};

export default React.memo(PostTags);
