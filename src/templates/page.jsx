import { graphql } from 'gatsby';

import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import Sections from '@/components/Sections';

const PageTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, headline, cover, sections, html },
  } = data;

  return (
    <Layout title={title} headline={headline} cover={cover} context={{ translations, address, mainNav, footerNav, socialLinks }}>
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      <Sections data={sections} />
    </Layout>
  );
};

export default PageTemplate;

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
  query PageQuery($id: String!, $locale: String!) {
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
