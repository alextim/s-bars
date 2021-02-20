/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

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

export default BgImage;
