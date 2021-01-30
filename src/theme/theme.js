import colors from './colors';
import styles from './styles';
import { breakpointsArray as breakpoints } from './breakpoints';
import mq from './media-queries';
import { fontSizes, fontSizesPx, fontSizesRaw } from './font-sizes';
import fontWeights from './font-weights';
import { space, spacePx, spaceRaw } from './space';
import sizes from './sizes';
import shadows from './shadows';
import transition from './transition';

// import buttons from './buttons';

const theme = {
  breakpoints,
  mq,
  space,
  spacePx,
  spaceRaw,
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes,
  fontSizesPx,
  fontSizesRaw,
  fontWeights,
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  colors,
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
  sizes,
  // buttons,
  transition,
  shadows,
};

export default theme;
