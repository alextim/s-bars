import React from 'react';
import { graphql } from 'gatsby';

import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import Section from '@/components/Section';

import Triptych from './home/components/Triptych';

const AboutTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, headline, breadcrumbs, sections, html },
  } = data;

  return (
    <Layout
      title={title}
      headline={headline}
      breadcrumbs={breadcrumbs}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      {sections && (
        <React.Fragment>
          <Section text={sections[0].text} />
          <Triptych title={sections[1].title} subtitle={sections[1].subtitle} text={sections[1].text} items={sections[1].items} />
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

export const Head = ({ data, location: { pathname }, pageContext: { locale } }) => {
  const {
    page: { metaTitle, metaDescription, noindex, breadcrumbs },
    socialLinks,
    address,
  } = data;

  return (
    <SEO
      locale={locale}
      title={metaTitle}
      description={metaDescription}
      pathname={pathname}
      noindex={noindex}
      breadcrumbs={breadcrumbs}
      socialLinksData={socialLinks}
      orgAddress={address}
    />
  );
};

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
