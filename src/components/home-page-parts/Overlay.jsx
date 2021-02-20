/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import { space } from '../../theme/space';
import colors from '../../theme/colors';

const styleOverlay = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,

  padding: space[6],
  margin: '0 auto',

  color: colors.white,
  textAlign: 'center',
  textTransform: 'uppercase',
  textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)',

  [mq.md]: {
    lineHeight: 1.25,
  },
};

const Overlay = ({ children }) => <div css={styleOverlay}>{children}</div>;

export default Overlay;
