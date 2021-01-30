import React from 'react';
import loadable from '@loadable/component';

const PostCardList = ({ posts }) => {
  const PostCard = loadable(() => import('../PostCard'));
  return (
    <div>
      {posts.map((post) => (
        <PostCard data={post} key={post.title} />
      ))}
    </div>
  );
};

export default React.memo(PostCardList);
