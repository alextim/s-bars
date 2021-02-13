import React from 'react';

import { getServicesTitle, getServiceItems } from '../../utils/list-info';
import AsideButtonList from '../AsideButtonList';

const AsideServices = ({ mainNav }) => {
  return <AsideButtonList title={getServicesTitle(mainNav)} items={getServiceItems(mainNav)} />;
};

export default AsideServices;
