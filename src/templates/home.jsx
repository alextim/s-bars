import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SEO from '../components/SEO';
import Layout from '../components/Layout/SimpleLayout';
import Section from '../components/Section';

import SectionObjectTypes from '../components/page-sections/SectionObjectTypes';
import SectionTriptych from '../components/page-sections/SectionTriptych';
import SectionWorkTypes from '../components/page-sections/SectionWorkTypes';
import SectionRecommended from '../components/page-sections/SectionRecommended';
import SectionCredo from '../components/page-sections/SectionCredo';

const HomeTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const {
    frontmatter: { title, metaTitle, description, metaDescription, noindex, sections },
    html,
  } = data.page;

  const getObjectTypes = () => mainNav[1].submenu;

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
          <Section
            title={sections[1].title}
            subtitle={sections[1].subtitle}
            text={sections[1].text}
          />
          <SectionObjectTypes
            title={sections[2].title}
            subtitle={sections[2].subtitle}
            text={sections[2].text}
            items={getObjectTypes()}
          />
          <SectionTriptych
            title={sections[3].title}
            subtitle={sections[3].subtitle}
            text={sections[3].text}
            items={sections[3].items}
          />
          <SectionWorkTypes
            title={sections[4].title}
            subtitle={sections[4].subtitle}
            text={sections[4].text}
            items={sections[4].items}
          />
          <SectionRecommended
            title={sections[5].title}
            subtitle={sections[5].subtitle}
            text={sections[5].text}
            items={sections[5].items}
          />
          <SectionCredo
            title={sections[6].title}
            subtitle={sections[6].subtitle}
            text={sections[6].text}
            items={sections[6].items}
          />
        </>
      )}
      {html && (
        <Section>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Section>
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
          title
          subtitle
          text
          type
          items {
            title
            to
            subtitle
            text
            icon
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
