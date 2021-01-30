import React from 'react';

import Utils from '../../lib/utils';
import IconLink from '../IconLink';
import extraPadding from './extraPadding';

const OrganizationPhones = ({ phones }) =>
  phones.map((phone, i) => (
    // TODO: \AT_Lib\trackCallLink($title)
    <IconLink
      key={phone}
      icon={i === 0 ? 'phone' : ''}
      to={Utils.phoneUrl(phone)}
      extraStyle={extraPadding}
    >
      {Utils.formatPhone(phone)}
    </IconLink>
  ));

export default OrganizationPhones;
