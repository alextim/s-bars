/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { graphql } from 'gatsby';

import Section from '../components/Section';
import Triptych from '../components/home-page-parts/Triptych';

import SEO from '../components/SEO';
import Layout from '../components/Layout';

const AboutTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, metaTitle, headline, metaDescription, noindex, sections, html, locale, slug },
  } = data;

  return (
    <Layout
      title={title}
      headline={headline}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={slug}
        noindex={noindex}
      />
      {sections && (
        <React.Fragment>
          <Triptych
            title={sections[0].title}
            subtitle={sections[0].subtitle}
            text={sections[0].text}
            items={sections[0].items}
          />
        </React.Fragment>
      )}
      {html && (
        <Section>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Section>
      )}
    </Layout>
  );
};

export default AboutTemplate;

export const pageQuery = graphql`
  query AboutPageQuery($id: String!, $locale: String!) {
    page: mdPage(id: { eq: $id }) {
      ...MdPageFragment
    }
    address: address(locale: { eq: $locale }) {
      ...AddressFragment
    }
    mainNav: allMainNav(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          title
          to
          submenu {
            title
            to
          }
        }
      }
    }
    footerNav: allFooterNav(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          title
          to
        }
      }
    }
    socialLinks: allSocialLink(filter: { locale: { eq: $locale } }) {
      edges {
        node {
          code
          to
          title
        }
      }
    }
    translations: allTranslation(filter: { locale: { eq: $locale } }, limit: 1000) {
      edges {
        node {
          key
          value
        }
      }
    }
  }
`;
