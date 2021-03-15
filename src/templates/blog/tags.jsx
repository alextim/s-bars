import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/Layout/Layout';
import SEO from '../../components/SEO';
import PostCardList from '../../components/blog/PostCardList';
import PostPagination from '../../components/blog/PostPagination';

const htmlStyle = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[10],
});

const TagTemplate = ({ data, pageContext: { tag, subpath, currentPage, numPages } }) => {
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
      description,
      metaDescription,
      noindex,
      locale,
      slug,
    },
  } = data;

  const postList = [];
  data.posts.edges.forEach(({ node }) => {
    postList.push({
      path: node.slug,
      tags: node.tags,
      category: node.category,
      cover: node.cover,
      title: node.title,
      date: node.datePublished,
      timeToRead: node.timeToRead,
      excerpt: node.excerpt,
    });
  });

  const title = `${defaultTitle} ${tag}`;
  const isFirstPage = currentPage === 1;

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
        pathname={slug}
        noindex={noindex}
      />
      {html && isFirstPage && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
      <PostCardList posts={postList} />
      <PostPagination currentPage={currentPage} numPages={numPages} subpath={subpath} />
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query tagQuery($locale: String!, $tag: String, $skip: Int!, $limit: Int!) {
    page: mdPage(slug: { regex: "//tags//" }, locale: { eq: $locale }) {
      ...MdPageFragment
    }
    posts: allMdPost(
      limit: $limit
      skip: $skip
      sort: { fields: [datePublished], order: DESC }
      filter: { tags: { elemMatch: { title: { in: [$tag] } } }, locale: { eq: $locale } }
    ) {
      edges {
        node {
          ...MdPostCardFragment
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
