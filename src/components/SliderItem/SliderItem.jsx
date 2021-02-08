/** @jsx jsx */
import { jsx } from '@emotion/react';

import Img from 'gatsby-image';
// import Container from '../Container';

import mq from '../../theme/media-queries';
import { space } from '../../theme/space';
import colors from '../../theme/colors';
import { fontSizes } from '../../theme/font-sizes';

import Button from '../Button';

const wrapperStyle = {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
};

const styleOverlay = {
  padding: space[6],
  margin: '0 auto',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,

  color: colors.white,
  textAlign: 'center',
  textTransform: 'uppercase',
  textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

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

  if (!image.xl) {
    return <Img css={style} fluid={image.sm.childImageSharp.fluid} alt={image.alt} />;
  }

  const sources = [
    image.sm.childImageSharp.fluid,
    {
      ...image.sm.childImageSharp.xl,
      media: '(min-width: 480px)',
    },
  ];

  return <Img css={style} fluid={sources} alt={image.alt} />;
};

const styleTitle = {
  /* empty */
};

const styleSubtitle = {
  fontSize: fontSizes[3],
  [mq.lg]: {
    fontSize: fontSizes[4],
  },
};

const styleButton = {
  marginTop: space[5],
};

const SliderItem = ({ title, subtitle, text, to, image }) => {
  return (
    <div css={wrapperStyle}>
      <BgImage image={image} />
      <div css={styleOverlay}>
        {title && <h2 css={styleTitle}>{title}</h2>}
        {subtitle && <p css={styleSubtitle}>{subtitle}</p>}
        {to && (
          <Button tag="link" to={to} overrideCSS={styleButton}>
            {text}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SliderItem;
