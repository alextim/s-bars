import { space } from '@/theme/space';
import mq from '@/theme/media-queries';
import colors from '@/theme/colors';
import fonts from '@/theme/fonts';

const styleWrap = {
  display: 'grid',
  gridGap: space[2],
  [mq.lg]: {
    gridGap: 0,
    gridTemplateColumns: '1fr 3fr',
  },
};

const styleTitle = {
  margin: 0,
  fontFamily: fonts.body,
  [mq.lg]: {
    gridColumn: 2,
    grdRow: 1,
    paddingLeft: space[4],
    paddingBottom: space[2],
    borderLeft: `1px ${colors.brand.main} solid`,
  },
};

const styleDescription = {
  [mq.lg]: {
    gridColumn: 1,
    gridRow: 2,
    textAlign: 'right',
    paddingRight: space[4],
  },
};

const styleContentWrap = {
  display: 'grid',
  gridGap: space[4],
  [mq.lg]: {
    gridColumn: 2,
    gridRow: 2,
    paddingLeft: space[4],
    borderLeft: `1px ${colors.brand.main} solid`,
  },
};

const FormSection = ({ title, description, children }) => (
  <section css={styleWrap}>
    <h3 css={styleTitle}>{title}</h3>
    <div css={styleDescription}>{description}</div>
    <div css={styleContentWrap}>{children}</div>
  </section>
);

export default FormSection;
