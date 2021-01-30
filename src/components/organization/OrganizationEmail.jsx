import React from 'react';

import IconLink from '../IconLink';
import extraPadding from './extraPadding';
// eslint-disable-next-line no-console

const OrganizationEmail = ({ emails }) =>
  emails.map((email, i) => (
    <IconLink
      key={email}
      icon={i === 0 ? 'envelope' : ''}
      extraStyle={extraPadding}
      email={email}
    />
  ));

export default OrganizationEmail;
