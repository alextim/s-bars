/** @jsx jsx */
import { jsx } from '@emotion/react';

import { siteUrl } from '../../../config/website';

import { prevLink, nextLink } from '../../helpers/pagination';

import Layout from '../Layout/Layout';
import PostCardList from './PostCardList';
import PostPagination from './PostPagination';
// import { CategoryWidget, TagsWidget, YearsWidget } from '../components/post-widgets';
import SEO from '../SEO';

const htmlStyle = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[10],
});

const PostList = ({
  data,
  /**
   * keep it fot the future!
   */
  /*
  pageContext: { locale, currentPage, numPages, categories, tags, years },
  */
  pageContext: { currentPage, numPages },
  title,
  subpath,
}) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: {
      html,
      title: defaultTitle,
      metaTitle,
      headline,
      metaDescription,
      noindex,
      locale,
      slug,
    },
  } = data;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const links = [];

  if (numPages > 1) {
    if (!isFirst) {
      links.push({
        rel: 'prev',
        href: siteUrl + prevLink(currentPage, slug),
      });
    }
    if (!isLast) {
      links.push({
        rel: 'next',
        href: siteUrl + nextLink(currentPage, slug),
      });
    }
  }

  const postList = data.posts.edges.map(
    ({
      node: {
        slug: itemSlug,
        tags,
        category,
        cover,
        title: itemTitle,
        headline: itemHeadline,
        metaDescription: itemMetaDescription,
        datePublished,
        dateModified,
        timeToRead,
        excerpt,
      },
    }) => ({
      path: itemSlug,
      tags,
      category,
      cover,
      title: itemTitle,
      headline: itemHeadline,
      metaDescription: itemMetaDescription,
      datePublished,
      dateModified,
      timeToRead,
      excerpt,
    }),
  );

  /*
  let metas;

  if (!isFirst) {
    metas = {
      robots: 'noindex, follow',
    };
  }
  */

  return (
    <Layout
      title={title || defaultTitle}
      subtitle={headline}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={slug}
        noindex={noindex}
        pageType="Blog"
        links={links}
      />
      {/*
      <CategoryWidget items={categories} />
      <TagsWidget items={tags} />
      <YearsWidget items={years} />
      */}

      {isFirst && html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
      <PostCardList posts={postList} />
      <PostPagination currentPage={currentPage} numPages={numPages} slug={subpath || slug} />
    </Layout>
  );
};

export default PostList;
