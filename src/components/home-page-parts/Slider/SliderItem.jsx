/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

import mq from '../../../theme/media-queries';
import { space } from '../../../theme/space';
import colors from '../../../theme/colors';
import { fontSizes } from '../../../theme/font-sizes';

const wrapperStyle = {
  position: 'relative',
};

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

const BgImage = ({ image, height = '100vh', fit = 'cover', position = '50% 50%' }) => {
  if (!image || !image.sm) {
    return null;
  }

  const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    maxWidth: '100%',
    zIndex: -1,
    height,
    // Adjust image positioning (if image covers area with defined height) and add font-family for polyfill
    '& > img': {
      objectFit: `${fit} !important`,
      objectPosition: `${position} !important`,
    },
  };

  return <Img css={style} fluid={image.sm.childImageSharp.fluid} alt={image.alt} />;
};

const styleTitle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: 0,
  transform: 'translate(-50%, -50%)',
  fontSize: fontSizes[3],
  [mq.lg]: {
    top: '70%',
    fontSize: fontSizes[7],
  },
};

const SliderItem = ({ title, image }) => {
  return (
    <div css={wrapperStyle}>
      <BgImage image={image} height="initial" />
      <div css={styleOverlay}>
        <div css={styleTitle}>{title}</div>
      </div>
    </div>
  );
};

export default SliderItem;
