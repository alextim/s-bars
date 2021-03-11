import React from 'react';

import IconLink from '../IconLink';

import { obfuscate } from '../../lib/utils';

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
