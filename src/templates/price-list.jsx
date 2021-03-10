import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';

import Layout from '../components/Layout/SimpleLayoutWithHeader';
import PriceList from '../components/PriceList';

const styleHtml = (t) => ({
  textAlign: 'justify',
  marginTop: t.space[9],
});

const PageTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    title,
    metaTitle,
    description,
    metaDescription,
    cover,
    noindex,
    sections,
    html,
  } = data.page;
  return (
    <Layout
      title={title}
      subtitle={description}
      cover={cover}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />
      {sections && sections[0] && sections[0].items && <PriceList items={sections[0].items} />}
      {html && <div css={styleHtml} dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PriceListQuery($id: String!, $locale: String!) {
    page: mdPage(id: { eq: $id }) {
      ...MdPageFragment
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
