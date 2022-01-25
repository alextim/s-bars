import AsideButtonList from '@/components/AsideButtonList';
import { getServicesTitle, getFormattedServiceItems } from '../../../shared/helpers/list-info';

const AsideServices = ({ mainNav }) => <AsideButtonList title={getServicesTitle(mainNav)} items={getFormattedServiceItems(mainNav)} />;

export default AsideServices;
