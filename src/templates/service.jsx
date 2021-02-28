import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayoutWithHeader';
import AsideServices from '../components/AsideServices';

import InnerAsideLayout from '../components/InnerAsideLayout';

const ServicePageTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: { title, metaTitle, description, metaDescription, cover, noindex },
    html,
  } = data.page;

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
        pageType="Article"
      />
      <InnerAsideLayout cover={cover} html={html}>
        <AsideServices mainNav={mainNav} />
      </InnerAsideLayout>
    </Layout>
  );
};

export default ServicePageTemplate;

export const pageQuery = graphql`
  query ServicePageQuery($id: String!, $locale: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...PageFragment
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
