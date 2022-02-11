import mq from '@/theme/media-queries';
import colors from '@/theme/colors';
import { fontSizes } from '@/theme/font-sizes';
import sizes from '@/theme/sizes';
import shadows from '@/theme/shadows';
import container from '@/theme/container';

import Navbar from '../Navbar';

// const rootPath = `${__PATH_PREFIX__}/`;
//   if (location.pathname === rootPath) {

const styleHeader = {
  width: '100%',
  height: sizes.header.sm,
  contain: 'layout',
  position: 'fixed',
  top: 0,
  left: 0,
  fontSize: fontSizes[1],
  boxShadow: shadows.raised,
  zIndex: 200,
  [mq.lg]: {
    height: sizes.header.lg,
  },
};

const styleInnerWrap = {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  color: colors.header.text,
  backgroundColor: colors.header.bg,
  ...container.header,
};

const Header = () => (
  <header role="navigation" css={styleHeader}>
    <div css={styleInnerWrap}>
      <Navbar />
    </div>
  </header>
);

export default Header;
