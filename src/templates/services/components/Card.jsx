import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import card from '@/theme/card';

const Card = ({ title, to, cover }) => (
  <article key={to} css={card.wrap}>
    {cover && cover.sm && (
      <a href={to}>
        <GatsbyImage image={getImage(cover.sm)} alt={cover.alt} title={cover.title} />
      </a>
    )}
    <div css={card.textWrap}>
      <h2 css={card.heading}>
        <a href={to} css={card.link}>
          {title}
        </a>
      </h2>
    </div>
  </article>
);

export default Card;
