/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';

import fonts from '../../../theme/fonts';

const headingStyle = {
  marginBottom: '0.4rem',
  fontFamily: fonts.body,
  textTransform: 'none',
  textAlign: 'unset',
};

const FooterWidget = ({ title, children }) => (
  <React.Fragment>
    <h3 css={headingStyle}>{title}</h3>
    {children}
  </React.Fragment>
);

export default FooterWidget;
