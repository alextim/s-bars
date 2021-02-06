/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import colors from '../../theme/colors';
import { space } from '../../theme/space';

const styleTitle = {
  fontSize: '2rem',
  [mq.lg]: {
    fontSize: '2.5rem',
  },
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
  paddingLeft: space[6],
  paddingRight: space[6],
  textTransform: 'uppercase',
  textAlign: 'center',
  [mq.md]: {
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
