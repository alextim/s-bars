import { useAppContext } from '../context';

const useMainNavtems = () => {
  const { mainNav } = useAppContext();
  return mainNav.edges.map(({ node: { title, to, submenu } }) => {
    const o = {
      title,
      to,
    };
    if (submenu) {
      o.submenu = submenu.map((el) => ({ title: el.title, to: el.to }));
    }
    return o;
  });
};

export default useMainNavtems;
