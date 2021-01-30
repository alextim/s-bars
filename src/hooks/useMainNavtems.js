import { useAppContext } from '../context';

const useMainNavtems = () => {
  const { mainNav } = useAppContext();
  return mainNav.edges.map(({ node: { title, fields: { to, submenu } } }) => ({
    title,
    to,
    submenu: submenu ? [...submenu] : null,
  }));
};

export default useMainNavtems;
