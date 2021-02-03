import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';

import Layout from '../components/Layout/PageLayout';
import AsideObjectTypeList from '../components/AsideObjectTypeList';

const styleWrap = (t) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: t.space[8],
  [t.mq.lg]: {
    gridTemplateColumns: '3fr 1fr',
  },
});

const styleImg = (t) => ({
  marginBottom: t.space[4],
});

const ObjectTypePageTemplate = ({ path, data, pageContext: { locale } }) => {
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
      />
      <div css={styleWrap}>
        <div>
          {cover && cover.sm && (
            <Img fluid={cover.sm.childImageSharp.fluid} alt={cover.alt} css={styleImg} />
          )}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
        <AsideObjectTypeList />
      </div>
    </Layout>
  );
};

export default ObjectTypePageTemplate;

export const objecTypePageQuery = graphql`
  query ObjecTypePageQuery($id: String!, $locale: String!) {
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
