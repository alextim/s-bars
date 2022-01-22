import colors from '@/theme/colors';
import mq from '@/theme/media-queries';
import { space } from '@/theme/space';
import Icon from '../../Icon';

import { styleTitle } from '../../SectionItem/item-default-styles';

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
  return (
    <div css={styleWrapHorizontal}>
      <div css={styleCircleWrap}>
        <Icon name={icon} css={{ ...styleIcon, ...(icon === 'plane' ? stylePlane : {}) }} />
      </div>
      <h3 css={styleTitle}>{title}</h3>
      <div css={styleCredoText} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default SectionItemCredo;
