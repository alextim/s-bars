/** @jsx jsx */
import { jsx } from '@emotion/react';

import { space } from '../../theme/space';
import fonts from '../../theme/fonts';

const styleWrap = {
  marginBottom: space[6],
};

const styleTitle = {
  textTransform: 'uppercase',
  textAlign: 'center',
  fontFamily: fonts.body,
};

const styleContentWrap = {
  display: 'flex',
  flexDirection: 'column',
};

const AsideWidget = ({ title, children, extraStyle }) => (
  <div css={[styleWrap, extraStyle]}>
    <h3 css={styleTitle}>{title}</h3>
    <div css={styleContentWrap}>{children}</div>
  </div>
);

export default AsideWidget;
