/** @jsx jsx */
import { jsx } from '@emotion/react';

import Container from '../Container';
import Navbar from '../Navbar';

import mq from '../../theme/media-queries';
import colors from '../../theme/colors';
import { fontSizes } from '../../theme/font-sizes';
import sizes from '../../theme/sizes';
import shadows from '../../theme/shadows';

// const rootPath = `${__PATH_PREFIX__}/`;
//   if (location.pathname === rootPath) {

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: sizes.header.sm,
  contain: 'layout',
  color: colors.header.text,
  backgroundColor: colors.header.bg,
  position: 'fixed',
  top: 0,
  left: 0,
  boxShadow: shadows.raised,
  fontSize: fontSizes[1],
  zIndex: 200,
  [mq.xl]: {
    height: sizes.header.xxl,
  },
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'inherit',
};

const Header = () => (
  <header role="navigation" css={headerStyle}>
    <Container css={containerStyle}>
      <Navbar />
    </Container>
  </header>
);

export default Header;
