/** @jsx jsx */
import { jsx } from '@emotion/react';

import Img from 'gatsby-image';

import mq from '../../../theme/media-queries';
import { space } from '../../../theme/space';
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
  marginTop: space[1],
  [mq.lg]: {
    /**
     * https://stackoverflow.com/questions/38948102/center-one-and-right-left-align-other-flexbox-element
     */
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    justifyItems: 'center',
  },
};

const styleDescription = {
  textAlign: 'center',
  fontSize: fontSizes[0],
  [mq.lg]: {
    gridColumnStart: 2,
    fontSize: fontSizes[1],
  },
};

const styleCustomerWrap = {
  marginTop: space[1],
  textAlign: 'center',
  [mq.lg]: {
    gridColumnStart: 3,
    marginTop: 0,
    marginLeft: 'auto',
    textAlign: 'right',
  },
};
const styleCustomerHeading = {
  fontSize: fontSizes[0],
  ':after': {
    content: '":"',
  },
  [mq.lg]: {
    fontSize: fontSizes[1],
  },
};

const styleCustomerName = {
  textTransform: 'uppercase',
  fontWeight: fontWeights.bold,
};

const Carouseltem = ({ heading, customer, description, image }) => {
  return (
    <div css={styleWrap}>
      {image && image.sm && <Img fluid={image.sm.childImageSharp.fluid} alt={image.alt} />}
      <div css={styleTextWrap}>
        <div css={styleDescription} dangerouslySetInnerHTML={{ __html: description }} />
        <div css={styleCustomerWrap}>
          <div css={styleCustomerHeading}>{heading}</div>
          <div css={styleCustomerName}>{customer}</div>
        </div>
      </div>
    </div>
  );
};

export default Carouseltem;
