import { getServicesTitle, getFormattedServiceItems } from '@/helpers/list-info';
import AsideButtonList from '../AsideButtonList';

const AsideServices = ({ mainNav }) => <AsideButtonList title={getServicesTitle(mainNav)} items={getFormattedServiceItems(mainNav)} />;

export default AsideServices;
