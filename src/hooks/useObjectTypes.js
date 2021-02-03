import { useAppContext } from '../context';

const useObjectTypes = () => {
  const { mainNav } = useAppContext();
  return { title: mainNav.edges[1].node.title, items: mainNav.edges[1].node.fields.submenu };
};

export default useObjectTypes;
