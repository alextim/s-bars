import React from 'react';
import { graphql } from 'gatsby';

import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

import InnerAsideLayout from '@/components/InnerAsideLayout';
import ServiceSchema from './components/ServiceSchema';
import AsideServices from './components/AsideServices';

const ServicePageTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, headline, cover, breadcrumbs, html },
  } = data;

  return (
    <Layout
      title={title}
      headline={headline}
      breadcrumbs={breadcrumbs}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <InnerAsideLayout cover={cover} html={html} aside={<AsideServices mainNav={mainNav} />} />
    </Layout>
  );
};

export const Head = ({ data, location: { pathname }, pageContext: { locale } }) => {
  const {
    page: { title, metaTitle, metaDescription, cover, noindex, breadcrumbs },
    socialLinks,
    address,
  } = data;

  return (
    <React.Fragment>
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={pathname}
        noindex={noindex}
        breadcrumbs={breadcrumbs}
        imgPath={cover?.sm?.publicURL}
        socialLinksData={socialLinks}
        orgAddress={address}
      />
      <ServiceSchema pathname={pathname} title={title} address={address} />
    </React.Fragment>
  );
};

export default ServicePageTemplate;

export const pageQuery = graphql`
  query ServicePageQuery($id: String!, $locale: String!) {
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
