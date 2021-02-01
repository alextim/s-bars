/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';

const headingStyle = {
  marginBottom: '0.3rem',
};

const FooterWidget = ({ title, children }) => (
  <React.Fragment>
    <h3 css={headingStyle}>{title}</h3>
    {children}
  </React.Fragment>
);

export default FooterWidget;
