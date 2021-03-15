/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../../theme/media-queries';
import { space } from '../../../theme/space';

import PostCard from '../PostCard';
// import loadable from '@loadable/component';
import card from '../../../theme/card';

const wrapStyle = {
  display: 'grid',
  gridGap: space[7],
  [mq.md]: {
    display: 'grid',
    gridTemplateColumns: `repeat(${card.perRow.md}, 1fr)`,
  },
  [mq.lg]: {
    display: 'grid',
    gridTemplateColumns: `repeat(${card.perRow.lg}, 1fr)`,
  },
};

const PostCardList = ({ posts }) => {
  // const PostCard = loadable(() => import('../PostCard'));
  return (
    <div css={wrapStyle}>
      {posts.map((post) => (
        <PostCard key={post.path} data={post} />
      ))}
    </div>
  );
};

export default PostCardList;
