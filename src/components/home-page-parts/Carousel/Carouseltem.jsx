/** @jsx jsx */
import { jsx } from '@emotion/react';

import Img from 'gatsby-image';

import mq from '../../../theme/media-queries';
import { fontSizes } from '../../../theme/font-sizes';
import fontWeights from '../../../theme/font-weights';

const styleWrap = {
  display: 'flex',
  flexDirection: 'column',
};

const styleTextWrap = {
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

const styleSpacer = {
  marginRight: 'auto',
  visibility: 'hidden',
};
const Carouseltem = ({ heading, customer, description, image }) => {
  return (
    <div css={styleWrap}>
      {image && image.sm && <Img fluid={image.sm.childImageSharp.fluid} alt={image.alt} />}
      <div css={styleTextWrap}>
        <div css={styleSpacer} />
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
