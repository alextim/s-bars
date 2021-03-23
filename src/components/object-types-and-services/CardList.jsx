/** @jsx jsx */
import { jsx } from '@emotion/react';

import Card from './Card';

import styleCardsWrap from '../styles/styleCardsWrap';

const CardList = ({ items }) => (
  <div css={styleCardsWrap}>
    {items.map(({ title, to, cover }) => (
      <Card key={to} title={title} to={to} cover={cover} />
    ))}
  </div>
);

export default CardList;
