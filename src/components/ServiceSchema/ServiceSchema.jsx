import React from 'react';
import { Helmet } from 'react-helmet';

import config from '../../../s-bars.content/config/website';
import useOrgContacts from '../../hooks/useOrgContacts';

const getOrganizationSchema = (orgContacts, orgAddress) => {
  const { organizationType } = orgContacts;

  const { name, postalAddress } = orgAddress;

  const schema = {
    '@type': organizationType,
    name,
    url: config.siteUrl,
  };

  if (postalAddress) {
    const o = {
      '@type': 'PostalAddress',
      ...postalAddress,
    };
    if (postalAddress.streetAddress) {
      o.streetAddress = postalAddress.streetAddress.join(', ');
    }
    delete o.addressCountryName;
    schema.address = o;
  }

  return schema;
};

const getAreaServed = (orgAddress) => {
  const { postalAddress } = orgAddress;
  if (!postalAddress) {
    return null;
  }
  const { addressCountryName } = postalAddress;
  if (!addressCountryName) {
    return null;
  }
  return {
    '@type': 'Country',
    name: addressCountryName,
  };
};

const ServiceSchema = ({ pathname, title, address }) => {
  const orgContacts = useOrgContacts();
  const url = `${config.siteUrl}${pathname}`;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: title,
          url,
          provider: getOrganizationSchema(orgContacts, address),
          areaServed: getAreaServed(address),
        })}
      </script>
    </Helmet>
  );
};

export default ServiceSchema;
