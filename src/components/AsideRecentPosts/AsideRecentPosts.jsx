import { useTranslation } from '@/i18n';
import AsidePosts from '../AsidePosts';

const AsideRecentPosts = ({ items }) => {
  const { t } = useTranslation();
  return <AsidePosts title={t('post.widget.recent')} items={items} />;
};

export default AsideRecentPosts;
