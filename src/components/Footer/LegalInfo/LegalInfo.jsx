import React from 'react';

const LegalInfo = ({ foundingDate, legalName, text }) => {
  return (
    <div>{`© ${
      foundingDate ? `${new Date(foundingDate).getFullYear()}-` : ''
    }${new Date().getFullYear()} ${legalName}${text ? `. ${text}` : ''}`}</div>
  );
};

export default LegalInfo;
