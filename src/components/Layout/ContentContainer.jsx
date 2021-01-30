/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import sizes from '../../theme/sizes';

import Container from '../Container';

const containerStyle = {
  marginTop: sizes.header.sm,
  [mq.xl]: {
    marginTop: sizes.header.xxl,
  },
};

const ContentContainer = ({ children }) => <Container css={containerStyle}>{children}</Container>;

export default ContentContainer;
