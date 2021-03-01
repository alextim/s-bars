/** @jsx jsx */
import { jsx } from '@emotion/react';
import Img from 'gatsby-image';

import card from '../../theme/card';
import { space } from '../../theme/space';
import { fontSizes } from '../../theme/font-sizes';

import { useTranslation } from '../../i18n';

import getCardSchema from '../SeoBase/getCardSchema';

const excerptStyle = {
  paddingTop: space[2],
};

const styleReadMore = {
  paddingTop: space[5],
  fontSize: fontSizes[0],
};

const PostCard = ({
  data: { path: to, cover, title, excerpt, description, metaDescription, datePublished },
}) => {
  const { t } = useTranslation();

  return (
    <article css={card.wrap}>
      <script type="application/ld+json">
        {JSON.stringify(
          getCardSchema({
            to,
            title,
            description: description || metaDescription,
            cover,
            datePublished,
            pageType: 'BlogPosting',
          }),
        )}
      </script>

      {cover && cover.sm && (
        <a href={to}>
          <Img fluid={cover.sm.childImageSharp.fluid} alt={cover.alt} />
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
