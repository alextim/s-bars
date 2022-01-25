import styleCardsWrap from '../../shared/styles/styleCardsWrap';
import Card from './Card';

const CardList = ({ items }) => (
  <div css={styleCardsWrap}>
    {items.map(({ title, to, cover }) => (
      <Card key={to} title={title} to={to} cover={cover} />
    ))}
  </div>
);

export default CardList;
