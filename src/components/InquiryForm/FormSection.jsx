/** @jsx jsx */
import { jsx } from '@emotion/react';

const styleWrap = (t) => ({
  display: 'grid',
  gridGap: t.space[2],
  [t.mq.lg]: {
    gridGap: 0,
    gridTemplateColumns: '25% 75%',
  },
});

const styleTitle = (t) => ({
  margin: 0,
  fontFamily: t.fonts.body,
  [t.mq.lg]: {
    gridColumn: 2,
    grdRow: 1,
    paddingLeft: t.space[4],
    paddingBottom: t.space[2],
    borderLeft: `1px ${t.colors.brand.main} solid`,
  },
});

const styleDescription = (t) => ({
  [t.mq.lg]: {
    gridColumn: 1,
    gridRow: 2,
    textAlign: 'right',
    paddingRight: t.space[4],
  },
});

const styleContentWrap = (t) => ({
  display: 'grid',
  gridGap: t.space[4],
  [t.mq.lg]: {
    gridColumn: 2,
    gridRow: 2,
    paddingLeft: t.space[4],
    borderLeft: `1px ${t.colors.brand.main} solid`,
  },
});

const FormSection = ({ title, description, children }) => (
  <section css={styleWrap}>
    <h3 css={styleTitle}>{title}</h3>
    <div css={styleDescription}>{description}</div>
    <div css={styleContentWrap}>{children}</div>
  </section>
);

export default FormSection;
