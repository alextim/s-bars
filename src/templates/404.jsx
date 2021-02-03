/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayout';

const wrapStyle = (t) => ({
  textAlign: 'center',
  marginTop: t.space[8],
  marginBottom: t.space[8],
});
const headingStyle = (t) => ({
  fontFamily: 'monospace',
  fontSize: t.fontSizes[12],
});
// const htmlStyle = { textAlign: 'center' };

const NotFoundTemplate = ({ data, path, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: { title, metaTitle, description, metaDescription },
    html,
  } = data.page;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex
      />
      <div css={wrapStyle}>
        <h1 css={headingStyle}>{title}</h1>
        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      </div>
    </Layout>
  );
};

export default NotFoundTemplate;

export const pageQuery = graphql`
  query NotFoundPageQuery($id: String!, $locale: String!) {
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
