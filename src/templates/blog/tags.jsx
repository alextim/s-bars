import React from 'react';
import { graphql } from 'gatsby';

import PostList from '../../components/blog/PostList';

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const {
    page: { title: defaultTitle },
  } = data;

  const title = `${defaultTitle} ${tag}`;

  return <PostList data={data} pageContext={pageContext} title={title} />;
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
