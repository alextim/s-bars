import mq from '../../theme/media-queries';
import { space } from '../../theme/space';

const extraPadding = {
  paddingBottom: space[3],
  [mq.lg]: {
    paddingBottom: space[0],
  },
};

export default extraPadding;
