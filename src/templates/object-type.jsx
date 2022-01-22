import { graphql } from 'gatsby';

import SEO from '@/components/SEO';
import Layout from '@/components/Layout';
import AsideButtonList from '@/components/AsideButtonList';

import InnerAsideLayout from '@/components/InnerAsideLayout';
import { getObjectTypesTitle, getFormattedObjectTypeItems } from '../helpers/list-info';

const ObjectTypePageTemplate = ({ data, location: { pathname }, pageContext: { locale } }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, metaTitle, headline, metaDescription, cover, noindex, breadcrumbs, html },
  } = data;

  return (
    <Layout
      title={title}
      headline={headline}
      breadcrumbs={breadcrumbs}
      context={{ translations, address, mainNav, footerNav, socialLinks }}
    >
      <SEO
        locale={locale}
        title={metaTitle}
        description={metaDescription}
        pathname={pathname}
        noindex={noindex}
        breadcrumbs={breadcrumbs}
        imgPath={cover?.sm?.publicURL}
      />
      <InnerAsideLayout
        cover={cover}
        html={html}
        aside={<AsideButtonList title={getObjectTypesTitle(mainNav)} items={getFormattedObjectTypeItems(mainNav)} />}
      />
    </Layout>
  );
};

export default ObjectTypePageTemplate;

export const pageQuery = graphql`
  query ObjectTypePageQuery($id: String!, $locale: String!) {
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
