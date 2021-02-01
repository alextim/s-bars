/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import Sections from '../components/Sections';
import SectionTriptych from '../components/page-sections/SectionTriptych';

import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayout';

const AboutTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: { title, metaTitle, description, metaDescription, noindex, sections },
  } = data.page;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
      />
      {sections && (
        <>
          <SectionTriptych
            title={sections[0].title}
            subtitle={sections[0].subtitle}
            text={sections[0].text}
            items={sections[0].items}
          />
          <Sections data={sections.slice(1)} />
        </>
      )}
    </Layout>
  );
};

export default AboutTemplate;

export const aboutPageQuery = graphql`
  query AboutPageQuery($id: String!, $locale: String!) {
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
