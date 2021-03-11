import mq from '../../theme/media-queries';
import { space } from '../../theme/space';

const styleItemsWrap = {
  display: 'grid',
  gridGap: space[3],
  [mq.lg]: {
    gridGap: space[0],
  },
};

export default styleItemsWrap;
