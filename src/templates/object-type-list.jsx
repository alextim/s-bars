import { graphql } from 'gatsby';

import PageTemplate from '@/components/object-types-and-services';

const ObjectTypeListTemplate = ({ data, location: { pathname }, pageContext: { locale } }) => (
  <PageTemplate data={data} pathname={pathname} locale={locale} type="object" />
);

export default ObjectTypeListTemplate;

export const pageQuery = graphql`
  query ObjectTypeListPageQuery($id: String!, $locale: String!) {
    page: mdPage(id: { eq: $id }) {
      ...MdPageFragment
    }
    pageItems: allMdPage(filter: { type: { eq: "object" }, locale: { eq: $locale } }) {
      edges {
        node {
          ...MdCardFragment
        }
      }
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
