/* eslint-disable react/jsx-fragments */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Fragment } from 'react';

const headingStyle = {
  marginBottom: '0.3rem',
};

const FooterWidget = ({ title, children }) => (
  <Fragment>
    <h3 css={headingStyle}>{title}</h3>
    {children}
  </Fragment>
);

export default FooterWidget;
