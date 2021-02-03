/** @jsx jsx */
import { jsx } from '@emotion/react';

import Img from 'gatsby-image';
import Container from '../Container';
import mq from '../../theme/media-queries';

const wrapperStyle = {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
};

const styleOverlay = (t) => ({
  padding: t.space[6],
  margin: '0 auto',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,

  color: t.colors.white,
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
});

const styleOverlayNoImage = (t) => ({
  position: 'static',
  color: t.colors.text,
  textShadow: 'none',
  // paddingBottom: 0,
});
const BgImage = ({ fluid, alt, title, height = '100vh', fit = 'cover', position = '50% 50%' }) => {
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
  if (!Array.isArray(fluid)) {
    return <Img css={style} fluid={fluid} alt={alt} title={title} />;
  }

  const sources = [
    fluid[0],
    {
      ...fluid[1],
      media: '(min-width: 480px)',
    },
  ];
  return <Img css={style} fluid={sources} alt={alt} title={title} />;
};

const styleTitle = {
  /* empty */
};

const styleSubtitle = (t) => ({
  fontSize: t.fontSizes[3],
  [mq.lg]: {
    fontSize: t.fontSizes[4],
  },
});

const Hero = ({ title, subtitle, img, alt, imgTitle }) => {
  if (!img) {
    return (
      <div css={wrapperStyle}>
        <Container>
          <div css={[styleOverlay, styleOverlayNoImage]}>
            {title && <h1 css={styleTitle}>{title}</h1>}
            {subtitle && <p css={styleSubtitle}>{subtitle}</p>}
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div css={wrapperStyle}>
      {img && <BgImage alt={alt} title={imgTitle} fluid={img} />}
      <div css={[styleOverlay, img ? null : styleOverlayNoImage]}>
        {title && <h1 css={styleTitle}>{title}</h1>}
        {subtitle && <p css={styleSubtitle}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default Hero;
