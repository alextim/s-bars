import { useAppContext } from '../context';

const useOrgAddress = () => {
  const { address /* , translations */ } = useAppContext();
  return address;
};

export default useOrgAddress;
