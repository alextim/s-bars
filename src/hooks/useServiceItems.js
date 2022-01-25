import { useAppContext } from '../context';
import { getServiceItems } from '../templates/shared/helpers/list-info';

const useServiceItems = () => {
  const { mainNav } = useAppContext();
  return getServiceItems(mainNav);
};

export default useServiceItems;
