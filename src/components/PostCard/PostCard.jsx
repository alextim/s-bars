/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import Img from 'gatsby-image';

import { useTranslation } from '../../i18n';

const excerptStyle = (t) => ({
  paddingTop: t.space[2],
});

const styleReadMore = (t) => ({
  paddingTop: t.space[5],
  fontSize: t.fontSizes[0],
});

const PostCard = ({ data: { path: to, cover, title, excerpt } }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <article css={theme.card.wrap}>
      {cover && cover.sm && (
        <a href={to}>
          <Img fluid={cover.sm.childImageSharp.fluid} alt={cover.alt} />
        </a>
      )}
      <div css={theme.card.textWrap}>
        <h2 css={theme.card.heading}>
          <a href={to} css={theme.card.link}>
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
