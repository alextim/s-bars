import React from 'react';
import { graphql } from 'gatsby';
// import { Section } from '@ait/common-ui';

// import 'lazysizes';
// import a plugin
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import SEO from '../components/SEO';
import Layout from '../components/Layout/PageLayout';
import LightboxGallery from '../components/LightboxGallery';

const PhotographyTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    html,
    frontmatter: { title, metaTitle, description, metaDescription, cover, sections },
  } = data.page;

  return (
    <Layout
      title={title}
      subtitle={description}
      cover={cover}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO locale={locale} title={metaTitle} description={metaDescription} pathname={path} />
      {/* <Section text={sections[0].text} small /> */}
      <div>{sections[0].text}</div>
      {sections.length > 1 && sections[1].items && <LightboxGallery items={sections[1].items} />}
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default PhotographyTemplate;

export const pageQuery = graphql`
  query PhotographyPageQuery($id: String!, $locale: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        metaTitle
        metaDescription
        cover {
          xl {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          sm {
            childImageSharp {
              fluid(maxWidth: 480) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
              }
            }
          }
          alt
        }
        noindex
        sections {
          text
          items {
            title
            image {
              alt
              sm {
                id
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_noBase64
                    originalImg
                  }
                }
              }
            }
          }
        }
      }
      html
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
