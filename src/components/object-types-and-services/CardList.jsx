/** @jsx jsx */
import { jsx } from '@emotion/react';

import mq from '../../theme/media-queries';
import { space } from '../../theme/space';
import card from '../../theme/card';

import Card from './Card';

const styleItemsWrap = {
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

const CardList = ({ items }) => (
  <div css={styleItemsWrap}>
    {items.map(({ title, to, cover }) => (
      <Card key={to} title={title} to={to} cover={cover} />
    ))}
  </div>
);

export default CardList;
