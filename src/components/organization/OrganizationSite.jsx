import utils from '@alextim/utils';

import useSiteMetadata from '@/hooks/useSiteMetadata';
import IconLink from '../IconLink';

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
