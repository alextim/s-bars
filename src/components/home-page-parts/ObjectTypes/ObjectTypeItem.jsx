import colors from '@/theme/colors';
import links from '@/theme/links';
import mq from '@/theme/media-queries';
import { space } from '@/theme/space';

import FaCheck from '../../../assets/fa/solid/check.svg';

const styleIcon = {
  marginRight: space[2],
  width: '1rem',
  height: '1rem',
  color: links.color,

  [mq.lg]: {
    display: 'none',
  },
};

const styleLink = {
  [mq.lg]: {
    color: 'rgb(156, 0, 26)',
    letterSpacing: '1px',
  },
};

const border = `1px solid ${colors.brand.main}`;

const ObjectTypeItem = ({ title, to, firstRow, firstCol }) => {
  const styleCell = {
    display: 'inline-flex',
    alignItems: 'center',

    [mq.lg]: {
      padding: '1.5rem',
      textAlign: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
      borderTop: firstRow ? 'none' : border,
      borderLeft: firstCol ? 'none' : border,
    },
  };

  return (
    <div css={styleCell}>
      <FaCheck css={styleIcon} />
      <a css={styleLink} href={to}>
        {title}
      </a>
    </div>
  );
};

export default ObjectTypeItem;
