/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GatsbyImage, withArtDirection, getImage } from 'gatsby-plugin-image';

import mq from '../../../theme/media-queries';
import colors from '../../../theme/colors';
import { fontSizes } from '../../../theme/font-sizes';

const styleWrap = {
  position: 'relative',
};

const styleTitle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: 0,
  transform: 'translate(-50%, -50%)',
  fontSize: fontSizes[3],
  color: colors.white,
  textAlign: 'center',
  textTransform: 'uppercase',
  textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)',
  [mq.lg]: {
    top: '70%',
    fontSize: fontSizes[7],
  },
};

const SliderItem = ({ title, image }) => {
  let images;
  if (image) {
    if (image.sm && image.xl) {
      images = withArtDirection(getImage(image.sm), [
        {
          media: '(min-width: 480px)',
          image: getImage(image.xl),
        },
      ]);
    } else {
      images = getImage(image.sm || image.xl);
    }
  }
  return (
    <div css={styleWrap}>
      {image && image.sm && <GatsbyImage image={images} alt={image.alt} />}
      <div css={styleTitle}>{title}</div>
    </div>
  );
};

export default SliderItem;
