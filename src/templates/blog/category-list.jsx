import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/Layout/Layout';
import SEO from '../../components/SEO';
import CategoryList from '../../components/blog/CategoryList';

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
    page: { html, title, metaTitle, headline, metaDescription, noindex, slug, locale },
  } = data;

  return (
    <Layout
      title={title}
      subtitle={headline}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={slug}
        noindex={noindex}
      />
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
      <CategoryList categories={categories} count />
    </Layout>
  );
};

export default CategoryListTemplate;

export const pageQuery = graphql`
  query categoryListQuery($locale: String!) {
    page: mdPage(slug: { regex: "//category-list//" }, locale: { eq: $locale }) {
      ...MdPageFragment
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
