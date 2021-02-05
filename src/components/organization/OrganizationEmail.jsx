import React from 'react';

import IconLink from '../IconLink';
import extraPadding from './extraPadding';

const OrganizationEmail = ({ emails }) =>
  emails.map((email, i) => (
    <IconLink
      key={email}
      icon={i === 0 ? 'envelope' : ''}
      extraStyle={extraPadding}
      to={`mailto:${email}`}
    >
      {email}
    </IconLink>
  ));

export default OrganizationEmail;
