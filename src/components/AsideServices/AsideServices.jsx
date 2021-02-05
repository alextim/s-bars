import React from 'react';

import { getListTitle, getListItems } from '../../utils/list-info';
import AsideButtonList from '../AsideButtonList';

const AsideServices = ({ mainNav }) => {
  return (
    <AsideButtonList
      title={getListTitle(mainNav, 'service')}
      items={getListItems(mainNav, 'service')}
    />
  );
};

export default AsideServices;
