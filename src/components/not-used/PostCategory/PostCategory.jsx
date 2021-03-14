import React from 'react';
import kebabCase from 'lodash/kebabCase';
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
      {category.map((cat) => (
        <Link key={cat} to={`/category/${kebabCase(cat)}/`} css={itemStyle}>
          {cat}
        </Link>
      ))}
    </div>
  );
};

export default React.memo(PostCategory);
