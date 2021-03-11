import React from 'react';

import Utils from '../../lib/utils';
import IconLink from '../IconLink';

// import { siteUrl } from '../../../config/website';
import useSiteMetadata from '../../hooks/useSiteMetadata';

const OrganizationSite = () => {
  const { siteUrl } = useSiteMetadata();
  const hostName = Utils.extractHostname(siteUrl);

  return (
    <IconLink icon="link" to={siteUrl}>
      {hostName}
    </IconLink>
  );
};

export default OrganizationSite;
