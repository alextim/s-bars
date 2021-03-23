/** @jsx jsx */
import { jsx } from '@emotion/react';
import { GatsbyImage } from 'gatsby-plugin-image';

import card from '../../../theme/card';
import { space } from '../../../theme/space';
import { fontSizes } from '../../../theme/font-sizes';

import { useTranslation } from '../../../i18n';

import getCardSchema from '../../SEO/getCardSchema';

const excerptStyle = {
  paddingTop: space[2],
};

const styleReadMore = {
  paddingTop: space[5],
  fontSize: fontSizes[0],
};

const PostCard = ({
  data: { slug: to, cover, title, excerpt, headline, metaDescription, datePublished, dateModified },
}) => {
  const { t } = useTranslation();

  return (
    <article css={card.wrap}>
      <script type="application/ld+json">
        {JSON.stringify(
          getCardSchema({
            to,
            title,
            headline: headline || metaDescription,
            cover,
            datePublished,
            dateModified,
            pageType: 'BlogPosting',
          }),
        )}
      </script>

      {cover && cover.sm && (
        <a href={to}>
          <GatsbyImage
            image={cover.sm.childImageSharp.gatsbyImageData}
            alt={cover.alt}
            title={cover.title}
          />
        </a>
      )}
      <div css={card.textWrap}>
        <h2 css={card.heading}>
          <a href={to} css={card.link}>
            {title}
          </a>
        </h2>
        <p css={excerptStyle}>{excerpt}</p>
        <a href={to} css={styleReadMore}>
          {t('post.readMore')}
        </a>
      </div>
    </article>
  );
};

export default PostCard;
