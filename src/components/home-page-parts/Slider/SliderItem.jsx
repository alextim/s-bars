/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GatsbyImage, withArtDirection, getImage } from 'gatsby-plugin-image';

import mq from '../../../theme/media-queries';
import colors from '../../../theme/colors';
import { fontSizes } from '../../../theme/font-sizes';

const styleWrap = {
  display: 'grid',
};

const styleTitle = {
  gridArea: '1/1',
  alignSelf: 'center',
  justifySelf: 'center',
  fontSize: fontSizes[2],
  color: colors.white,
  textAlign: 'center',
  textTransform: 'uppercase',
  textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)',
  zIndex: 2,
  [mq.md]: {
    alignSelf: 'end',
    marginBottom: '2.5rem',
    fontSize: fontSizes[5],
  },
  [mq.lg]: {
    fontSize: fontSizes[7],
  },
};

const styleImage = {
  gridArea: '1/1',
};

const getImages = (image) => {
  if (image.sm && image.xl) {
    return withArtDirection(getImage(image.sm), [
      {
        media: '(min-width: 480px)',
        image: getImage(image.xl),
      },
    ]);
  }
  return getImage(image.sm || image.xl);
};

const SliderItem = ({ title, image }) => (
  <div css={styleWrap}>
    {image && (
      <GatsbyImage image={getImages(image)} alt={image.alt} title={image.title} css={styleImage} />
    )}
    <div css={styleTitle}>{title}</div>
  </div>
);

export default SliderItem;
