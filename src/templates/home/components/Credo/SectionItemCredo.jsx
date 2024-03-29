import colors from '@/theme/colors';
import mq from '@/theme/media-queries';
import { space } from '@/theme/space';
import Icon from '@/components/Icon';

import { styleTitle } from '@/components/SectionItem/item-default-styles';

const styleWrapHorizontal = {
  [mq.lg]: {
    display: 'grid',
    gridTemplateColumns: '6.25rem auto',
    gridTemplateRows: '2rem auto',
    gridGap: `0 ${space[5]}`,
  },
};

const styleCircleWrap = {
  float: 'left',
  margin: `0 ${space[5]} ${space[0]} 0`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.brand.main,
  height: '6.25rem',
  width: '6.25rem',
  borderRadius: '50%',

  [mq.lg]: {
    float: 'none',
    margin: 0,
    gridRow: 'span 2',
  },
};

const styleCredoText = {
  /* textAlign: 'justify', */
};

const styleIcon = {
  width: '2.5rem',
  height: '2.5rem',
};

const stylePlane = {
  transform: 'rotate(-45deg)',
};

export const SectionItemCredo = ({ data }) => {
  const { title, text, icon } = data;
  const style = { ...styleIcon, ...(icon === 'plane' ? stylePlane : {}) };
  return (
    <div css={styleWrapHorizontal}>
      <div css={styleCircleWrap}>
        <Icon name={icon} css={style} />
      </div>
      <h3 css={styleTitle}>{title}</h3>
      <div css={styleCredoText} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default SectionItemCredo;
