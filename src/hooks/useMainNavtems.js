import { useAppContext } from '../context';
import Utils from '../lib/utils';

const useMainNavtems = () => {
  const { mainNav } = useAppContext();
  return mainNav.edges.map(
    ({
      node: {
        title,
        fields: { to, submenu },
      },
    }) => {
      const o = {
        title,
        to: Utils.formatUrl(to),
      };
      if (submenu) {
        o.submenu = submenu.map((el) => ({ title: el.title, to: Utils.formatUrl(el.to) }));
      }
      return o;
    },
  );
};

export default useMainNavtems;
