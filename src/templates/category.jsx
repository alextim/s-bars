import React from 'react';
import { graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import Layout from '../components/Layout/SimpleLayout';
import SEO from '../components/SEO';
import PostCardList from '../components/PostCardList';
import PostPagination from '../components/PostPagination';
import PageHeader from '../components/DefaultHeader';

const htmlStyle = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[10],
});

const CategoryTemplate = ({
  path,
  data,
  pageContext: { locale, category, currentPage, numPages },
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
      date: node.frontmatter.publishedDate,
      timeToRead: node.timeToRead,
      excerpt: node.excerpt,
    });
  });

  const {
    html,
    frontmatter: { title: defaultTitle, metaTitle, description, metaDescription, noindex },
  } = page;

  const title = `${defaultTitle} ${category}`;
  const subpath = `/category/${kebabCase(category)}`;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />
      <PageHeader title={title} subtitle={description} />
      {html && isFirstPage && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
      <PostCardList posts={postList} />
      <PostPagination currentPage={currentPage} numPages={numPages} subpath={subpath} />
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query categoryQuery($locale: String!, $category: String, $skip: Int!, $limit: Int!) {
    page: markdownRemark(fields: { slug: { regex: "/category$/" }, locale: { eq: $locale } }) {
      ...PageFragment
    }
    posts: allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___publishedDate], order: DESC }
      filter: {
        frontmatter: { category: { in: [$category] } }
        fields: { locale: { eq: $locale } }
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
