/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';

const containerFullWidthStyle = {
  minWidth: '320px',
  maxWidth: '1280px',
  margin: '0 auto',
};

const containerStyle = {
  ...containerFullWidthStyle,
  padding: '0 1rem',
  [mq.sm]: {
    padding: '0 2rem',
  },
};

const ContainerFullWidth = ({ children, ...props }) => (
  <div css={containerFullWidthStyle} {...props}>
    {children}
  </div>
);

const Container = ({ children, ...props }) => (
  <div css={containerStyle} {...props}>
    {children}
  </div>
);

export { ContainerFullWidth };

export default Container;
