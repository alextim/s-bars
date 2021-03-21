/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import PostList from '../../components/blog/PostList';

const PostListTemplate = ({ data, pageContext }) => (
  <PostList data={data} pageContext={pageContext} />
);

export default PostListTemplate;

export const pageQuery = graphql`
  query PostListQuery($locale: String!, $skip: Int!, $limit: Int!) {
    #
    # blogPath
    # regex: "/blog$/"
    #
    page: mdPage(slug: { regex: "//blog//" }, locale: { eq: $locale }) {
      ...MdPageFragment
    }
    posts: allMdPost(
      sort: { fields: [datePublished], order: DESC }
      limit: $limit
      skip: $skip
      filter: { locale: { eq: $locale } }
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
