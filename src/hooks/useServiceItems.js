import { useAppContext } from '../context';
import { getServiceItems } from '../helpers/list-info';

const useServiceItems = () => {
  const { mainNav } = useAppContext();
  return getServiceItems(mainNav);
};

export default useServiceItems;
