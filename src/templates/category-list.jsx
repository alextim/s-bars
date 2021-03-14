import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/SimpleLayout';
import SEO from '../components/SEO';
import CategoryList from '../components/CategoryList';
import PageHeader from '../components/DefaultHeader';

const htmlStyle = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[10],
});

const CategoryListTemplate = ({ data, pageContext: { categories } }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { html, title, metaTitle, description, metaDescription, noindex, slug, locale },
  } = data;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={slug}
        noindex={noindex}
      />
      <PageHeader title={title} subtitle={description} />
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
      <CategoryList categories={categories} count />
    </Layout>
  );
};

export default CategoryListTemplate;

export const pageQuery = graphql`
  query categoryListQuery($locale: String!) {
    page: mdPage(slug: { regex: "/category-list$/" }, locale: { eq: $locale }) {
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
