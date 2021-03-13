import colors from './colors';
// import styles from './styles';
import mq, { breakpointsArray as breakpoints } from './media-queries';

import { fontSizes, fontSizesPx, fontSizesRaw } from './font-sizes';
import fontWeights from './font-weights';
import lineHeights from './line-heights';
import { space, spacePx, spaceRaw } from './space';
import sizes from './sizes';
import shadows from './shadows';
import transition from './transition';
import fonts from './fonts';
import buttons from './buttons';
import links from './links';
import card from './card';

const theme = {
  breakpoints,
  mq,
  space,
  spacePx,
  spaceRaw,
  fonts,
  fontSizes,
  fontSizesPx,
  fontSizesRaw,
  fontWeights,
  lineHeights,
  colors,
  /*
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    brand: {
      color: 'brand.main',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'body',
    },
  },
  styles,
  */
  sizes,
  links,
  buttons,
  transition,
  shadows,
  card,
};

export default theme;
