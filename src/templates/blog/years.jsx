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
    address: address(locale: { eq: $locale }) {
      ...AddressFragment
    }
    mainNav: allMainNav(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          title
          to
          submenu {
            title
            to
          }
        }
      }
    }
    footerNav: allFooterNav(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          title
          to
        }
      }
    }
    socialLinks: allSocialLink(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          code
          to
          title
        }
      }
    }
    translations: allTranslation(filter: { locale: { eq: $locale } }, limit: 1000) {
      edges {
        node {
          key
          value
        }
      }
    }
  }
`;
