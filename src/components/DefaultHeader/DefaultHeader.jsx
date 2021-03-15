/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import { space } from '../../theme/space';

const styleSubtitle = {
  marginTop: '1rem',
};

const styleInnerWrap = {
  margin: `${space[7]} auto`,
  textAlign: 'center',
  [mq.md]: {
    padding: `0 ${space[6]}`,
    lineHeight: 1.25,
  },
};

const DefaultHeader = ({ title, subtitle }) => (
  <div css={styleInnerWrap}>
    {title && <h1>{title}</h1>}
    {subtitle && <p css={styleSubtitle}>{subtitle}</p>}
  </div>
);

export default DefaultHeader;
