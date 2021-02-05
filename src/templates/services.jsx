/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import PageTemplate from '../components/object-types-and-services';

const ServiceListTemplate = ({ path, data, pageContext: { locale } }) => (
  <PageTemplate path={path} data={data} locale={locale} type="service" />
);

export default ServiceListTemplate;

export const pageQuery = graphql`
  query ServiceListPageQuery($id: String!, $locale: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...PageFragment
    }
    pageItems: allMarkdownRemark(
      filter: { fields: { type: { eq: "service" }, locale: { eq: $locale } } }
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
