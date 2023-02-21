import { graphql } from 'gatsby';

import { space } from '@/theme/space';
import { fontSizes } from '@/theme/font-sizes';

import SEO from '@/components/SEO';
import Layout from '@/components/Layout/ContainerLayout';

const styleWrap = {
  textAlign: 'center',
  marginTop: space[8],
  marginBottom: space[8],
};

const styleHeading = {
  fontFamily: 'monospace',
  fontSize: fontSizes[12],
};

const NotFoundTemplate = ({ data }) => {
  const {
    translations,
    address,
    mainNav,
    footerNav,
    socialLinks,
    page: { title, html },
  } = data;

  return (
    <Layout context={{ translations, address, mainNav, footerNav, socialLinks }}>
      <div css={styleWrap}>
        <h1 css={styleHeading}>{title}</h1>
        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      </div>
    </Layout>
  );
};

export default NotFoundTemplate;

export const Head = ({ data, location: { pathname }, pageContext: { locale } }) => {
  const {
    page: { metaTitle, metaDescription },
    socialLinks,
    address,
  } = data;

  return (
    <SEO
      locale={locale}
      title={metaTitle}
      description={metaDescription}
      pathname={pathname}
      noindex
      socialLinksData={socialLinks}
      orgAddress={address}
    />
  );
};

export const pageQuery = graphql`
  query NotFoundPageQuery($id: String!, $locale: String!) {
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
