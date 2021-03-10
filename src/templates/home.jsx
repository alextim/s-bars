import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';

import Container from '../components/Container';
import Layout from '../components/Layout/BaseLayout';

import Section from '../components/Section';

import {
  Slider,
  ObjectTypes,
  Triptych,
  WorkTypes,
  Carousel,
  Credo,
} from '../components/home-page-parts';

const styleHtml = {
  /* textAlign: 'justify', */
};

const HomeTemplate = ({ path, data, pageContext: { locale } }) => {
  const { translations, address, mainNav, footerNav, socialLinks } = data;
  const { title, metaTitle, description, metaDescription, noindex, sections, html } = data.page;
  const getObjectTypes = () => mainNav.edges[1].node.fields.submenu;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <SEO
        locale={locale}
        title={metaTitle || title}
        description={metaDescription || description}
        pathname={path}
        noindex={noindex}
        article={false}
      />

      <Container>
        {sections && (
          <>
            <Slider title={sections[0].title} text={sections[0].text} items={sections[0].items} />
            <ObjectTypes
              title={sections[1].title}
              subtitle={sections[1].subtitle}
              text={sections[1].text}
              items={getObjectTypes()}
            />
            <Triptych
              title={sections[2].title}
              subtitle={sections[2].subtitle}
              text={sections[2].text}
              items={sections[2].items}
            />
            <WorkTypes title={sections[3].title} items={sections[3].items} />
            <Carousel
              title={sections[4].title}
              subtitle={sections[4].subtitle}
              text={sections[4].text}
              items={sections[4].items}
            />
            <Credo
              title={sections[5].title}
              subtitle={sections[5].subtitle}
              text={sections[5].text}
              items={sections[5].items}
            />
          </>
        )}
        {html && (
          <Section>
            <div dangerouslySetInnerHTML={{ __html: html }} css={styleHtml} />
          </Section>
        )}
      </Container>
    </Layout>
  );
};

export default HomeTemplate;

export const pageQuery = graphql`
  query HomePageQuery($id: String!, $locale: String!) {
    page: mdPage(id: { eq: $id }) {
      title
      description
      metaTitle
      metaDescription
      noindex
      sections {
        title
        subtitle
        text
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
                gatsbyImageData(layout: FULL_WIDTH)
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
