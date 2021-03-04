import React from 'react';

import { getServicesTitle, getFormattedServiceItems } from '../../utils/list-info';
import AsideButtonList from '../AsideButtonList';

const AsideServices = ({ mainNav }) => {
  return (
    <AsideButtonList title={getServicesTitle(mainNav)} items={getFormattedServiceItems(mainNav)} />
  );
};

export default AsideServices;
