import { useAppContext } from '../context';

const useFooterNavItems = () => {
  const { footerNav } = useAppContext();
  return footerNav.edges.map(({ node: { title, to } }) => ({
    title,
    to,
  }));
};

export default useFooterNavItems;
