/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import colors from '../../theme/colors';
import { space } from '../../theme/space';

const styleTitle = {
  /* empty */
};

const styleSubtitle = {
  marginTop: '1rem',
  fontSize: '1.1rem',
  [mq.lg]: {
    fontSize: '1.3rem',
  },
};

const innerWrapperStyle = {
  color: colors.black,
  margin: `${space[7]} auto`,
  textTransform: 'uppercase',
  textAlign: 'center',
  [mq.md]: {
    paddingLeft: space[6],
    paddingRight: space[6],
    lineHeight: 1.25,
  },
};

const DefaultHeader = ({ title, subtitle }) => (
  <div css={innerWrapperStyle}>
    {title && <h1 css={styleTitle}>{title}</h1>}
    {subtitle && <p css={styleSubtitle}>{subtitle}</p>}
  </div>
);

export default DefaultHeader;
