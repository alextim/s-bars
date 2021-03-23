import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';

import Layout from '../components/Layout';
import PriceList from '../components/PriceList';

const styleHtml = (t) => ({
  textAlign: 'justify',
  marginTop: t.space[9],
});

const PriceListTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: {
      title,
      metaTitle,
      headline,
      metaDescription,
      cover,
      noindex,
      sections,
      html,
      locale,
      slug,
    },
  } = data;

  return (
    <Layout
      title={title}
      subtitle={headline}
      cover={cover}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={slug}
        noindex={noindex}
      />
      {sections && sections[0] && sections[0].items && <PriceList items={sections[0].items} />}
      {html && <div css={styleHtml} dangerouslySetInnerHTML={{ __html: html }} />}
    </Layout>
  );
};

export default PriceListTemplate;

export const pageQuery = graphql`
  query PriceListPageQuery($id: String!, $locale: String!) {
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
