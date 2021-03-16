/** @jsx jsx */
import { jsx } from '@emotion/react';

import container from '../../theme/container';

const ContainerFullWidth = ({ children, ...props }) => (
  <div css={container.hero} {...props}>
    {children}
  </div>
);

const Container = ({ children, ...props }) => (
  <div css={container.main} {...props}>
    {children}
  </div>
);

export { ContainerFullWidth };

export default Container;
