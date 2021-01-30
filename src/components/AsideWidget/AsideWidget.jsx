/** @jsx jsx */
import { jsx } from '@emotion/react';

const wrapStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const AsideWidget = ({ title, children }) => (
  <div>
    <h3>{title}</h3>
    <div css={wrapStyle}>{children}</div>
  </div>
);

export default AsideWidget;
