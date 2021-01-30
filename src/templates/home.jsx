/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayout';

const HomeTemplate = ({ path, data, pageContext: { locale } }) => {
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

      {sections && sections[0].items && (
        <Slider dots arrows infinite speed={500} slidesToShow={1} slidesToScroll={1}>
          {sections[0].items.map(
            ({ image }) =>
              image &&
              image.sm && (
                <div key={image.sm.childImageSharp.fluid.src}>
                  <Img fluid={image.sm.childImageSharp.fluid} alt={image.alt} />
                </div>
              ),
          )}
        </Slider>
      )}
    </Layout>
  );
};

export default HomeTemplate;

export const pageQuery = graphql`
  query HomePageQuery($id: String!, $locale: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        metaTitle
        metaDescription
        noindex
        sections {
          content
          items {
            title
            image {
              alt
              sm {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
        }
      }
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
