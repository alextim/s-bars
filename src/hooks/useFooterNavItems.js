import { useAppContext } from '../context';
import Utils from '../lib/utils';

const useFooterNavItems = () => {
  const { footerNav } = useAppContext();
  return footerNav.edges.map(({ node: { title, fields: { to } } }) => ({
    title,
    to: Utils.formatUrl(to),
  }));
};

export default useFooterNavItems;
