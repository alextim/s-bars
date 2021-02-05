/** @jsx jsx */
import { jsx } from '@emotion/react';

const styleWrap = (t) => ({
  marginBottom: t.space[6],
});
const styleContentWrap = {
  display: 'flex',
  flexDirection: 'column',
};

const AsideWidget = ({ title, children, extraStyle }) => (
  <div css={[styleWrap, extraStyle]}>
    <h3>{title}</h3>
    <div css={styleContentWrap}>{children}</div>
  </div>
);

export default AsideWidget;
