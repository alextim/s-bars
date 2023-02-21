import { graphql } from 'gatsby';

import { prevLink, nextLink } from '@/templates/blog/post-list/components/PostPagination/page-link-params';
import SEO from '@/components/SEO';

import config from '../../../../s-bars.content/config/website';

import PostList from './components/PostList';

const PostListTemplate = ({ data, location: { pathname }, pageContext }) => (
  <PostList data={data} pathname={pathname} pageContext={pageContext} />
);

export default PostListTemplate;

export const Head = ({ data, location: { pathname }, pageContext: { locale, to, currentPage, numPages } }) => {
  const {
    page: { metaTitle, metaDescription, noindex, breadcrumbs },
    socialLinks,
    address,
  } = data;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;

  const links = [];

  if (numPages > 1) {
    if (!isFirst) {
      links.push({
        rel: 'prev',
        href: config.siteUrl + prevLink(currentPage, to),
      });
    }
    if (!isLast) {
      links.push({
        rel: 'next',
        href: config.siteUrl + nextLink(currentPage, to),
      });
    }
  }

  return (
    <SEO
      locale={locale}
      title={metaTitle}
      description={metaDescription}
      pathname={pathname}
      noindex={noindex}
      breadcrumbs={breadcrumbs}
      pageType="Blog"
      links={links}
      socialLinksData={socialLinks}
      orgAddress={address}
    />
  );
};

export const postListTemplateQuery = graphql`
  query PostListQuery($locale: String!, $skip: Int!, $limit: Int!, $type: String!) {
    #
    # blogPath
    # regex: "//blog//"
    #
    page: mdPage(slug: { regex: "//blog//" }, locale: { eq: $locale }) {
      ...MdPageFragment
    }
    posts: allMdPost(
      sort: [{ featured: ASC }, { datePublished: DESC }]
      limit: $limit
      skip: $skip
      filter: { locale: { eq: $locale }, type: { eq: $type } }
    ) {
      edges {
        node {
          ...MdPostCardFragment
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
