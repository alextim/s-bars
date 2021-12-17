/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';

import card from '../../../theme/card';
import { space } from '../../../theme/space';

import getCardSchema from '../../SEO/getCardSchema';

import ReadMore from '../ReadMore';

const excerptStyle = {
  paddingTop: space[2],
};

const PostCard = ({
  data: {
    slug: to,
    cover,
    title,
    excerpt,
    headline,
    metaDescription,
    datePublished,
    dateModified,
    author,
  },
  readMore,
}) => (
  <article css={card.wrap}>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(
          getCardSchema({
            to,
            title,
            headline: headline || metaDescription,
            cover,
            datePublished,
            dateModified,
            author,
            pageType: 'BlogPosting',
          }),
        )}
      </script>
    </Helmet>

    {cover && (
      <a href={to}>
        <GatsbyImage image={getImage(cover.sm)} alt={cover.alt} title={cover.title} />
      </a>
    )}
    <div css={card.textWrap}>
      <a href={to} css={card.link}>
        <h2 css={card.heading}>{title}</h2>
      </a>
      <p css={excerptStyle}>{excerpt}</p>
      <ReadMore to={to} title={readMore} />
    </div>
  </article>
);

export default PostCard;
