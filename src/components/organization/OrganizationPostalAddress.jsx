import React from 'react';

import useOrgAddress from '../../hooks/useOrgAddress';

const OrganizationPostalAddress = () => {
  const {
    address: {
      legalName,
      postalAddress: { streetAddress, addressLocality, postalCode, addressCountryName },
    },
  } = useOrgAddress();

  return (
    <>
      <div>{legalName}</div>
      {streetAddress?.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
      <div>{`${postalCode || ''}  ${addressLocality}`}</div>
      <div>{addressCountryName}</div>
    </>
  );
};

export default OrganizationPostalAddress;
