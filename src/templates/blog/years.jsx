import React from 'react';
import { graphql } from 'gatsby';

import PostList from '../../components/blog/PostList';

const YearTemplate = ({ data, pageContext }) => {
  const { year } = pageContext;
  const {
    page: { title: defaultTitle },
  } = data;

  const title = `${defaultTitle} ${year}`;
  const subpath = `/years/${year}/`;

  return <PostList data={data} pageContext={pageContext} title={title} subpath={subpath} />;
};

export default YearTemplate;

export const pageQuery = graphql`
  query yearQuery($locale: String!, $year: Int, $skip: Int!, $limit: Int!) {
    page: mdPage(slug: { regex: "//years//" }, locale: { eq: $locale }) {
      ...MdPageFragment
    }
    posts: allMdPost(
      limit: $limit
      skip: $skip
      sort: { fields: [datePublished], order: DESC }
      filter: { year: { eq: $year }, locale: { eq: $locale } }
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
