/* eslint-disable react/jsx-props-no-spreading */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import merge from 'lodash/merge';

import mq from '../../theme/media-queries';

const containerFullWidthStyle = {
  minWidth: '320px',
  maxWidth: '1280px',
  margin: '0 auto',
};

const containerStyle = {
  margin: '0 auto',
  padding: '0 1rem',
  [mq.sm]: {
    padding: '0 2rem',
  },
};

const Wrapper = ({ children }) => <div css={containerStyle}>{children}</div>;

const ContainerFullWidth = ({ children, css = {}, ...props }) => (
  <div css={merge(containerFullWidthStyle, css)} {...props}>
    {children}
  </div>
);

const Container = ({ children, css = {}, ...props }) => (
  <ContainerFullWidth css={merge(containerStyle, css)} {...props}>
    {children}
  </ContainerFullWidth>
);

export { ContainerFullWidth, Wrapper };

export default Container;
