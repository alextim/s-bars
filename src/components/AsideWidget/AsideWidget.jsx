/** @jsx jsx */
import { jsx } from '@emotion/react';

import { space } from '../../theme/space';
import fonts from '../../theme/fonts';
import { fontSizes } from '../../theme/font-sizes';
import fontWeights from '../../theme/font-weights';

const styleWrap = {
  marginBottom: space[6],
};

const styleTitle = {
  textTransform: 'uppercase',
  textAlign: 'center',
  fontFamily: fonts.body,
  fontSize: fontSizes[3],
  fontWeight: fontWeights.body,
};

const styleContentWrap = {
  display: 'flex',
  flexDirection: 'column',
  a: {
    fontSize: fontSizes[1],
  },
};

const AsideWidget = ({ title, children, extraStyle }) => (
  <div css={[styleWrap, extraStyle]}>
    <h3 css={styleTitle}>{title}</h3>
    <div css={styleContentWrap}>{children}</div>
  </div>
);

export default AsideWidget;
