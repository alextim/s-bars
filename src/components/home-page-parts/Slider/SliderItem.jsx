/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../../theme/media-queries';
import { fontSizes } from '../../../theme/font-sizes';

import BgImage from '../BgImage';
import Overlay from '../Overlay';

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
  [mq.lg]: {
    top: '70%',
    fontSize: fontSizes[7],
  },
};

const SliderItem = ({ title, image }) => {
  return (
    <div css={styleWrap}>
      <BgImage image={image} height="initial" />
      <Overlay>
        <div css={styleTitle}>{title}</div>
      </Overlay>
    </div>
  );
};

export default SliderItem;
