import React from 'react';
import { obfuscate } from '@alextim/utils';

import IconLink from '../IconLink';

const EmailLink = ({ email, hideIcon }) => {
  const e = obfuscate(email);
  return (
    <IconLink icon={hideIcon ? '' : 'envelope'} to={`mailto:${e}`}>
      {e}
    </IconLink>
  );
};

const OrganizationEmail = ({ emails }) =>
  emails.map((email, i) => <EmailLink key={email} email={email} hideIcon={i} />);

export default OrganizationEmail;
