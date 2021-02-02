/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import { POSTS_PATH } from '../../config/website';

import Layout from '../components/Layout/SimpleLayout';
import PostCardList from '../components/PostCardList';
import PostPagination from '../components/PostPagination';
import PageHeader from '../components/DefaultHeader';
import { CategoryWidget, TagsWidget, YearsWidget } from '../components/post-widgets';
import SEO from '../components/SEO';

const htmlStyle = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[10],
});

const PostList = ({
  path,
  data,
  pageContext: { locale, currentPage, numPages, categories, tags, years },
}) => {
  const { translations, address, mainNav, footerNav, socialLinks, page } = data;
  const isFirstPage = currentPage === 1;

  const postList = [];
  data.posts.edges.forEach(({ node }) => {
    postList.push({
      path: node.fields.slug,
      tags: node.frontmatter.tags,
      category: node.frontmatter.category,
      cover: node.frontmatter.cover,
      title: node.frontmatter.title,
      publishedDate: node.frontmatter.publishedDate,
      timeToRead: node.timeToRead,
      excerpt: node.excerpt,
    });
  });

  const {
    html,
    frontmatter: { title, metaTitle, description, metaDescription, noindex },
  } = page;

  return (
    <Layout aside="hello" context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />

      <CategoryWidget items={categories} />
      <TagsWidget items={tags} />
      <YearsWidget items={years} />

      <PageHeader title={title} subtitle={description} />
      {html && isFirstPage && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
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
    page: markdownRemark(fields: { slug: { regex: "/blog$/" }, locale: { eq: $locale } }) {
      ...PageFragment
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___publishedDate], order: DESC }
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
