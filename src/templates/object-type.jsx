import React from 'react';
import { graphql } from 'gatsby';

import { getObjectTypesTitle, getFormattedObjectTypeItems } from '../helpers/list-info';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import AsideButtonList from '../components/AsideButtonList';

import InnerAsideLayout from '../components/InnerAsideLayout';

const ObjectTypePageTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, metaTitle, description, metaDescription, cover, noindex, html, locale, slug },
  } = data;

  return (
    <Layout
      title={title}
      subtitle={description}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={slug}
        noindex={noindex}
        imgPath={cover && cover.sm ? cover.sm.publicURL : undefined}
      />
      <InnerAsideLayout
        cover={cover}
        html={html}
        aside={
          <AsideButtonList
            title={getObjectTypesTitle(mainNav)}
            items={getFormattedObjectTypeItems(mainNav)}
          />
        }
      />
    </Layout>
  );
};

export default ObjectTypePageTemplate;

export const objecTypePageQuery = graphql`
  query ObjecTypePageQuery($id: String!, $locale: String!) {
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
