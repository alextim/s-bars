import { useAppContext } from '../context';
import transformSocialLinks from './transformSocialLinks';

const useSocialLinks = () => {
  const { socialLinks } = useAppContext();
  return transformSocialLinks(socialLinks);
};

export default useSocialLinks;
