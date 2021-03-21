import React from 'react';

import utils from '@alextim/utils';

import IconLink from '../IconLink';

// import { siteUrl } from '../../../config/website';
import useSiteMetadata from '../../hooks/useSiteMetadata';

const OrganizationSite = () => {
  const { siteUrl } = useSiteMetadata();
  const hostName = utils.extractHostname(siteUrl);

  return (
    <IconLink icon="link" to={siteUrl}>
      {hostName}
    </IconLink>
  );
};

export default OrganizationSite;
