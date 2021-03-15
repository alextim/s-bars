import React from 'react';
import { Link } from 'gatsby';

import FaFolder from '../../../assets/fa/regular/folder.svg';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

const iconStyle = (t) => ({
  marginRight: t.space[1],
});
const itemStyle = (t) => ({
  marginRight: t.space[1],
});

const PostCategory = ({ category }) => {
  if (!category) {
    return null;
  }
  return (
    <div css={wrapperStyle}>
      <FaFolder className="fa" css={iconStyle} />
      {category.map(({ to, title }) => (
        <Link key={to} to={to} css={itemStyle}>
          {title}
        </Link>
      ))}
    </div>
  );
};

export default React.memo(PostCategory);
