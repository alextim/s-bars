import React from 'react';

import utils from '@alextim/utils';

import IconLink from '../IconLink';

const OrganizationPhones = ({ phones }) =>
  phones.map((phone, i) => (
    // TODO: \AT_Lib\trackCallLink($title)
    <IconLink key={phone} icon={i === 0 ? 'phone' : ''} to={utils.phoneUrl(phone)}>
      {utils.formatPhone(phone)}
    </IconLink>
  ));

export default OrganizationPhones;
