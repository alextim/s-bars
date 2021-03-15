/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';

import TagList from '../TagList';

const PostTags = ({ tags }) => {
  if (!tags) {
    return null;
  }
  return <TagList tags={tags} />;
};

export default React.memo(PostTags);
