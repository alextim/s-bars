/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../../theme/media-queries';
import { fontSizes } from '../../../theme/font-sizes';
import fontWeights from '../../../theme/font-weights';

import BgImage from '../BgImage';

const styleWrap = {
  position: 'relative',
};

const styleTextWrap = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [mq.lg]: {
    flexDirection: 'row',
  },
};

const styleDescription = {
  textAlign: 'center',
  fontSize: fontSizes[0],
  [mq.lg]: {
    fontSize: fontSizes[1],
  },
};

const styleCustomerWrap = {
  textAlign: 'center',
  [mq.lg]: {
    marginLeft: 'auto',
    textAlign: 'right',
  },
};
const styleHeading = {
  fontSize: fontSizes[0],
  [mq.lg]: {
    fontSize: fontSizes[1],
  },
};

const styleCustomer = {
  textTransform: 'uppercase',
  fontWeight: fontWeights.bold,
};

const Carouseltem = ({ heading, customer, description, image }) => {
  return (
    <div css={styleWrap}>
      <BgImage image={image} height="initial" />
      <div css={styleTextWrap}>
        <div css={styleDescription} dangerouslySetInnerHTML={{ __html: description }} />
        <div css={styleCustomerWrap}>
          <div css={styleHeading}>{heading}</div>
          <div css={styleCustomer}>{customer}</div>
        </div>
      </div>
    </div>
  );
};

export default Carouseltem;
