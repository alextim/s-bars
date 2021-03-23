import mq from '../../theme/media-queries';
import { space } from '../../theme/space';
import card from '../../theme/card';

const styleCardsWrap = {
  display: 'grid',
  gridGap: space[7],
  [mq.md]: {
    display: 'grid',
    gridTemplateColumns: `repeat(${card.perRow.md}, 1fr)`,
  },
  [mq.lg]: {
    display: 'grid',
    gridTemplateColumns: `repeat(${card.perRow.lg}, 1fr)`,
  },
};

export default styleCardsWrap;
