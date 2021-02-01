import React from 'react';

import { useAppContext } from '../../context';

const OrganizationPostalAddress = () => {
  const {
    address: {
      legalName,
      postalAddress: { streetAddress, addressLocality, postalCode, addressCountry },
    },
  } = useAppContext();

  return (
    <>
      <div>{legalName}</div>
      {streetAddress && streetAddress.map((item, i) => <div key={i}>{item}</div>)}
      <div>{`${postalCode || ''}  ${addressLocality}`}</div>
      <div>{addressCountry}</div>
    </>
  );
};

export default OrganizationPostalAddress;
