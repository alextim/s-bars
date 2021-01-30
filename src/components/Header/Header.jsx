/** @jsx jsx */
import { jsx } from '@emotion/react';

import Container from '../Container';
import Navbar from '../Navbar';

// const rootPath = `${__PATH_PREFIX__}/`;
//   if (location.pathname === rootPath) {

const headerStyle = (t) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: t.sizes.header.sm,
  contain: 'layout',
  color: t.colors.header.text,
  backgroundColor: t.colors.header.bg,
  position: 'fixed',
  top: 0,
  left: 0,
  boxShadow: t.shadows.raised,
  fontSize: t.fontSizes[1],
  zIndex: 200,
  [t.mq.xl]: {
    height: t.sizes.header.xxl,
  },
});

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
