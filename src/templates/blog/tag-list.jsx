import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../../components/Layout/Layout';
import SEO from '../../components/SEO';
import TagList from '../../components/blog/TagList';

const htmlStyle = (t) => ({
  marginTop: t.space[6],
  marginBottom: t.space[10],
});

const TagListTemplate = ({ data, pageContext: { tags } }) => {
  const { translations, address, mainNav, footerNav, socialLinks, page } = data;

  const { html, title, metaTitle, description, metaDescription, noindex, slug, locale } = page;

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
      />
      {html && <div css={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />}
      <TagList tags={tags} count />
    </Layout>
  );
};

export default TagListTemplate;

export const pageQuery = graphql`
  query tagListQuery($locale: String!) {
    page: mdPage(slug: { regex: "//tag-list//" }, locale: { eq: $locale }) {
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
