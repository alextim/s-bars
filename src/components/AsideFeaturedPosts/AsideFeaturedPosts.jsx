/** @jsx jsx */
import { jsx } from '@emotion/react';

import { useTranslation } from '../../i18n';
import AsidePosts from '../AsidePosts';

const AsideFeaturedPosts = ({ items }) => {
  const { t } = useTranslation();
  return <AsidePosts title={t('post.widget.featured')} items={items} />;
};

export default AsideFeaturedPosts;
