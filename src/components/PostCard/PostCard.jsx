/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import { useTranslation } from '../../i18n';
import PostInfo from '../PostInfo';
import PostTags from '../PostTags';

const cardStyle = (t) => ({
  paddingBottom: t.space[5],
  marginBottom: t.space[5],
  borderBottom: '1px solid rgba(0,0,0,.0785)!important',
});

const imageStyle = (t) => ({
  marginTop: t.space[6],
});

const hStyle = (t) => ({
  paddingTop: t.space[6],
  fontSize: t.fontSizes[5],
});

const excerptStyle = (t) => ({
  paddingTop: t.space[2],
});

const styleReadMore = (t) => ({
  paddingTop: t.space[5],
  fontSize: t.fontSizes[0],
});

const PostCard = ({ data }) => {
  const { t } = useTranslation();
  return (
    <article css={cardStyle}>
      <PostInfo publishedDate={data.publishedDate} timeToRead={data.timeToRead} />
      <Link to={data.path}>
        {data.cover && data.cover.sm && (
          <Img fluid={data.cover.sm.childImageSharp.fluid} alt={data.cover.alt} css={imageStyle} />
        )}
        <h3 css={hStyle}>{data.title}</h3>
      </Link>
      <p css={excerptStyle}>{data.excerpt}</p>
      <PostTags tags={data.tags} />
      <Link to={data.path} css={styleReadMore}>
        {t('post.readMore')}
      </Link>
    </article>
  );
};

export default React.memo(PostCard);
