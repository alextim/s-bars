import React from 'react';

import PostListBase from './PostListBase';
import PostCard from './PostCard';

const cardComponent = (key, data, readMore) => (
  <PostCard key={key} data={data} readMore={readMore} />
);

const PostList = ({ data, pageContext, title, readMore }) => (
  <PostListBase
    data={data}
    pageContext={pageContext}
    title={title}
    readMore={readMore}
    cardComponent={cardComponent}
  />
);

export default PostList;
