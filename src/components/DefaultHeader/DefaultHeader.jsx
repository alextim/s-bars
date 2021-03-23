/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import { space } from '../../theme/space';

const styleHeadline = {
  marginTop: '1rem',
};

const styleInnerWrap = {
  margin: `${space[7]} auto`,
  textAlign: 'center',
  [mq.md]: {
    padding: `0 ${space[12]}`,
    lineHeight: 1.25,
  },
  [mq.lg]: {
    padding: '0 10rem',
  },
};

const DefaultHeader = ({ title, headline }) => (
  <div css={styleInnerWrap}>
    {title && <h1>{title}</h1>}
    {headline && <p css={styleHeadline}>{headline}</p>}
  </div>
);

export default DefaultHeader;
