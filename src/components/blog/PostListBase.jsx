/** @jsx jsx */
import { jsx } from '@emotion/react';

import config from '../../../config/website';

import { prevLink, nextLink, currentLink } from '../../helpers/pagination';
import { useTranslation } from '../../i18n';

import styleCardsWrap from '../styles/styleCardsWrap';

import Layout from '../Layout/Layout';
import SEO from '../SEO';
import styleHtml from '../styles/styleHtml';

// import loadable from '@loadable/component';

import PostPagination from './PostPagination';
// import { CategoryWidget, TagsWidget, YearsWidget } from '../components/post-widgets';

const Cards = ({ posts, readMore, cardComponent }) => {
  const { t } = useTranslation();
  const readMoreText = t(readMore || config.readMore);
  return posts.edges.map(({ node }) => cardComponent(node.slug, node, readMoreText));
};

const PostListBase = ({
  data,
  /**
   * keep it for the future!
   */
  /*
  pageContext: { locale, currentPage, numPages, categories, tags, years },
  */
  pageContext: { to, currentPage, numPages },
  title,
  readMore,
  cardComponent,
}) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { html, title: defaultTitle, metaTitle, headline, metaDescription, noindex, locale },
    posts,
  } = data;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const links = [];

  if (numPages > 1) {
    if (!isFirst) {
      links.push({
        rel: 'prev',
        href: config.siteUrl + prevLink(currentPage, to),
      });
    }
    if (!isLast) {
      links.push({
        rel: 'next',
        href: config.siteUrl + nextLink(currentPage, to),
      });
    }
  }

  return (
    <Layout
      title={title || defaultTitle}
      headline={headline}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={currentLink(currentPage, to)}
        noindex={noindex}
        pageType="Blog"
        links={links}
      />
      {isFirst && html && <div css={styleHtml} dangerouslySetInnerHTML={{ __html: html }} />}

      <div css={styleCardsWrap}>
        <Cards posts={posts} readMore={readMore} cardComponent={cardComponent} />
      </div>
      <PostPagination currentPage={currentPage} numPages={numPages} slug={to} />
    </Layout>
  );
};

export default PostListBase;
