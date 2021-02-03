import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout/SimpleLayout';
import SEO from '../components/SEO';
import YearList from '../components/YearList';
import PageHeader from '../components/DefaultHeader';

const htmlStyle = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[10],
});

const YearsListTemplate = ({ path, data, pageContext: { locale, years } }) => {
  const { translations, address, mainNav, footerNav, socialLinks, page } = data;

  const {
    html,
    frontmatter: { title, metaTitle, description, metaDescription, noindex },
  } = page;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />
      <PageHeader title={title} subtitle={description} />
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
      <YearList years={years} count />
    </Layout>
  );
};

export default YearsListTemplate;

export const pageQuery = graphql`
  query yearListQuery($locale: String!) {
    page: markdownRemark(fields: { slug: { regex: "/year-list$/" }, locale: { eq: $locale } }) {
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
