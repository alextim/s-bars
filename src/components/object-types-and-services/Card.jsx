/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GatsbyImage } from 'gatsby-plugin-image';

import card from '../../theme/card';
import getCardSchema from '../SeoBase/getCardSchema';

const Card = ({ title, to, cover, description, metaDescription }) => (
  <article key={to} css={card.wrap}>
    <script type="application/ld+json">
      {JSON.stringify(
        getCardSchema({
          to,
          title,
          description: description || metaDescription,
          cover,
        }),
      )}
    </script>
    {cover && cover.sm && (
      <a href={to}>
        <GatsbyImage image={cover.sm.childImageSharp.gatsbyImageData} alt={cover.alt} />
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
