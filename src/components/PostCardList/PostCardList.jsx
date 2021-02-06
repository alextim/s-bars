/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import { space } from '../../theme/space';

import PostCard from '../PostCard';
// import loadable from '@loadable/component';
import { POSTS_PER_PAGE, POSTS_PER_ROW } from '../../../config/website';

const repeat = (t, n) => {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += i ? ` ${t}` : t;
  }
  return s;
};

const wrapStyle = {
  display: 'grid',
  gridGap: space[7],
  [mq.lg]: {
    display: 'grid',
    gridTemplateColumns: repeat('1fr', POSTS_PER_ROW),
    gridTemplateRows: repeat('auto', POSTS_PER_PAGE / POSTS_PER_ROW),
  },
};

const PostCardList = ({ posts }) => {
  // const PostCard = loadable(() => import('../PostCard'));
  return (
    <div css={wrapStyle}>
      {posts.map((post) => (
        <PostCard data={post} key={post.title} />
      ))}
    </div>
  );
};

export default PostCardList;
