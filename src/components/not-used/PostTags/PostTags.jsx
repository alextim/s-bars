/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import kebabCase from 'lodash/kebabCase';

import { useLocale } from '../../../i18n/i18n-context';
import i18n from '../../../i18n';
import TagList from '../../TagList';

const PostTags = ({ tags }) => {
  const { locale } = useLocale();
  if (!tags) {
    return null;
  }
  return (
    <TagList
      tags={tags.reduce((acc, tag) => {
        acc[tag] = { to: i18n.localizePath(`/tags/${kebabCase(tag)}/`, locale) };
        return acc;
      }, {})}
    />
  );
};

export default React.memo(PostTags);
