/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import { POSTS_PATH, siteUrl } from '../../config/website';

import { prevLink, nextLink } from '../utils/pagination';

import Layout from '../components/Layout/SimpleLayoutWithHeader';
import PostCardList from '../components/PostCardList';
import PostPagination from '../components/PostPagination';
// import { CategoryWidget, TagsWidget, YearsWidget } from '../components/post-widgets';
import SEO from '../components/SEO';

const htmlStyle = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[10],
});

const PostList = ({
  path,
  data,
  /**
   * keep it fot the future!
   */
  /*
  pageContext: { locale, currentPage, numPages, categories, tags, years },
  */
  pageContext: { locale, currentPage, numPages },
}) => {
  const { translations, address, mainNav, footerNav, socialLinks, page } = data;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const links = [];

  if (numPages > 1) {
    if (!isFirst) {
      links.push({
        rel: 'prev',
        href: siteUrl + prevLink(currentPage, POSTS_PATH, locale),
      });
    }
    if (!isLast) {
      links.push({
        rel: 'next',
        href: siteUrl + nextLink(currentPage, POSTS_PATH, locale),
      });
    }
  }

  const postList = data.posts.edges.map(
    ({ node: { frontmatter, timeToRead, excerpt, fields } }) => ({
      path: fields.slug,
      tags: frontmatter.tags,
      category: frontmatter.category,
      cover: frontmatter.cover,
      title: frontmatter.title,
      description: frontmatter.title,
      metaDescription: frontmatter.metaDescription,
      datePublished: frontmatter.datePublished,
      timeToRead,
      excerpt,
    }),
  );

  const {
    html,
    frontmatter: { title, metaTitle, description, metaDescription, noindex },
  } = page;

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
      title={title}
      subtitle={description}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
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
      <PostPagination currentPage={currentPage} numPages={numPages} subpath={POSTS_PATH} />
    </Layout>
  );
};

export default PostList;

export const pageQuery = graphql`
  query PostListQuery($locale: String!, $skip: Int!, $limit: Int!) {
    #
    # POSTS_PATH
    # regex: "/blog$/"
    #
    page: markdownRemark(fields: { slug: { regex: "//blog//" }, locale: { eq: $locale } }) {
      ...PageFragment
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___datePublished], order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        frontmatter: { state: { eq: "published" } }
        fields: { type: { eq: "post" }, locale: { eq: $locale } }
      }
    ) {
      edges {
        node {
          ...PostCardFragment
        }
      }
    }
    address: yaml(fields: { type: { eq: "address" }, locale: { eq: $locale } }) {
      ...AddressFragment
    }
    mainNav: allYaml(filter: { fields: { type: { eq: "main-nav" }, locale: { eq: $locale } } }) {
      edges {
        node {
          title
          fields {
            to
            submenu {
              title
              to
            }
          }
        }
      }
    }
    footerNav: allYaml(
      filter: { fields: { type: { eq: "footer-nav" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          title
          fields {
            to
          }
        }
      }
    }
    socialLinks: allYaml(
      filter: { fields: { type: { eq: "social-links" }, locale: { eq: $locale } } }
    ) {
      edges {
        node {
          code
          to
          title
        }
      }
    }
    translations: allYaml(
      filter: { fields: { type: { eq: "translations" }, locale: { eq: $locale } } }
      limit: 1000
    ) {
      edges {
        node {
          key
          value
        }
      }
    }
  }
`;
